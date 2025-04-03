import React from "react";

const PaymentSuccess = () => {
  return (
    <div className="font-sans flex flex-col w-screen h-screen justify-center items-center text-center px-4">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white px-6 py-8 rounded-lg flex flex-col gap-4 shadow-lg shadow-gray-500">
        <h1 className="text-2xl font-bold text-green-800 break-words">
          Payment Successful !! 🎉
        </h1>
        <p className="text-gray-600 break-words">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <div className="flex justify-center">
        <a 
          href="/store" 
          className="text-white bg-blue-600 font-medium py-2 px-4 rounded-md transition-all duration-300 hover:bg-blue-800 w-full sm:w-48 text-center"
        >
          Go Back to Store
        </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
