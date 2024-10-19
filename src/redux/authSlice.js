import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,     
    refreshToken: null,    
    role: null,             // User's role (1: User, 2: Supplier, 3: Staff, 4: Admin)
    email: null,
    unique_name: null,
    phone: null,
    isAuthenticated: false,
  },
  reducers: {
    // Action to handle successful login
    loginSuccess: (state, action) => {
      const { accessToken, refreshToken, role, email, unique_name, phone } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.role = role;               
      state.email = email;               
      state.unique_name = unique_name;
      state.phone = phone;
      state.isAuthenticated = true;    
    },
    // Action to handle logout
    logout: (state) => {
      state.accessToken = null;      
      state.refreshToken = null;     
      state.role = null;             
      state.email = null;    
      state.unique_name = null;
      state.phone = null;
      state.isAuthenticated = false;  
    },
    // Optional: Action to update role if needed
    updateRole: (state, action) => {
      state.role = action.payload;    
    },

    // Action to update name and phone
    updateNamePhone: (state, action) => {
      const { accountName, phoneNumber } = action.payload;
      state.unique_name = accountName;  
      state.phone = phoneNumber;       
    },
  },
});

// Export actions to be used in components
export const { loginSuccess, logout, updateRole, updateNamePhone } = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;
