import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
  items: [],
  totalQuantity: 0
};

const loadCartFromLocalStorage = () => {
  try {
    const cartData = localStorage.getItem('cart');
    if (!cartData) return defaultState;

    const parsedData = JSON.parse(cartData);
    // Validate the structure of loaded data
    if (!parsedData || !Array.isArray(parsedData.items)) {
      return defaultState;
    }
    
    return {
      items: parsedData.items || [],
      totalQuantity: parsedData.totalQuantity || 0
    };
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return defaultState;
  }
};

const saveCartToLocalStorage = (cartState) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cartState));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      if (!Array.isArray(state.items)) {
        state.items = [];
      }
      
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          img: newItem.img
        });
      }
      state.totalQuantity = (state.totalQuantity || 0) + 1;
      saveCartToLocalStorage(state);
    },
    
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      if (!Array.isArray(state.items)) {
        state.items = [];
        return;
      }
      
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice = existingItem.quantity * existingItem.price;
        }
        state.totalQuantity = Math.max(0, (state.totalQuantity || 0) - 1);
        saveCartToLocalStorage(state);
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      saveCartToLocalStorage(state);
    }
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;