import React, { useEffect, useState } from "react";

const PaymentCancel = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-[#f0f4ff] via-[#fdf7f7] to-[#e1f0ff]  px-4">
      <div className="w-full md:max-w-sm max-w-xs bg-white/40 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-xl p-6 md:p-8 text-center flex flex-col items-center">

        <div className="relative md:w-24 md:h-24 w-20 h-20 rounded-full bg-red-500 flex items-center justify-center text-white shadow-xl bounce-in">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
            className={`h-14 w-14 ${
              animate ? "scale-up" : "scale-0"
            } transition-transform duration-500 ease-out`}
          >
            <path
              className={`cancel-path ${animate ? "draw-x" : ""}`}
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 16L36 36M36 16L16 36"
            />
          </svg>
        </div>

        <h1 className="text-2xl sm:text-3xl text-red-600 mt-6 mb-2">
          Payment Failed
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-6 px-3">
          Your payment is failed. Please try again later.
        </p>

        <a
          href="/store"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl transition-all duration-300 shadow-md w-full"
        >
          Back to Cart
        </a>
      </div>
    </div>
  );
};

export default PaymentCancel;
