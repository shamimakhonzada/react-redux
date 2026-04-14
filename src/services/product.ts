// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product, ProductResponse } from "../types/product";

interface GetProductsArgs {
  limit: number;
  skip: number;
}

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }), //mockapi for products
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse, GetProductsArgs>({
      query: ({ limit = 10, skip = 0 }) =>
        `products?limit=${limit}&skip=${skip}`,

      // All calls with the same base key are treated as "the same cache entry"
      // so RTK Query merges new pages into the existing data
      serializeQueryArgs: ({ endpointName }) => endpointName,

      // Merge incoming page into the existing accumulated data
      merge: (currentCache, newResponse, { arg }) => {
        // If this is the first page (skip === 0), replace entirely
        if (arg.skip === 0) {
          return newResponse;
        }
        // Otherwise append new products
        currentCache.products.push(...newResponse.products);
        currentCache.total = newResponse.total;
        currentCache.skip = newResponse.skip;
        currentCache.limit = newResponse.limit;
      },

      // Re-fetch when args change (skip / limit)
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg;
      },
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `products/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
