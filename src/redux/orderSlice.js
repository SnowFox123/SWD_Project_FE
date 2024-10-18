import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderData: [],
  },
  reducers: {
    saveOrderData(state, action) {
      state.orderData = action.payload; // Save the order data
    },
    clearOrderData(state) {
      state.orderData = []; // Clear the order data
    },
    // updateOrderStatus(state, action) {
    // },
    // updateTotalPrice(state, action) {
    // },
  },
});

export const { saveOrderData, clearOrderData, updateOrderStatus, updateTotalPrice } = orderSlice.actions;

export default orderSlice.reducer;
