"use client";
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

// Exporting a Redux store configured with reducers
export default configureStore({
  reducer: {
    cart: cartSlice, // Assigning the cartSlice reducer to the "cart" key in the store's root reducer
  },
});
