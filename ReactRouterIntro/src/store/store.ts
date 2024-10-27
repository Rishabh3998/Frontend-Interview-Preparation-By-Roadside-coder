import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slices/cartSlice";
import filterSlice from "../slices/filterSlice";

const store = configureStore({
  reducer: {
    // We call these reducers in toolkit language a slice
    cart: cartSlice,
    filter: filterSlice,
  },
});

export default store;
