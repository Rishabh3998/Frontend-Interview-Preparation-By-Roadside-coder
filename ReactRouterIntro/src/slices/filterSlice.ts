import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  byStock: boolean;
  byRating: number;
  searchQuery: string;
  sort: string;
}

const initialState: IInitialState = {
  byStock: false,
  byRating: 0,
  searchQuery: "",
  sort: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    sortByPrice(state, action) {
      state.sort = action.payload;
    },
    filterByStock(state, action) {
      state.byStock = action.payload;
    },
    filterByRating(state, action) {
      state.byRating = action.payload;
    },
    filterBySearch(state, action) {
      state.searchQuery = action.payload;
    },
    clearFilters(state) {
      state.byRating = 0;
      state.byStock = false;
      state.searchQuery = "";
      state.sort = "";
    },
  },
});

export const {
  sortByPrice,
  clearFilters,
  filterByRating,
  filterBySearch,
  filterByStock,
} = filterSlice.actions;
export default filterSlice.reducer;
