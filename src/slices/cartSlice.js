import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item._id === newItem._id);

      // Use the quantity from the payload if provided, otherwise default to 1
      const quantityToAdd = newItem.quantity || 1;

      if (existingItem) {
        existingItem.quantity += quantityToAdd;
        existingItem.totalPrice += newItem.price * quantityToAdd; // Update totalPrice based on the added quantity
      } else {
        state.items.push({
          ...newItem,
          quantity: quantityToAdd,
          totalPrice: newItem.price * quantityToAdd,
        });
      }

      state.totalQuantity += quantityToAdd;
      state.totalAmount += newItem.price * quantityToAdd;
    },

    deleteCart(state, action) {
      const item_id = action.payload;
      const itemIndex = state.items.findIndex((item) => item._id === item_id);

      if (itemIndex >= 0) {
        const itemPrice = state.items[itemIndex].price; // Access price before removing the item
        state.totalAmount -= itemPrice * state.items[itemIndex].quantity; // Deduct totalPrice of the item
        state.totalQuantity -= state.items[itemIndex].quantity;

        state.items.splice(itemIndex, 1);
      }

      if (state.items.length === 0) {
        state.totalQuantity = 0;
        state.totalAmount = 0;
      }
    },

    deleteAllCarts(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },

    updateCartQuantity(state, action) {
      const { id, quantity } = action.payload; // Access item_id and quantity from the action payload
      // Update the quantity and totalPrice of the item
      const itemIndex = state.items.findIndex((item) => item._id === id);

      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        item.quantity = quantity;
        item.totalPrice = item.price * quantity;
      }
      // Update the totalQuantity and totalAmount
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
});

export const { addCart, deleteCart, deleteAllCarts, updateCartQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
