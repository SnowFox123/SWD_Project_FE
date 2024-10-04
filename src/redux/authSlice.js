import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,      // JWT access token for authenticated users
    refreshToken: null,     // Refresh token for obtaining new access tokens
    role: null,             // User's role (1: User, 2: Supplier, 3: Staff, 4: Admin)
    email: null,
    unique_name: null,
    phone: null,
    isAuthenticated: false, // Indicates whether the user is authenticated
  },
  reducers: {
    // Action to handle successful login
    loginSuccess: (state, action) => {
      const { accessToken, refreshToken, role, email, unique_name, phone } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.role = role;               // Save role from JWT token
      state.email = email;               
      state.unique_name = unique_name;
      state.phone = phone;
      state.isAuthenticated = true;    // Set authentication status to true
    },
    // Action to handle logout
    logout: (state) => {
      state.accessToken = null;       // Clear access token
      state.refreshToken = null;      // Clear refresh token
      state.role = null;              // Clear role
      state.email = null;    
      state.unique_name = null;
      state.phone = null;
      state.isAuthenticated = false;   // Set authentication status to false
    },
    // Optional: Action to update role if needed
    updateRole: (state, action) => {
      state.role = action.payload;    // Update user role
    },

    // Action to update name and phone
    updateNamePhone: (state, action) => {
      const { accountName, phoneNumber } = action.payload;
      state.unique_name = accountName;  // Update accountName (or unique_name)
      state.phone = phoneNumber;        // Update phone number
    },
  },
});

// Export actions to be used in components
export const { loginSuccess, logout, updateRole, updateNamePhone } = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;
