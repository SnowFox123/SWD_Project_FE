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

        // Axios automatically throws an error for non-2xx responses
        if (response.data.isSuccess) {
            return response.data; // Assuming success data is returned in this format
        } else {
            throw new Error('Failed to update profile.'); // Handle generic failure cases
        }
    } catch (error) {
        if (error.response && error.response.data.errors) {
            // Backend returned validation errors, format and attach them to the error object
            const validationErrors = error.response.data.errors;

            // Create a new Error object and attach validation errors to it
            const validationError = new Error('Validation errors occurred');
            validationError.validationErrors = Object.keys(validationErrors).reduce((acc, key) => {
                acc[key] = validationErrors[key].join(' '); // Join multiple messages if any
                return acc;
            }, {});

            throw validationError; // Throw the error object with validation data
        }
        console.error('Error updating profile:', error);
        throw error; // Re-throw the original error if not validation-related
    }
};




export const changePassword = async (oldPassword, newPassword) => {
    try {
        // Pass newPassword in an object with the key 'password'
        const response = await axiosInstance.put('https://localhost:7221/api/Account/change-password', {
            oldAccountPassword: oldPassword,
            accountPassword: newPassword
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // If successful, return the response data
        if (response.data.isSuccess) {
            return response.data;
        } else {
            throw new Error('Failed to update password.');
        }
    } catch (error) {
        // Handle validation errors
        if (error.response && error.response.data.errors) {
            const validationErrors = error.response.data.errors;
            const formattedErrors = Object.keys(validationErrors).reduce((acc, key) => {
                return acc.concat(validationErrors[key]); // Concatenate all error messages
            }, []);
            throw new Error(formattedErrors.join(' ')); // Join all error messages into a single string
        }
        console.error('Error updating password:', error);
        throw error;
    }
};



