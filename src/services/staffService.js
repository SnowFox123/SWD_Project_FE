import { axiosInstance } from './customize-axios';

export const getCategories = async () => {
    try {
        // Call the API to get categories
        const response = await axiosInstance.get('https://localhost:7221/api/Category/categories', {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the response indicates success
        if (response.data.isSuccess) {
            return response.data.object; // Return the categories from the response
        } else {
            throw new Error('Failed to retrieve categories.'); // Handle generic failure cases
        }
    } catch (error) {
        if (error.response && error.response.data.errors) {
            // Handle validation errors returned from the backend
            const validationErrors = error.response.data.errors;

            // Create a new Error object and attach validation errors to it
            const validationError = new Error('Validation errors occurred');
            validationError.validationErrors = Object.keys(validationErrors).reduce((acc, key) => {
                acc[key] = validationErrors[key].join(' '); // Join multiple messages if any
                return acc;
            }, {});

            throw validationError; // Throw the error object with validation data
        }
        console.error('Error retrieving categories:', error);
        throw error; // Re-throw the original error if not validation-related
    }
};

export const postCategories = async (categoryName) => {
    try {
        // Call the API to get categories
        const response = await axiosInstance.post('https://localhost:7221/api/Category/category', {
            categoryName
          });

        // Check if the response indicates success
        if (response.data.isSuccess) {
            return response.data.object; // Return the categories from the response
        } else {
            throw new Error('Failed to retrieve categories.'); // Handle generic failure cases
        }
    } catch (error) {
        if (error.response && error.response.data.errors) {
            // Handle validation errors returned from the backend
            const validationErrors = error.response.data.errors;

            // Create a new Error object and attach validation errors to it
            const validationError = new Error('Validation errors occurred');
            validationError.validationErrors = Object.keys(validationErrors).reduce((acc, key) => {
                acc[key] = validationErrors[key].join(' '); // Join multiple messages if any
                return acc;
            }, {});

            throw validationError; // Throw the error object with validation data
        }
        console.error('Error retrieving categories:', error);
        throw error; // Re-throw the original error if not validation-related
    }
};


export const putCategories = async (categoryId,categoryName) => {
    try {
        // Call the API to get categories
        const response = await axiosInstance.put('https://localhost:7221/api/Category/category', {
            categoryId,
            categoryName,
          });

        // Check if the response indicates success
        if (response.data.isSuccess) {
            return response.data.object; // Return the categories from the response
        } else {
            throw new Error('Failed to retrieve categories.'); // Handle generic failure cases
        }
    } catch (error) {
        if (error.response && error.response.data.errors) {
            // Handle validation errors returned from the backend
            const validationErrors = error.response.data.errors;

            // Create a new Error object and attach validation errors to it
            const validationError = new Error('Validation errors occurred');
            validationError.validationErrors = Object.keys(validationErrors).reduce((acc, key) => {
                acc[key] = validationErrors[key].join(' '); // Join multiple messages if any
                return acc;
            }, {});

            throw validationError; // Throw the error object with validation data
        }
        console.error('Error retrieving categories:', error);
        throw error; // Re-throw the original error if not validation-related
    }
};
