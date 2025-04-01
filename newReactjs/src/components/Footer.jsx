import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 shadow-md">
      <div className="container mx-auto px-4">
        <div className="min-h-16">
          <div className="flex justify-between items-center flex-col md:flex-row py-10">
            <h2 className="text-4xl font-bold text-white">
              Subscribe Our Newletter
            </h2>
            <form className="md:w-1/3 w-full mt-8 md:mt-0 relative">
              <input
                type="text"
                placeholder="Enter Your Email  "
                className="py-4 px-4 rounded shadow-md w-full"
              />
              <button className="bg-gray-200 py-3 px-4 rounded-full absolute right-3 top-1">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                cum veritatis maxime aspernatur quibusdam perspiciatis natus
                nemo atque sed fugit?
              </p>
              <div className="flex items-center gap-8 mt-5">
                <Facebook
                  size={40}
                  className="bg-white text-black rounded-md p-2"
                />
                <Twitter
                  size={40}
                  className="bg-white text-black rounded-md p-2"
                />
                <Youtube
                  size={40}
                  className="bg-white text-black rounded-md p-2"
                />
                <Instagram
                  size={40}
                  className="bg-white text-black rounded-md p-2"
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold my-4">Pages</h2>
              <ul>
                <li className="hover:color-blue">
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/">About</Link>
                </li>
                <li>
                  <Link to="/">FAQs</Link>
                </li>
                <li>
                  <Link to="/">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold my-4">Categories</h2>
              <ul>
                <li className="hover:color-blue">
                  <Link to="/">Monitors</Link>
                </li>
                <li>
                  <Link to="/">GPUs</Link>
                </li>
                <li>
                  <Link to="/">PSU</Link>
                </li>
                <li>
                  <Link to="/">Laptops</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold my-4">Categories</h2>
              <p>
                70 Washingto Square South, New York, Ny 10012, United States
              </p>
              <p>+91 9825154321</p>
              <p>+91 9825112345</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto text-center py-4 text-white">
        <p>Copyright &copy; 2025 &#x2022; Kaif Chandiwala</p>
      </div>
    </footer>
  );
};

export default Footer;
