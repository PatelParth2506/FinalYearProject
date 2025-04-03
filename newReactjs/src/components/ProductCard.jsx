import { Link } from "react-router-dom";
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/store/product/${product._id}`} className="block">
      <div className="shadow-xl rounded-md cursor-pointer p-4">
        <img
          src={product.photo}
          alt={product.description}
          className="w-full h-auto object-contain rounded aspect-[4/3]"
        />
        <div className="bg-gray-50 p-4">
          <h2 className="text-lg font-semibold my-4">
            {product.description.substring(0, 20) + "..."}
          </h2>
          <p className="text-sm text-zinc-500 border-b-2 pb-4">{product.description.substring(0, 60) + "..."}</p>
          <div className="flex justify-between mt-4 items-center">
            <p className="text-xl font-semibold">${product.price}</p>
            <p>View Details</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
