import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderData: [],
    // ... other state properties
  },
  reducers: {
    saveOrderData(state, action) {
      state.orderData = action.payload; // Save the order data
    },
    clearOrderData(state) {
      state.orderData = []; // Clear the order data
    },
    updateOrderStatus(state, action) {
      // Logic to update order status
    },
    updateTotalPrice(state, action) {
      // Logic to update total price
    },
    // Add other reducers if necessary
  },
});

// Export actions
export const { saveOrderData, clearOrderData, updateOrderStatus, updateTotalPrice } = orderSlice.actions;

// Export the reducer
export default orderSlice.reducer;
