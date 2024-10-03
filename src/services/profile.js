// import axios from 'axios';
import { axiosInstance } from './customize-axios';

export const getProfile = async () => {
    try {
        const response = await axiosInstance.get('https://localhost:7221/api/Account/profile', {

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


export const updateProfile = async (updatedProfile) => {
    try {
        const response = await axiosInstance.put('https://localhost:7221/api/Account/edit-profile', updatedProfile, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Axios already throws an error for non-2xx responses, so no need to check `!response.ok`
        if (response.data.isSuccess) {
            return response.data; // Assuming the success data comes in this format
        } else {
            throw new Error('Failed to update profile.'); // Handle any other errors
        }
    } catch (error) {
        if (error.response && error.response.data.errors) {
            // If the backend returned validation errors, format them
            const validationErrors = error.response.data.errors;
            const formattedErrors = Object.keys(validationErrors).reduce((acc, key) => {
                return acc.concat(validationErrors[key]); // Concatenate all error messages
            }, []);
            throw new Error(formattedErrors.join(' ')); // Join all error messages into a single string
        }
        console.error('Error updating profile:', error);
        throw error;
    }
};


