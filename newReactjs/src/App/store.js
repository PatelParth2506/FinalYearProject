import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/ProductSlice";
import cartReducer from "../features/cart/cartSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: ProductReducer,
  },
});

export default store;
