import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    setProducts(state, action) {
      return Array.isArray(action.payload) ? action.payload : [];
    },
    filterProducts(state, action) {
      return state.filter((product) =>
        product.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    sortProducts(state, action) {
      return [...state].sort((a, b) => {
        if (action.payload === "price") return a.price - b.price;
        if (action.payload === "rating") return b.rating - a.rating;
        return 0;
      });
    },
  },
});

export const { setProducts, filterProducts, sortProducts } = productsSlice.actions;
export default productsSlice.reducer;
