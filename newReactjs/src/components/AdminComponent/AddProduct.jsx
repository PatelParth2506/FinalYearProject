import { useState, useEffect } from "react";
import gallery from '../../assets/gallery.png';
import axios from "axios";
import RightSideNavigation from "./RightSideNavigation";

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    title: "",
    price: "",
    description: "",
    category: "all",
    image: null,
    imagePreview: null,
    quentity: ""
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = async () => {
      const res = await axios.get(`/api/product/getAllProduct`, {
        withCredentials: true
      });
      setProducts(res.data.data);
    };
    storedProducts();
  }, []);

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductDetails({ 
        ...productDetails, 
        image: file, 
        imagePreview: URL.createObjectURL(file) 
      });
    }
  };

  const addProduct = async () => {
    const { title, price, description, quentity, image } = productDetails;

    if (!title || !price || !description || !quentity || !image) {
      alert("Please fill in all fields before adding the product.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", productDetails.category);
    formData.append("quentity", quentity);
    formData.append("photo", image); // Ensure backend expects "photo"

    try {
      const res = await axios.post(`/api/product/createProduct`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      const updatedProducts = [...products, res.data.data];
      setProducts(updatedProducts);

      setProductDetails({
        title: "",
        price: "",
        description: "",
        category: "all",
        image: null,
        imagePreview: null,
        quentity: ""
      });

      alert("Product added successfully!");
    } catch (err) {
      console.error("Error uploading product:", err);
      alert("Failed to upload product.");
    }
  };

  return (
    // <div className="w-full flex justify-center min-h-full bg-gray-900 mt-2">
     <div className="w-full mt-5 h-[90vh] flex justify-between items-start gap-4">
       <RightSideNavigation />
      <div className="w-[620px] min-h-fit px-10 pt-7 pb-5 rounded-lg bg-white mb-5  ">
        <div className="flex justify-center items-center mb-2">
          <h1 className="text-2xl font-medium text-gray-700">Add Product</h1>
        </div>

        <div className="mb-4">
          <p className="text-[16px] text-gray-600 mb-1">Product Title</p>
          <input
            type="text"
            name="title"
            value={productDetails.title}
            onChange={changeHandler}
            placeholder="Type here"
            className="w-full h-11 rounded-md pl-4 border border-gray-900 outline-none text-gray-600 text-[15px]"
          />
        </div>

        <div className="mb-3">
          <p className="text-[16px] text-gray-600 mb-1">Description</p>
          <textarea
            name="description"
            value={productDetails.description}
            onChange={changeHandler}
            placeholder="Enter product description"
            className="w-full h-24 rounded-md pl-4 pt-2 border border-gray-900 outline-none text-gray-600 text-[15px] resize-none"
          ></textarea>
        </div>

        <div className="flex gap-3 mb-4">
          <div className="w-1/2">
            <p className="text-[16px] text-gray-600 mb-1">Price</p>
            <input
              type="text"
              name="price"
              value={productDetails.price}
              onChange={changeHandler}
              placeholder="Type here"
              className="w-full h-11 rounded-md pl-4 border border-gray-900 outline-none text-gray-600 text-[15px]"
            />
          </div>
          <div className="w-1/2">
            <p className="text-[16px] text-gray-600 mb-1">Quantity</p>
            <input
              type="number"
              name="quentity"
              value={productDetails.quentity}
              onChange={changeHandler}
              placeholder="Type here"
              className="w-full h-11 rounded-md pl-4 border border-gray-900 outline-none text-gray-600 text-[15px]"
              min="1"
            />
          </div>
        </div>

        <div className="mb-4">
          <p className="text-[16px] text-gray-600 mb-1">Product Category</p>
          <select
            name="category"
            value={productDetails.category}
            onChange={changeHandler}
            className="w-full h-11 rounded-md border border-gray-900 px-4 outline-none text-gray-600 text-[15px]"
          >
            <option value="all">All</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>

        <div className="flex">
          <div className="w-1/2 text-gray-500 flex justify-center flex-col gap-2">
            <p className="text-[16px] text-gray-600 mb-1">Product Image</p>
            <label htmlFor="file-upload" className="cursor-pointer">
              <img src={gallery} alt="gallery" className="w-7 h-7 cursor-pointer" />
            </label>
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              className="hidden"
              onChange={imageHandler}
            />
            {productDetails.imagePreview && (
              <img src={productDetails.imagePreview} alt="Selected" className="w-24 h-24 rounded" />
            )}
          </div>

          <div className="w-1/2 flex justify-center items-center">
            <button
              onClick={addProduct}
              className="w-full h-11 rounded-md bg-gray-900 text-white font-medium text-lg hover:bg-gray-800">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
