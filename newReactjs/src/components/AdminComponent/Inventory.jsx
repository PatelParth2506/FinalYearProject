import React, { useState, useEffect } from "react";
import RightSideNavigation from "./RightSideNavigation";
import axios from "axios";

const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('/api/product/getBusinessProduct', {
        withCredentials: true
      })
      console.log(res.data.data)
      setProducts(res.data.data)
    }
    fetchProducts()
  }, []);

  return (
    <div className="w-full mt-5 h-[90vh] flex justify-between items-start gap-4">
      <RightSideNavigation />
      <div className="w-full p-4 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">All Products</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300"
              >
                <img
                  src={product.photo}
                  alt={product.title}
                  className="w-full h-56 object-contain rounded-md mb-3 bg-white"
                />

                <h3 className="text-lg font-semibold truncate">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-xl font-bold mt-2 line-clamp-3">
                  {product.description}
                </p>
                <p className="text-gray-500 text-sm truncate">
                  {product.category}
                </p>
                <p className="text-gray-700 font-medium mt-1">
                  ₹{product.price}
                </p>

              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Inventory;
