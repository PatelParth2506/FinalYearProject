import React from "react";

const PaymentCancel = () => {
  return (
    <div className="text-center">
      <h1>Payment Failed! ❌</h1>
      <p>Your payment was not successful. Please try again.</p>
      <a href="/store/cart" className="text-blue-500">Go Back to Cart</a>
    </div>
  );
};

export default PaymentCancel;
