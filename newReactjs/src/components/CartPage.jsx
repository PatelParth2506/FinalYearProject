import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, Trash2 } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  fetchCart,
  addProductToCart,
  removeProductFromCart,
  updateProductQuentity,
} from "../features/cart/cartSlice";
import axios from "axios";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems);
  useEffect(()=>{
    dispatch(fetchCart())
  },[dispatch])
  const total = cartItems.reduce(
    (sum, item) => sum + item.productinfo.price * item.quentity,
    0
  );

  const makePayment = async()=>{
    const stripe=await loadStripe("pk_test_51R83AxFQJFwT0MWobvjOOBo8yHXSoFGzSTxaq5N3uNS466Zx2FViMT2h1X1oYi4cuMvhMkk36x00rKw98ws4CAkl00kqCV3F7e")
    
    const response = await axios.post("/api/payment/checkout",cartItems,{
      withCredentials:true,
    })
    console.log(response)

    const session = response.data
    console.log(session)

    const result = await stripe.redirectToCheckout({
      sessionId:session.data.id
    })     
    console.log(result)
    if(result.error){
      console.log(result.error.message)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
          <p className="text-gray-600">Please, add some products</p>
          <Link
            to="/store"
            className="inline-block bg-zinc-200 px-6 py-2 rounded-lg hover:bg-zinc-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">Shopping Cart</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ✅ Cart Items Section */}
        <div className="lg:col-span-2 shadow-md p-4 rounded-md bg-white">
          {cartItems.map((item) => (
            console.log(item),
            <div
              key={item._id}
              className="flex items-center gap-4 py-4 border-b"
            >
              <Link to={`/product/${item._id}`}>
                <img
                  src={item.productinfo.photo}
                  alt={item.productinfo.description.substring(0,20)}
                  className="w-24 h-24 object-cover rounded"
                />
              </Link>

              <div className="flex-1">
                <Link
                  to={`/product/${item._id}`}
                  className="font-semibold hover:text-blue-600"
                >
                  {item.productinfo.description.substring(0,20)}
                </Link>
                <p className="text-gray-500">Price: ${item.productinfo.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-2">
                  {/* 🔻 Decrease Quantity */}
                  <button
                    className="p-1 rounded-full hover:bg-gray-100"
                    onClick={() =>
                      dispatch(
                        updateProductQuentity({
                          productid: item.productinfo._id,
                          quentity: Math.max(1, item.quentity - 1),
                        })
                      )
                    }
                  >
                    <Minus size={16} />
                  </button>

                  <span>{item.quentity}</span>

                  {/* 🔺 Increase Quantity */}
                  <button
                    className="p-1 rounded-full hover:bg-gray-100"
                    onClick={() =>
                      dispatch(
                        updateProductQuentity({
                          productid: item.productinfo._id,
                          quentity: item.quentity + 1
                        })
                      )
                    }
                  >
                    <Plus size={16} />
                  </button>

                  {/* 🗑️ Remove from Cart */}
                  <button
                    className="ml-4 text-red-500 hover:text-red-700"
                    onClick={() => dispatch(removeProductFromCart({ productid: item.productinfo._id }))}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">
                  ${(item.productinfo.price * item.quentity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-md p-4 rounded-md">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Sub Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700" onClick={makePayment}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
