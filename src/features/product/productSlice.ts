import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";

export interface ProductState {
  products: Product[] | null;
}

const initialState: ProductState = {
  products: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    filterProducts: (state) => {},
    sortProducts: (state, action: PayloadAction<number>) => {},
  },
});

// Action creators are generated for each case reducer function
export const { filterProducts, sortProducts } = productSlice.actions;

export default productSlice.reducer;
