import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../Features/ProductsSlice';
import cartReducer from '../Features/cartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});

export default store;