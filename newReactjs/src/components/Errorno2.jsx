import React from "react";

const Errorno2 = () => {
  return (
    <div className="font-sans fixed top-6 left-1/2 transform -translate-x-1/2 w-full max-w-lg px-4 z-50">
      <div className="relative w-full bg-white border-l-8 border-red-500 rounded-xl shadow-lg px-6 py-4 flex items-start gap-4 ring-1 ring-red-200">

        <div className="flex-shrink-0 mt-1">
          <div className="w-9 h-9 flex items-center justify-center bg-red-100 text-red-600 rounded-full shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.764-1.36 2.683-1.36 3.447 0l5.451 9.719c.75 1.338-.213 3.032-1.724 3.032H4.53c-1.511 0-2.474-1.694-1.724-3.032l5.451-9.719zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-.25-2.75a.75.75 0 01-1.5 0V7.75a.75.75 0 011.5 0v2.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="text-sm sm:text-base text-gray-800 leading-snug">
          <strong className="text-red-600">Username Alert:</strong> Only use <span className="font-semibold text-red-500">letters, digits,</span> and <span className="font-semibold text-red-500">underscores</span>. Length must be between <span className="font-semibold text-red-500">5 to 18 characters</span>.
        </div>
      </div>
    </div>
  );
};

export default Errorno2;
