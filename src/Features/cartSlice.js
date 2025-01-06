import { createSlice } from '@reduxjs/toolkit';

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : []; // Return parsed cart or an empty array
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart(state, action) {
      // Check if item already exists in cart based on both id and selectedSize
      const existingItem = state.find(
        item => item.id === action.payload.id && item.size === action.payload.size
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity; // Increment quantity if already in cart
      } else {
        state.push({ ...action.payload, quantity: action.payload.quantity }); // Add new item to cart
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart(state, action) {
      const updatedCart = state.filter(
          item => !(item.id === action.payload.id && item.size == action.payload.size) // Remove item from cart based on id and selectedSize
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    },
    clearCart: () => {
      return []; // Reset cart to an empty array
    },
    
  },
});

export const selectTotalPrice = (state) =>
  state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

export const { addToCart, removeFromCart ,clearCart} = cartSlice.actions;
export default cartSlice.reducer;
