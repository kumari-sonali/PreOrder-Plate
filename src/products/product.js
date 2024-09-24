import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const backgroundImages = [
  "url('https://pointos.com/wp-content/uploads/2017/10/cropped-blur-background-of-pub-restaurant-with-wood-table-628137314_2125x1416.jpeg')",
  "url('https://img.freepik.com/premium-photo/background-restaurants-interior-dark-wall_872147-3344.jpg')",
  "url('https://i.pinimg.com/originals/d2/e9/b4/d2e9b4dab96412bf62e1146d3bf269b5.jpg')",
  "url('https://wallpapercave.com/wp/wp1874194.jpg')",
  "url('https://coolwallpapers.me/picsup/5694895-restaurant-wallpapers.jpg')",

  // Add more image URLs as needed
];

export default function Product() {
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(4);
  const [totalCount, setTotalCount] = useState(0);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleMouseEnter = (productId) => {
    const id = setTimeout(() => {
      setHoveredProductId(productId);
    }, 500); // Delay of 1 second
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutId); // Clear the timeout if mouse leaves before delay
    setHoveredProductId(null);
  };

  useEffect(() => {
    fetchProducts(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackgroundIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const fetchProducts = async (currentPage, itemsPerPage) => {
    // console.log({ apiBaseUrl: process.env.REACT_APP_API_BASE_URL });
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/product/list?page=${currentPage}&page_limit=${itemsPerPage}`
      );
      const data = await response.json();
      setProducts(data.products);
      setTotalCount(data.total_count);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () =>
    setCurrentPage((prev) =>
      prev < Math.ceil(totalCount / itemsPerPage) ? prev + 1 : prev
    );
    
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div
      className="bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: backgroundImages[currentBackgroundIndex] }}
    >
      <div className="bg-white bg-opacity-10">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
          <h2 className="text-4xl font-serif text-center tracking-tight text-blue-600">
            Welcome to the food
          </h2>
          {/* <div>
            <input
              type="number"
              id="itemsPerPage"
              name="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => setItemPerPage(Number(e.target.value))}
              className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div> */}

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative transition-transform transform hover:scale-110 shadow-lg rounded-lg overflow-hidden"
                // onMouseEnter={() => setHoveredProductId(product.id)}
                // onMouseLeave={() => setHoveredProductId(null)}
                onMouseEnter={() => handleMouseEnter(product.id)}
                onMouseLeave={handleMouseLeave}
              >
                <Link to={`/viewdetail/${product.id}`}>
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={product.thumbnail}
                      alt={product.thumbnail}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 px-4 py-2 bg-white bg-opacity-90">
                    <div className="flex justify-between items-start">
                      <div>
                        {hoveredProductId === product.id ? (
                          <h3 className="text-sm font-semibold text-gray-700">
                            <a href={product.href}>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              <span className="font-serif font-bold">
                                Special:
                              </span>
                              {product.special}
                            </a>
                          </h3>
                        ) : (
                          <>
                            <h3 className="text-sm font-semibold text-gray-700">
                              <a href={product.href}>
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0"
                                />
                                {product.title}
                              </a>
                            </h3>
                            <div className="mt-1">
                              <StarRatings
                              rating={Number(product.rating) || 0}
                                // rating={product.rating}
                                starRatedColor="gold"
                                starDimension="20px"
                                starSpacing="2px"
                                numberOfStars={5}
                                name="rating"
                              />
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex-shrink-0">
                        <p className="text-sm font-semibold text-white bg-blue-500 px-2 py-1 rounded-lg shadow-md">
                          {hoveredProductId === product.id
                            ? `Discount ${product.discountpercentage}%`
                            : `Rs. ${product.price}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <Pagination
            itemsPerPage={itemsPerPage}
            setItemPerPage={setItemPerPage}
            totalItems={totalCount}
            currentPage={currentPage}
            paginate={paginate}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </div>
      </div>
    </div>
  );
}

// const Pagination = ({
//   itemsPerPage,
//   setItemPerPage,
//   totalItems,
//   currentPage,
//   paginate,
//   nextPage,
//   prevPage,
// }) => {
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   return (
//     <nav className="flex items-center mt-16 opacity-50 justify-between border-spacing-5 border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg shadow-md">
//       <div>
//             <input
//               type="number"
//               id="itemsPerPage"
//               name="itemsPerPage"
//               value={itemsPerPage}
//               onChange={(e) => setItemPerPage(Number(e.target.value))}
//               className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>
//       <div className="flex flex-1 justify-between sm:hidden">
//         <button
//           onClick={prevPage}
//           disabled={currentPage === 1}
//           className="relative inline-flex items-center  rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//         >
//           Previous
//         </button>
//         <button
//           onClick={nextPage}
//           disabled={currentPage === totalPages}
//           className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//         >
//           Next
//         </button>
//       </div>
//       <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//         <div className="flex-1 flex items-center justify-between">
//           <button
//             onClick={prevPage}
//             disabled={currentPage === 1}
//             className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//           >
//             <span className="sr-only">Previous</span>
//             <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
//           </button>
//           <div className="flex-1 flex items-center justify-center space-x-2">
//             {Array.from({ length: totalPages }, (_, index) => (
//               <button
//                 key={index}
//                 onClick={() => paginate(index + 1)}
//                 className={`relative inline-flex items-center px-2 py-1 text-sm font-semibold rounded-full ${
//                   index + 1 === currentPage
//                     ? "bg-indigo-900 text-white"
//                     : "bg-gray-300 text-gray-900"
//                 }`}
//               />
//             ))}
//           </div>
//           <button
//             onClick={nextPage}
//             disabled={currentPage === totalPages}
//             className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//           >
//             <span className="sr-only">Next</span>
//             <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };


const Pagination = ({
  itemsPerPage,
  setItemPerPage,
  totalItems,
  currentPage,
  paginate,
  nextPage,
  prevPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between mt-16 bg-white px-4 py-3 sm:px-6 rounded-lg shadow-md">
      <div className="flex flex-1 justify-between">
        <div className="flex items-center space-x-2">
          <label htmlFor="itemsPerPage" className="text-sm font-medium text-gray-700">Item Per Page:</label>
          <input
            type="number"
            id="itemsPerPage"
            name="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => setItemPerPage(Number(e.target.value))}
            className="w-16 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          />
        </div>
        <div className="flex-grow flex items-center justify-center sm:hidden">
          {currentPage > 1 && (
            <button
              onClick={prevPage}
              className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
          <div className="mx-2 text-sm font-semibold">{currentPage} / {totalPages}</div>
          {currentPage < totalPages && (
            <button
              onClick={nextPage}
              className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="relative inline-flex items-center justify-center h-8 w-8 rounded-full text-gray-400 hover:bg-gray-50 focus:outline-none"
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex items-center justify-center space-x-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
              const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + index;
              return (
                <button
                  key={page}
                  onClick={() => paginate(page)}
                  className={`inline-flex items-center justify-center h-8 w-8 rounded-full font-medium ${
                    page === currentPage
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center justify-center h-8 w-8 rounded-full text-gray-400 hover:bg-gray-50 focus:outline-none"
          >
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </nav>
  );
};
