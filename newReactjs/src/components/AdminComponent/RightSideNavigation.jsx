import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const RightSideNavigation = () => {
  return (
    <div className="h-[92.5%] hidden md:block flex-col justify-between w-[16rem]">
      <div className="h-full hidden md:block md:w-64">
        <ul className="w-full h-[50%] px-5">
          <Link to={"/admin"}>
            <li className="h-14 w-full flex items-center pl-4 hover:bg-gray-600 cursor-pointer border my-2 rounded-md font-sbold text-xl transition-all hover:text-white">
              Dashboard
            </li>
          </Link>
          <Link to={"/admin/Customers"} className="w-full">
            <li className="h-14 w-full flex items-center pl-4 hover:bg-gray-600 cursor-pointer border my-2 rounded-md font-sbold text-xl transition-all hover:text-white">
              Customers
            </li>
          </Link>
          <Link to={"/admin/updateProducts"} className="w-full">
            <li className="h-14 w-full flex items-center pl-4 hover:bg-gray-600 cursor-pointer border my-2 rounded-md font-sbold text-xl transition-all hover:text-white">
              Update Products
            </li>
          </Link>
          <Link to={"/admin/addProduct"} className="w-full">
            <li className="h-14 w-full flex items-center pl-4 hover:bg-gray-600 cursor-pointer border my-2 rounded-md font-sbold text-xl transition-all hover:text-white">
              Add Products
            </li>
          </Link>
          <Link to={"/admin/Inventory"} className="w-full">
            <li className="h-14 w-full flex items-center pl-4 hover:bg-gray-600 cursor-pointer border my-2 rounded-md font-sbold text-xl transition-all hover:text-white">
              Inventory
            </li>
          </Link>

          <Link to={"/admin/Orders"} className="w-full">
            <li className="h-14 w-full flex items-center pl-4 hover:bg-gray-600 cursor-pointer border my-2 rounded-md font-sbold text-xl transition-all hover:text-white">
              Orders
            </li>
          </Link>
          <li className="h-14 w-full flex items-center pl-4 hover:bg-gray-600 cursor-pointer border my-2 rounded-md font-sbold text-xl transition-all hover:text-white">
            FAQs
          </li>
          <li className="h-14 w-full flex items-center pl-4 hover:bg-gray-600 cursor-pointer border my-2 rounded-md font-sbold text-xl transition-all hover:text-white">
            About
          </li>
          <li className="h-14 w-full flex items-center pl-4 hover:bg-gray-600 cursor-pointer border my-2 rounded-md font-sbold text-xl transition-all hover:text-white">
            Contact
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default RightSideNavigation;
