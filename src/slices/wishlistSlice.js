import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
  },
  reducers: {
    addWishlist(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item._id === newItem._id); // Check if the item already exists in the wishlist

      if (!existingItem) {
        state.items.push(newItem);
      }
    },

    deleteWishlist(state, action) {
      const id = action.payload;
      const itemIndex = state.items.findIndex((item) => item._id === id); // Find the index of the item to delete

      if (itemIndex >= 0) {
        state.items.splice(itemIndex, 1);
      }
    },

    deleteAllWishlists(state) {
      state.items = [];
    },
  },
});

export const { addWishlist, deleteWishlist, deleteAllWishlists } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
