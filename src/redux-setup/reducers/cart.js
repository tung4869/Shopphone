import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const items = state.items;
      let isProductExist = false;
      items.map((item) => {
        if (item._id === action.payload._id) {
          item.qty += Number(action.payload.qty);
          isProductExist = true;
        }
        return item;
      });
      const newItems = isProductExist ? items : [...items, action.payload];
      state.items = newItems;
    },
    updateCart: (state, action) => {
      state.items = updateItemCart(state, action.payload);
    },
    deleteCart: (state, action) => {
      const items = state.items;
      const newItems = items.filter((item) => item._id !== action.payload._id);
      state.items = newItems;
    },
  },
});

const updateItemCart = (state, payload) => {
  const items = state.items;
  items.map((item) => {
    if (item._id === payload._id) {
      item.qty = Number(payload.qty);
    }
  });
  return items;
};
export const { addToCart, updateCart, deleteCart } = cartReducer.actions;
export default cartReducer.reducer;
