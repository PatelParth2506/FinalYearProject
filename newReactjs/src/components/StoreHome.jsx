import React from "react";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import { setSelectedCategory } from "../features/ProductSlice"; // ✅ Fixed import path
import { useDispatch } from "react-redux";

const categories = [
  { name: "All", image: "/src/assets/img/all.png" },
  { name: "Graphic Cards", image: "/src/assets/img/G-Card.png" },
  { name: "Processors", image: "/src/assets/img/processor.png" },
  { name: "Storage", image: "/src/assets/img/storage.png" },
  { name: "Memory", image: "/src/assets/img/Computer RAM.png" },
  { name: "Cases", image: "/src/assets/img/cases.png" },
  { name: "Power Supplies", image: "/src/assets/img/PSU.png" },
  { name: "Monitors", image: "/src/assets/img/monitors.webp" },
  { name: "Peripherals", image: "/src/assets/img/peripherals.png" },
  { name: "Audio", image: "/src/assets/img/audio.png" },
  { name: "Laptops", image: "/src/assets/img/laptops.webp" },
];

const StoreHome = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="bg"></div>
      <div className="container mx-auto my-10 px-4 flex flex-col items-center gap-2">
        <h3 className="font-semibold text-3xl mb-3">Catergory</h3>
        {/* Category Section */}
        <div className=" bg-gray-100 rounded-md w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 px-4 py-4 place-items-center">
          {categories.map((cat) => (
            <button key={cat.name} className="flex flex-col items-center gap-2">
              <img
                src={cat.image}
                className="w-16 h-16 object-contain"
                onClick={() => {
                  dispatch(setSelectedCategory(cat.name));
                }}
              />
              <span className="text-sm font-medium">{cat.name}</span>
            </button>
          ))}
        </div>
        <h3 className="font-semibold text-3xl mt-4">Products</h3>
        {/* Product Grid Area */}
        <ProductGrid />
      </div>
      <Footer />
    </div>
  );
};

export default StoreHome;
