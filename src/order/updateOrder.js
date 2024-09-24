// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function UpdateOrder() {
//   const [customers, setCustomers] = useState([]);
//   const [customerID, setCustomerID] = useState("");
//   const [customerOrder, setCustomerOrder] = useState({});
//   const [editFields, setEditFields] = useState({});
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_BASE_URL}/order/customer_list`
//         );
//         setCustomers(response.data.orders);
//       } catch (error) {
//         console.error("Error fetching customers:", error);
//       }
//     };

//     fetchCustomers();
//   }, []);

//   const handleCustomerSelect = async (e) => {
//     setCustomerID(e.target.value);
//     if (e.target.value) {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_BASE_URL}/order/get_id/${e.target.value}`
//         );
//         setCustomerOrder(response.data.list[0]);
//         setEditFields(response.data.list[0]);
//         setShowForm(true);
//       } catch (error) {
//         console.error("Error fetching customer order:", error);
//       }
//     } else {
//       setShowForm(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditFields({ ...editFields, [name]: value });
//   };

//   const handleFoodChange = (index, key, value) => {
//     const updatedFoods = editFields.foods.map((food, i) =>
//       i === index ? { ...food, [key]: value } : food
//     );
//     setEditFields({ ...editFields, foods: updatedFoods });
//   };

//   const updateOrder = async () => {
//     try {
//       await axios.put(
//         `${process.env.REACT_APP_API_BASE_URL}/order/update/${customerID}`,
//         editFields
//       );
//       alert("Order updated successfully.");
//     } catch (error) {
//       console.error("Error updating order:", error);
//       alert("Error updating order. Please try again.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
//       <div className="flex flex-wrap -mx-4">
//         <div className="w-full md:w-1/2 xl:w-1/3 p-4">
//           <label
//             htmlFor="customer_id"
//             className="block text-sm font-medium leading-6 text-gray-900"
//           >
//             Select a Customer
//           </label>
//           <div className="mt-2">
//             <select
//               name="customer_id"
//               id="customer_id"
//               onChange={handleCustomerSelect}
//               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//             >
//               <option value="">Select Customer</option>
//               {customers.map((customer) => (
//                 <option key={customer.id} value={customer.id}>
//                   {customer.customer_name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         {showForm && (
//           <div className="w-full md:w-1/2 xl:w-2/3 p-4">
//             <div className="bg-gray-200 shadow rounded-lg p-6">
//               <form>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">Customer Name:</label>
//                   <input
//                     type="text"
//                     name="customer_name"
//                     value={editFields.customer_name}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">Mobile Number:</label>
//                   <input
//                     type="text"
//                     name="mobile_number"
//                     value={editFields.mobile_number}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">Aadhar Number:</label>
//                   <input
//                     type="text"
//                     name="aadhar_number"
//                     value={editFields.aadhar_number}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">Food Time:</label>
//                   <input
//                     type="text"
//                     name="food_time"
//                     value={editFields.food_time}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">Table Number:</label>
//                   <input
//                     type="text"
//                     name="table_number"
//                     value={editFields.table_number}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">Foods:</label>
//                   {editFields.foods &&
//                     Array.isArray(editFields.foods) &&
//                     editFields.foods.map((food, index) => (
//                       <div key={index} className="mb-4">
//                         <input
//                           type="text"
//                           name="food_name"
//                           value={food.food_name}
//                           onChange={(e) => handleFoodChange(index, "food_name", e.target.value)}
//                           className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md mb-2"
//                         />
//                         <input
//                           type="text"
//                           name="quantity"
//                           value={food.quantity}
//                           onChange={(e) => handleFoodChange(index, "quantity", e.target.value)}
//                           className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md mb-2"
//                         />
//                         <input
//                           type="text"
//                           name="type"
//                           value={food.type}
//                           onChange={(e) => handleFoodChange(index, "type", e.target.value)}
//                           className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                         />
//                       </div>
//                     ))}
//                 </div>
//                 <button
//                   type="button"
//                   onClick={updateOrder}
//                   className="bg-indigo-600 text-white py-2 px-4 rounded-md"
//                 >
//                   Update Order
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function UpdateOrder() {
//   const [customers, setCustomers] = useState([]);
//   const [customerID, setCustomerID] = useState("");
//   const [customerOrder, setCustomerOrder] = useState({});
//   const [editFields, setEditFields] = useState({});
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_BASE_URL}/order/customer_list`
//         );
//         setCustomers(response.data.orders);
//       } catch (error) {
//         console.error("Error fetching customers:", error);
//       }
//     };

//     fetchCustomers();
//   }, []);

//   const handleCustomerSelect = async (e) => {
//     setCustomerID(e.target.value);
//     if (e.target.value) {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_BASE_URL}/order/get_id/${e.target.value}`
//         );
//         setCustomerOrder(response.data.list[0]);
//         setEditFields(response.data.list[0]);
//         setShowForm(true);
//       } catch (error) {
//         console.error("Error fetching customer order:", error);
//       }
//     } else {
//       setShowForm(false);
//     }
//   };
//   const addNewFood = () => {
//     setEditFields({
//       ...editFields,
//       foods: [
//         ...editFields.foods,
//         { food_name: "", type: "full", quantity: "" },
//       ],
//     });
//   };
   
//   const deleteOrder = async () => {
//     try {
//       await axios.delete(
//         `${process.env.REACT_APP_API_BASE_URL}/order/delete/${customerID}`
//       );
//       alert("Selected order deleted successfully.");
//     } catch (error) {
//       console.error("Error deleting customer order:", error);
//       alert("Error deleting order. Please try again.");
//     }
//     setCustomerOrder({});
//   };

//   const deleteFood = (index) => {
//     const updatedFoods = editFields.foods.filter((food, i) => i !== index);
//     setEditFields({ ...editFields, foods: updatedFoods });
//   };
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditFields({ ...editFields, [name]: value });
//   };

//   const handleFoodChange = (index, key, value) => {
//     const updatedFoods = editFields.foods.map((food, i) =>
//       i === index ? { ...food, [key]: value } : food
//     );
//     setEditFields({ ...editFields, foods: updatedFoods });
//   };


//   const updateOrder = async () => {
//     try {
//       await axios.put(
//         `${process.env.REACT_APP_API_BASE_URL}/order/update/${customerID}`,
//         editFields
//       );
//       alert("Order updated successfully.");
//     } catch (error) {
//       console.error("Error updating order:", error);
//       alert("Error updating order. Please try again.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
//       <div className="flex flex-wrap -mx-4">
//         <div className="w-full md:w-1/2 xl:w-1/3 p-4">
//           <label
//             htmlFor="customer_id"
//             className="block text-sm font-medium leading-6 text-gray-900"
//           >
//             Select a Customer
//           </label>
//           <div className="mt-2">
//             <select
//               name="customer_id"
//               id="customer_id"
//               onChange={handleCustomerSelect}
//               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//             >
//               <option value="">Select Customer</option>
//               {customers.map((customer) => (
//                 <option key={customer.id} value={customer.id}>
//                   {customer.customer_name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         {showForm && (
//           <div className="w-full md:w-1/2 xl:w-2/3 p-4">
//             <div className="bg-gray-200 shadow rounded-lg p-6">
//               <form>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Customer Name:
//                   </label>
//                   <input
//                     type="text"
//                     name="customer_name"
//                     value={editFields.customer_name}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Mobile Number:
//                   </label>
//                   <input
//                     type="text"
//                     name="mobile_number"
//                     value={editFields.mobile_number}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Aadhar Number:
//                   </label>
//                   <input
//                     type="text"
//                     name="aadhar_number"
//                     value={editFields.aadhar_number}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Food Time:
//                   </label>
//                   <input
//                     type="datetime-local"
//                     name="food_time"
//                     value={editFields.food_time}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Table Number:
//                   </label>
//                   <input
//                     type="text"
//                     name="table_number"
//                     value={editFields.table_number}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <div className="flex justify-between items-center">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Foods:
//                     </label>
//                     <button
//                       type="button"
//                       onClick={addNewFood}
//                       className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
//                     >
//                       Add New Food
//                     </button>
//                   </div>
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead>
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Food Name
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Type
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Quantity
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Action
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {editFields.foods &&
//                         Array.isArray(editFields.foods) &&
//                         editFields.foods.map((food, index) => (
//                           <tr key={index}>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <input
//                                 type="text"
//                                 name="food_name"
//                                 value={food.food_name}
//                                 onChange={(e) =>
//                                   handleFoodChange(
//                                     index,
//                                     "food_name",
//                                     e.target.value
//                                   )
//                                 }
//                                 className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                               />
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <select
//                                 name="type"
//                                 value={food.type}
//                                 onChange={(e) =>
//                                   handleFoodChange(
//                                     index,
//                                     "type",
//                                     e.target.value
//                                   )
//                                 }
//                                 className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                               >
//                                 <option value="full">Full</option>
//                                 <option value="half">Half</option>
//                               </select>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <input
//                                 type="text"
//                                 name="quantity"
//                                 value={food.quantity}
//                                 onChange={(e) =>
//                                   handleFoodChange(
//                                     index,
//                                     "quantity",
//                                     e.target.value
//                                   )
//                                 }
//                                 className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                               />
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex flex-col items-start">
//                                 <button
//                                   type="button"
//                                   onClick={() => deleteFood(index)}
//                                   className="mt-2 px-2 py-1 bg-red-600 text-white rounded"
//                                 >
//                                   Delete
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={updateOrder}
//                   className="bg-indigo-600 text-white py-2 px-4  rounded-md"
//                 >
//                   Update Order
//                 </button>
//                 <button
//                   type="button"
//                   onClick={deleteOrder}
//                   className="bg-indigo-600 text-white ml-16 py-2 px-4 rounded-md"
//                 >
//                   Delete Order
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateOrder() {
  const [customers, setCustomers] = useState([]);
  const [customerID, setCustomerID] = useState("");
  const [customerOrder, setCustomerOrder] = useState({});
  const [editFields, setEditFields] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/order/customer_list`
        );
        setCustomers(response.data.orders);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleCustomerSelect = async (e) => {
    setCustomerID(e.target.value);
    if (e.target.value) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/order/get_id/${e.target.value}`
        );
        setCustomerOrder(response.data.list[0]);
        setEditFields(response.data.list[0]);
        setShowForm(true);
      } catch (error) {
        console.error("Error fetching customer order:", error);
      }
    } else {
      setShowForm(false);
    }
  };

  const addNewFood = () => {
    setEditFields({
      ...editFields,
      foods: [
        ...editFields.foods,
        { food_name: "", type: "full", quantity: "" },
      ],
    });
  };

  const deleteOrder = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/order/delete/${customerID}`
      );
      alert("Selected order deleted successfully.");
      setCustomerOrder({});
      setShowForm(false);  // Hide the form after deleting the order
    } catch (error) {
      console.error("Error deleting customer order:", error);
      alert("Error deleting order. Please try again.");
    }
  };

  const deleteFood = (index) => {
    const updatedFoods = editFields.foods.filter((food, i) => i !== index);
    setEditFields({ ...editFields, foods: updatedFoods });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFields({ ...editFields, [name]: value });
  };

  const handleFoodChange = (index, key, value) => {
    const updatedFoods = editFields.foods.map((food, i) =>
      i === index ? { ...food, [key]: value } : food
    );
    setEditFields({ ...editFields, foods: updatedFoods });
  };

  const updateOrder = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/order/update/${customerID}`,
        editFields
      );
      alert("Order updated successfully.");
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Error updating order. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          <label
            htmlFor="customer_id"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Select a Customer
          </label>
          <div className="mt-2">
            <select
              name="customer_id"
              id="customer_id"
              onChange={handleCustomerSelect}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Select Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.customer_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {showForm && (
          <div className="w-full md:w-1/2 xl:w-2/3 p-4">
            <div className="bg-gray-200 shadow rounded-lg p-6">
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Customer Name:
                  </label>
                  <input
                    type="text"
                    name="customer_name"
                    value={editFields.customer_name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Mobile Number:
                  </label>
                  <input
                    type="text"
                    name="mobile_number"
                    value={editFields.mobile_number}
                    onChange={handleInputChange}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Aadhar Number:
                  </label>
                  <input
                    type="text"
                    name="aadhar_number"
                    value={editFields.aadhar_number}
                    onChange={handleInputChange}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Food Time:
                  </label>
                  <input
                    type="datetime-local"
                    name="food_time"
                    value={editFields.food_time}
                    onChange={handleInputChange}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Table Number:
                  </label>
                  <input
                    type="text"
                    name="table_number"
                    value={editFields.table_number}
                    onChange={handleInputChange}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Foods:
                    </label>
                    <button
                      type="button"
                      onClick={addNewFood}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                    >
                      Add New Food
                    </button>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Food Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {editFields.foods &&
                        Array.isArray(editFields.foods) &&
                        editFields.foods.map((food, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="text"
                                name="food_name"
                                value={food.food_name}
                                onChange={(e) =>
                                  handleFoodChange(
                                    index,
                                    "food_name",
                                    e.target.value
                                  )
                                }
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                name="type"
                                value={food.type}
                                onChange={(e) =>
                                  handleFoodChange(
                                    index,
                                    "type",
                                    e.target.value
                                  )
                                }
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              >
                                <option value="full">Full</option>
                                <option value="half">Half</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="text"
                                name="quantity"
                                value={food.quantity}
                                onChange={(e) =>
                                  handleFoodChange(
                                    index,
                                    "quantity",
                                    e.target.value
                                  )
                                }
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex flex-col items-start">
                                <button
                                  type="button"
                                  onClick={() => deleteFood(index)}
                                  className="mt-2 px-2 py-1 bg-red-600 text-white rounded"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                <button
                  type="button"
                  onClick={updateOrder}
                  className="bg-indigo-600 text-white py-2 px-4 rounded-md"
                >
                  Update Order
                </button>
                <button
                  type="button"
                  onClick={deleteOrder}
                  className="bg-indigo-600 text-white ml-16 py-2 px-4 rounded-md"
                >
                  Delete Order
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
