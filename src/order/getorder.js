import React, { useState, useEffect } from "react";
import axios from "axios";
const backgroundImages = [
  "url('https://pointos.com/wp-content/uploads/2017/10/cropped-blur-background-of-pub-restaurant-with-wood-table-628137314_2125x1416.jpeg')",
  "url('https://img.freepik.com/premium-photo/background-restaurants-interior-dark-wall_872147-3344.jpg')",
  "url('https://i.pinimg.com/originals/d2/e9/b4/d2e9b4dab96412bf62e1146d3bf269b5.jpg')",
  "url('https://wallpapercave.com/wp/wp1874194.jpg')",
  "url('https://coolwallpapers.me/picsup/5694895-restaurant-wallpapers.jpg')",
];

export default function Getorder() {
  const [order, setOrder] = useState([]);
  const [customer_id, setCustomer_id] = useState("");
  const [customer_order, setCustomer_order] = useState({});
  const [option, setOption] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackgroundIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 9000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/order/customer_list`
        );
        setOrder(response.data.orders); // assuming the API returns an object with an "orders" key
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchOrder(); // call the function
  }, []);

  const handleSelectChange = (e) => {
    setCustomer_id(e.target.value);
  };

  const fetchCustomerOrder = async () => {
    console.log(customer_id);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/order/get_id/${customer_id}`
      );
      console.log("API Response:", response.data);
      setCustomer_order(response.data.list[0]);
      console.log({ customer_order});
      
    } catch (error) {
      console.error("Error fetching customer order:", error);
    }
  };

  const handleCheckboxChange = (e) => {
    setOption(e.target.checked);
  };

  const deleteSelectedOrders = async () => {
    const isAdmin = localStorage.getItem("is_admin") === "true";
    if (!option ) {
      setShowWarning(true);
      return;
    }
    if (!isAdmin) {
      alert("You do not have the necessary permissions to delete orders.");
      return;
    }
    setShowWarning(false);
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/order/delete/${customer_id}`
      );
      alert("Selected order deleted successfully.");
    } catch (error) {
      console.error("Error deleting customer order:", error);
      alert("Error deleting order. Please try again.");
    }
  };

  return (
    <div
    className="bg-cover bg-center transition-all duration-1000"
    style={{ backgroundImage: backgroundImages[currentBackgroundIndex] }}
  >
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          <label
            htmlFor="order_id"
            className="block text-sm font-serif font-bold leading-6 text-gray-900"
          >
            Select the name of the Customer
          </label>
          <div className="mt-2">
            <select
              name="order_id"
              id="order_id"
              onChange={handleSelectChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Select the name of the Customer</option>
              {order.map((order) => (
                <option key={order.id} value={order.id}>
                  {order.customer_name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={fetchCustomerOrder}
            className="mt-10 bg-indigo-600 text-white py-2 px-4 rounded-md"
          >
            Fetch Order
          </button>
        </div>
        {customer_order && (
          <div className="w-full md:w-1/2 xl:w-2/3 p-4">
            <div className="bg-gray-200 opacity-80 shadow rounded-lg p-6">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-bold">
                      Customer Name:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer_order.customer_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-bold">
                      Mobile Number:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer_order.mobile_number}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-bold">
                      Aadhar Number:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer_order.aadhar_number}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-bold">
                      Food Time:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer_order.food_time}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-bold">
                      Table Number:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer_order.table_number}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-bold">
                      Foods:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Food Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Quantity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Type
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {customer_order.foods &&
                            Array.isArray(customer_order.foods) &&
                            customer_order.foods.map((food, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {food.food_name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {food.quantity}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {food.type}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4">
                <label htmlFor="confirmDelete" className="inline-flex items-center">
                  <input
                    type="checkbox"
                    id="confirmDelete"
                    checked={option}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-5 w-5 text-blue-400"
                  />
                  <span className="ml-2 text-gray-700">Confirm Delete</span>
                </label>
                {showWarning && (
                  <p className="mt-2">
                    Please confirm the deletion by checking the box.
                  </p>
                )}
              </div>
              <button
                onClick={deleteSelectedOrders}
                className="mt-4 bg-blue-400 text-white py-2 px-4 rounded-md"
              >
                Delete Selected Orders
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
