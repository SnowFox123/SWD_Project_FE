// import axios from 'axios';
import { axiosInstance } from './customize-axios';

export const login = async (email, password) => {
    try {
        const response = await axiosInstance.post('https://localhost:7221/api/Auth/sign-in', {
            email,
          password,
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


