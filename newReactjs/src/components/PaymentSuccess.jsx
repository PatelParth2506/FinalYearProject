import React from "react";

const PaymentSuccess = () => {
  return (
    <div className="text-center">
      <h1>Payment Successful! 🎉</h1>
      <p>Thank you for your purchase. Your order has been confirmed.</p>
      <a href="/store" className="text-blue-500">Go Back to Store</a>
    </div>
  );
};

export default PaymentSuccess;
