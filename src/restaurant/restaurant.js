import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import axios from "axios";
export default function RestaurntData() {

  const initialFormData = {
    restaurant_name: "",
    restaurant_full_address: "",
    email: "",
    mobile_number: "",
    google_map_link: "",
    owner_name: "",
    owner_mobile_number: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleCancel = () => {
    setFormData(initialFormData);
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/restaurant/create`, formData);
      alert("Restaurant created successfully");
    } catch (error) {
      console.error("There was an error creating the restaurant!", error);
    }
    setFormData(initialFormData);
  };

  return (
     <div className="mx-auto mt-20 bg-gray-100 max-w-6xl px-4 sm:px-6 lg:px-8">
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
        <h2 className="py-4 text-center font-bold text-3xl font-serif  leading-7 text-gray-900">
            Add Restaurant
            </h2>
          <p className="mt-1 text-center font-bold font-serif text-sm leading-6 text-gray-600">
            Here u can add your new Restaurant.
          </p>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="restaurant_name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                restaurant_name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="restaurant_name"
                  id="restaurant_name"
                  value={formData.restaurant_name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email 
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                restaurant_full_address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="restaurant_full_address"
                  id="restaurant_full_address"
                  value={formData.restaurant_full_address}
                  onChange={handleChange}
                  autoComplete="Address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 ">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                mobile_number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="mobile_number"
                  id="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleChange}
                  autoComplete="mobile"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                google_map_link
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="google_map_link"
                  id="google_map_link"
                  value={formData.google_map_link}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                owner_name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="owner_name"
                  id="owner_name"
                  value={formData.owner_name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                owner_mobile_number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="owner_mobile_number"
                  id="owner_mobile_number"
                  value={formData.owner_mobile_number}
                  onChange={handleChange}
                  autoComplete="mobile"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Notifications
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            We'll always let you know about important changes, but you pick what
            else you want to hear about.
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm my-5 font-semibold leading-6 text-gray-900"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 my-5 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
    </div>
  );
}
