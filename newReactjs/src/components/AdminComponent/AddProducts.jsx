import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RightSideNavigation from "./RightSideNavigation";
import axios from "axios";

const AddProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async()=>{
        const res=await axios.get('/api/product/getBusinessProduct',{
            withCredentials:true
        })
        console.log(res.data.data)
        setProducts(res.data.data)
    }
    fetchProducts()
  }, []);

  const handleProductClick = (product) => {
    navigate("/admin/updateProducts/product", { state: { product } });
  };

  return (
    <div className="w-full mt-5 h-[90vh] flex justify-between items-start gap-4">
      <RightSideNavigation />
      <div className="w-full mt-3 rounded-xl overflow-hidden">
        <h2 className="text-2xl font-bold px-5">Click Product to Update</h2>
        <div className="w-full h-full flex flex-col items-center gap-5 p-2 md:p-5 overflow-hidden">

          {/* Products List */}
          <div className="w-full h-full overflow-auto pr-1 md:pr-2">
            {products.length > 0 ? (
              products.map((product, index) => (
                <div
                  key={index}
                  onClick={() => handleProductClick(product)}
                  className="w-full h-auto py-4 px-4 mb-4 rounded-xl border border-gray-100 bg-gray-800 text-white text-sm flex flex-col sm:flex-row justify-between gap-4 cursor-pointer hover:bg-gray-700 transition"
                >
                  {/* LEFT: Product Details */}
                  <div className="flex flex-col gap-1 w-full sm:w-4/5">
                    <p>
                      <span className="font-semibold">ID:</span> {product._id}
                    </p>
                    <p>
                      <span className="font-semibold">Title:</span>{" "}
                      {product.description.substring(0, 20)}
                    </p>
                    <p>
                      <span className="font-semibold">Price:</span> ₹
                      {product.price}
                    </p>
                    <p>
                      <span className="font-semibold">Category:</span>{" "}
                      {product.category}
                    </p>
                    <p>
                      <span className="font-semibold">Description:</span>{" "}
                      {product.description}
                    </p>
                  </div>

                  {/* RIGHT: Product Image */}
                  <div className="w-full sm:w-1/5 flex justify-center items-center">
                    {product.photo ? (
                      <img
                        src={product.photo}
                        alt={product.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    ) : (
                      <p className="text-sm text-gray-300">No Image</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white text-center text-xl">
                No products available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
