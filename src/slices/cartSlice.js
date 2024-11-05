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

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price; // Add the new price to totalPrice
      } else {
        state.items.push({
          ...newItem,
          quantity: 1 || newItem.quantity,
          totalPrice: newItem.price,
        });
      }

      state.totalQuantity++;
      state.totalAmount += newItem.price;
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
      const { _id, quantity } = action.payload; // Access item_id and quantity from the action payload
      // Update the quantity and totalPrice of the item
      const itemIndex = state.items.findIndex((item) => item._id === _id);

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
