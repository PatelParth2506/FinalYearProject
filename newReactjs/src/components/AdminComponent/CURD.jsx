import React, { useEffect, useRef, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import RightSideNavigation from "./RightSideNavigation";
import axios from "axios";

function CURD() {
  console.log("CURD component rendered");
  const { state } = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [isEditable, setIsEditable] = useState(false);
  const [product, setProduct] = useState(state?.product || {});
  const [allProducts, setAllProducts] = useState([]);

  if (!product || !product._id) {
    return (
      <p className="text-white text-2xl text-center mt-10">
        No product selected.
      </p>
    );
  }
  useEffect(()=>{
    const fetchProducts = async() =>{
      const res= await axios.get('/api/product/getBusinessProduct',{
        withCredentials:true
      })
      setAllProducts(res.data.data)
    }
    fetchProducts()
  },[])
  const handleDelete = async() => {
    const res=await axios.delete(`/api/product/deleteProduct/${product._id}`,{
      withCredentials:true
    })
    if(res.status===200){
      const updatedProducts = allProducts.filter((p) => p._id !== product._id);
    }
    navigate("/UpdateProducts");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    if (isEditable) fileInputRef.current.click();
  };

  const handleImageChange = async(e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
        const formdata = new FormData();
        formdata.append("photo", file);
        const res=await axios.patch(`/api/product/updateProductPhoto/${product._id}`,formdata,{
          withCredentials:true
        })
        setProduct((prev) => ({ ...prev, image: res.data.image }));
    }
  };

  const handleUpdate = () => {
    if (isEditable) {
      const updatedProducts = allProducts.map((p) =>
           p.id === state.product.id
          ? product
          : p
      );
      setAllProducts(updatedProducts);
      setIsEditable(false);
    } else {
      setIsEditable(true);
    }
  };

  return (
    <div className="w-full mt-5 h-[90vh] flex justify-between items-start gap-4">
      <RightSideNavigation />
      <div className="mx-2 w-full h-auto bg-gray-900 mt-3 rounded-xl flex flex-col lg:flex-row items-center justify-center p-4 gap-6 overflow-hidden">
        <div className="w-full lg:w-1/2 bg-white p-4 rounded-xl flex justify-center items-center">
          <img
            src={product.photo}
            alt={product.title}
            className="w-full max-w-xs h-auto rounded-xl object-contain cursor-pointer"
            onClick={handleImageClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />
        </div>

        <div className="w-full lg:w-1/2 text-white space-y-4">
          <div>
            <label className="block text-sm font-semibold">Title</label>
            <textarea
              name="title"
              value={product.title}
              onChange={handleChange}
              readOnly={!isEditable}
              className="w-full bg-transparent border-b border-white outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              readOnly={!isEditable}
              className="w-full bg-transparent border-b border-white outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Price</label>
            <input
              name="price"
              value={product.price}
              onChange={handleChange}
              readOnly={!isEditable}
              className="w-full bg-transparent border-b border-white outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              disabled={!isEditable}
              className="w-full bg-gray-800 text-white border-b border-white outline-none"
            >
              <option value="all">All</option>
              <option value="graphic-cards">Graphic Cards</option>
              <option value="processors">Processors</option>
              <option value="storage">Storage</option>
              <option value="memory">Memory</option>
              <option value="cases">Cases</option>
              <option value="power-supplies">Power Supplies</option>
              <option value="monitors">Monitors</option>
              <option value="peripherals">Peripherals</option>
              <option value="audio">Audio</option>
              <option value="laptops">Laptops</option>
            </select>
          </div>

          <div className="flex flex-wrap justify-start gap-2 pt-4">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black"
            >
              {isEditable ? "Save" : "Update"}
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black"
            >
              Delete
            </button>
            <Link
              to="/admin"
              className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black"
            >
              ← Back to Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CURD;
