/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// We use thunk to do async operations
export const fetchProducts = createAsyncThunk(
  "cart/fetchProducts",
  async (_args, thunkApi) => {
    try {
      const res = await fetch(`products.json`);
      const data = res.json();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// This is the mixture of both reducer and actions
interface Product {
  id: string;
  name: string;
  price: number;
  qty?: number;
}

interface CartState {
  products: Product[];
  cart: Product[];
  status: string;
  error: any;
}

const initialState: CartState = {
  products: [],
  cart: [],
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart.push({ ...action.payload, qty: 1 });
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter(
        (item: any) => item.id !== action.payload.id
      );
    },
    changeCartQty(state, action) {
      const { id, qty } = action.payload;
      const product = state.cart.find((item) => item.id === id);
      if (product) {
        product.qty = qty;
      }
    },
  },
  // More useful in case we are using thunk
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export const { addToCart, changeCartQty, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
