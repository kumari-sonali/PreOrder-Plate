import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedPath = ({ element }) => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("is_admin") === "true"; 

  const location = useLocation();

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const { exp } = jwtDecode(token);
    if (exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return <Navigate to="/" />;
    }

    const adminRoutes = [
      "/homepage",
      "/order",
      "/datapage",
      "/viewdetail/:productId",
      "/addProduct",
      "/getorder",
      "/updateOrder"
    ];
    const userRoutes = ["/homepage", "/order", "/viewdetail/:productId","/updateOrder"];

    const routeMatches = (route) => {
      const regex = new RegExp(`^${route.replace(/:[^/]+/g, "([^/]+)")}$`);
      return regex.test(location.pathname);
    };

    if (isAdmin) {
      // If isAdmin is true, allow access to all admin routes
      if (adminRoutes.some((route) => routeMatches(route))) {
        return element;
      } else {
        return <Navigate to="/homepage" />;
      }
    } else {
      // If isAdmin is false, allow access to all user routes
      if (userRoutes.some((route) => routeMatches(route))) {
        return element;
      } else {
        return <Navigate to="/homepage" />;
      }
    }
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/" />;
  }
};

export default ProtectedPath;
