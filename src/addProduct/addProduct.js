import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import axios from "axios";

export default function AddProduct() {
  const [thumbnail, setThumbnail] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const initialProduct = {
    name: "",
    title: "",
    category: "",
    price: "",
    rating: "",
    thumbnail: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    discountPercentage: "",
    description: "",
    recipe: "",
    special: "",
  };

  const [formData, setFormData] = useState(initialProduct);

  const handleCancel = () => {
    setFormData(initialProduct);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setFormData({ ...formData, thumbnail: URL.createObjectURL(file) });
    }
  };

  const handleImageChange = (e, setImage, imageKey) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setFormData({ ...formData, [imageKey]: URL.createObjectURL(file) });
    }
  };

  const uploadFile = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "images_preset");

    try {
      const cloudName = "ikbal";
      const resourceType = "image";
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ thumbnail, image1, image2, image3, image4 });
    const uploadedImage1 = await uploadFile(image1);
    const uploadedImage2 = await uploadFile(image2);
    const uploadedImage3 = await uploadFile(image3);
    const uploadedImage4 = await uploadFile(image4);
    const uploadedThumbnail = await uploadFile(thumbnail);

    console.log({
      uploadedThumbnail,
      uploadedImage1,
      uploadedImage2,
      uploadedImage3,
      uploadedImage4,
    });

    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/product/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          title: formData.title,
          category: formData.category,
          price: parseFloat(formData.price),
          rating: parseFloat(formData.rating),
          thumbnail: uploadedThumbnail,
          image1: uploadedImage1,
          image2: uploadedImage2,
          image3: uploadedImage3,
          image4: uploadedImage4,
          discountPercentage: parseFloat(formData.discountPercentage),
          description: formData.description,
          recipe: formData.recipe,
          special: formData.special,
        }),
      }
    );

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      alert('Food successfully added!');
    } else {
      alert('Failed to add food. Please check the form and try again.');
    }
  
  };

  return (
    <div className="mx-auto mt-20 bg-gray-100 max-w-6xl px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="py-4 text-center font-bold text-3xl font-serif  leading-7 text-gray-900">
              Add New DISH
            </h2>
            <p className="mt-1 text-center font-bold font-serif text-sm leading-6 text-gray-600">
              Here u can add your new Dish.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name of the Dish
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="Dish"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Food-name"
                    onChange={handleChange}
                    value={formData.name}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="recipe"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Recipe
                </label>
                <div className="mt-2">
                  <textarea
                    id="recipe"
                    name="recipe"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    value={formData.recipe}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about the recipe.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail of the Dish
                </label>
                {/* <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="thumbnail"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="thumbnail"
                          name="thumbnail"
                          type="file"
                          className="sr-only"
                          onChange={handleThumbnailChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div> */}
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {formData.thumbnail ? (
                      <img
                        src={formData.thumbnail}
                        alt="Uploaded Thumbnail"
                        className="h-40 w-auto object-cover" // Adjust size as needed
                      />
                    ) : (
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                    )}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="thumbnail"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="thumbnail"
                          name="thumbnail"
                          type="file"
                          className="sr-only"
                          onChange={handleThumbnailChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="images"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photos of the Dish
                </label>
                <div className="flex flex-wrap justify-center mt-2 gap-6">
                  {/* <div className="col-span-full bg-slate-100">
                    <label
                      htmlFor="image1"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Image1
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="image1"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="image1"
                              name="image1"
                              type="file"
                              className="sr-only"
                              onChange={(e) =>
                                handleImageChange(e, setImage1, "image1")
                              }
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div> */}
                  <div className="col-span-full bg-slate-100">
                    <label
                      htmlFor="image1"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Image1
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        {formData.image1 ? (
                          <img
                            src={formData.image1}
                            alt="Uploaded Image1"
                            className="h-40 w-auto object-cover" // Adjust size as needed
                          />
                        ) : (
                          <PhotoIcon
                            className="mx-auto h-12 w-12 text-gray-300"
                            aria-hidden="true"
                          />
                        )}
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="image1"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="image1"
                              name="image1"
                              type="file"
                              className="sr-only"
                              onChange={(e) =>
                                handleImageChange(e, setImage1, "image1")
                              }
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-span-full bg-slate-100">
                    <label
                      htmlFor="image1"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Image2
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="image2"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="image2"
                              name="image2"
                              type="file"
                              className="sr-only"
                              onChange={(e) =>
                                handleImageChange(e, setImage2, "image2")
                              }
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div> */}
                  <div className="col-span-full bg-slate-100">
                    <label
                      htmlFor="image2"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Image2
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        {formData.image2 ? (
                          <img
                            src={formData.image2}
                            alt="Uploaded Image2"
                            className="h-40 w-auto object-cover" // Adjust size as needed
                          />
                        ) : (
                          <PhotoIcon
                            className="mx-auto h-12 w-12 text-gray-300"
                            aria-hidden="true"
                          />
                        )}
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="image2"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="image2"
                              name="image2"
                              type="file"
                              className="sr-only"
                              onChange={(e) =>
                                handleImageChange(e, setImage2, "image2")
                              }
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-span-full bg-slate-100">
                    <label
                      htmlFor="image3"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Image3
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="image3"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="image3"
                              name="image3"
                              type="file"
                              className="sr-only"
                              onChange={(e) =>
                                handleImageChange(e, setImage3, "image3")
                              }
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div> */}
                  <div className="col-span-full bg-slate-100">
                    <label
                      htmlFor="image3"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Image3
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        {formData.image3 ? (
                          <img
                            src={formData.image3}
                            alt="Uploaded Image3"
                            className="h-40 w-auto object-cover" // Adjust size as needed
                          />
                        ) : (
                          <PhotoIcon
                            className="mx-auto h-12 w-12 text-gray-300"
                            aria-hidden="true"
                          />
                        )}
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="image3"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="image3"
                              name="image3"
                              type="file"
                              className="sr-only"
                              onChange={(e) =>
                                handleImageChange(e, setImage3, "image3")
                              }
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-span-full bg-slate-100">
                    <label
                      htmlFor="image4"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Image4
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="image4"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="image4"
                              name="image4"
                              type="file"
                              className="sr-only"
                              onChange={(e) =>
                                handleImageChange(e, setImage4, "image4")
                              }
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div> */}
                  <div className="col-span-full bg-slate-100">
                    <label
                      htmlFor="image4"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Image1
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        {formData.image4 ? (
                          <img
                            src={formData.image4}
                            alt="Uploaded Image4"
                            className="h-40 w-auto object-cover" // Adjust size as needed
                          />
                        ) : (
                          <PhotoIcon
                            className="mx-auto h-12 w-12 text-gray-300"
                            aria-hidden="true"
                          />
                        )}
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="image4"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="image4"
                              name="image4"
                              type="file"
                              className="sr-only"
                              onChange={(e) =>
                                handleImageChange(e, setImage4, "image4")
                              }
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="title"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    value={formData.title}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    autoComplete="category"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    value={formData.category}
                  >
                    <option value="Appetizer">Appetizer</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Side Dish">Side Dish</option>
                    <option value="Beverage">Beverage</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    autoComplete="price"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    value={formData.price}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Rating
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="rating"
                    id="rating"
                    autoComplete="rating"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    value={formData.rating}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount Percentage
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="discountPercentage"
                    id="discountPercentage"
                    autoComplete="discountPercentage"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    value={formData.discountPercentage}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    value={formData.description}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="special"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Special
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    name="special"
                    id="special"
                    autoComplete="special"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    value={formData.special}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="rounded-md bg-indigo-600 mb-5 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 mb-5 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
