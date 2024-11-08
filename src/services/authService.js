import { axiosInstance } from './customize-axios';

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('https://localhost:7221/api/Auth/sign-in', {
      email,
      password,
    });

    if (response.data.isSuccess) {
      // Return the success response
      return response.data.object; // Return the object with tokens or user data
    } else {
      // Return the failure message from backend (if any)
      return {
        isSuccess: false,
        error: response.data.error || { message: 'Login failed' }, // Return the error message if provided
      };
    }
  } catch (error) {
    // Handle validation errors or general errors from backend
    if (error.response && error.response.data && error.response.data.error) {
      // Return the backend error message with status code 400
      return {
        isSuccess: false,
        error: error.response.data.error, // Pass the error object directly
      };
    }

    // For other unknown errors, return a generic error message
    return {
      isSuccess: false,
      error: {
        code: 'UnknownError',
        message: error.message || 'An unexpected error occurred', // Default error message
      },
    };
  }
};


export const signup = async (accountName, accountEmail, accountPassword, address, phoneNumber) => {
  try {
    const response = await axiosInstance.post('https://localhost:7221/api/Account/sign-up', {
      accountName,
      accountEmail,
      accountPassword,
      address,
      phoneNumber
    });
    if (response.data.isSuccess) {
      return response.data.object;
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }

};


export const signupSupplier = async (accountName, accountEmail, accountPassword, address, phoneNumber) => {
  try {
    const response = await axiosInstance.post('https://localhost:7221/api/Account/sign-up-supplier', {
      accountName,
      accountEmail,
      accountPassword,
      address,
      phoneNumber
    });
    if (response.data.isSuccess) {
      return response.data.object;
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }

};


