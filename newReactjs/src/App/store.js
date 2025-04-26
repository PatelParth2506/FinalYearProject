import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/ProductSlice";
import cartReducer from "../features/cart/cartSlice"
import authReducer from "../features/authSlice"

export const store = configureStore({
  reducer: {
    auth:authReducer,
    cart: cartReducer,
    product: ProductReducer,
  },
});

export default store;
