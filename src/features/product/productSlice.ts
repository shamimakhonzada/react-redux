import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product, SortOption } from "../../types/product";

export interface ProductState {
  products: Product[] | null;
  search: string;
  sortBy: SortOption;
}

const initialState: ProductState = {
  products: null,
  search: "",
  sortBy: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.search = "";
      state.sortBy = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSearch, setSortBy, resetFilters } = productSlice.actions;

export default productSlice.reducer;
