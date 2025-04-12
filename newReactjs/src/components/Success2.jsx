import React from "react";

const Success2 = () => {
  return (
    <div className="font-sans fixed top-6 left-1/2 transform -translate-x-1/2 w-full max-w-lg px-4 z-50">
      <div className="relative w-full bg-white border-l-8 border-green-500 rounded-xl shadow-lg px-6 py-4 flex items-start gap-4 ring-1 ring-green-200">

        <div className="flex-shrink-0 mt-1">
          <div className="w-9 h-9 flex items-center justify-center bg-green-100 text-green-600 rounded-full shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.293 6.293a1 1 0 00-1.414 0L8 12.586 4.121 8.707a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="text-sm sm:text-base text-gray-800 leading-snug">
          <strong className="text-green-600">Success:</strong> You have successfully logged in.
        </div>
      </div>
    </div>
  );
};

export default Success2;
