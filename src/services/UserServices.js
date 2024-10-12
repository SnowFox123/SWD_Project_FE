import { axiosInstance } from './customize-axios';


// import axios from './customize-axios';

// const fetchAllUser = () => {
//     return axios.get("/api/user?page=1");
// }

// const loginApi = (email, password, accessToken) => {
//     return axios.post("/api/Auth/sign-in", { email, password }); 
// } 

// export { loginApi }


export const ViewToyRent = async (pageIndex, pageSize) => {
    try {
        // Construct the API URL dynamically based on passed arguments
        const url = `https://localhost:7221/api/Toy/ViewToysRent?pageIndex=${pageIndex}&pageSize=${pageSize}`;

        // Call the API to get toy rental data
        const response = await axiosInstance.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the response indicates success
        if (response.status === 200) {
            const responseData = response.data;

            // Check if response data contains the necessary fields
            if (responseData && responseData.items) {
                return responseData.items; // Return the list of toys from the response
            } else {
                throw new Error('No toy data found.');
            }
        } else {
            throw new Error('Failed to retrieve toy rental data.');
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
        console.error('Error retrieving toy rental data:', error);
        throw error; // Re-throw the original error if not validation-related
    }
};

export const ViewToySale = async (pageIndex, pageSize) => {
    try {
        // Construct the API URL dynamically based on passed arguments
        const url = `https://localhost:7221/api/Toy/ViewToysSale?pageIndex=${pageIndex}&pageSize=${pageSize}`;

        // Call the API to get toy rental data
        const response = await axiosInstance.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the response indicates success
        if (response.status === 200) {
            const responseData = response.data;

            // Check if response data contains the necessary fields
            if (responseData && responseData.items) {
                return responseData.items; // Return the list of toys from the response
            } else {
                throw new Error('No toy data found.');
            }
        } else {
            throw new Error('Failed to retrieve toy rental data.');
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
        console.error('Error retrieving toy rental data:', error);
        throw error; // Re-throw the original error if not validation-related
    }
};


export const SearchToyRent = async (keyword,pageIndex, pageSize) => {
    try {
        // Construct the API URL dynamically based on passed arguments
        const url = `https://localhost:7221/api/Toy/search/rent?keyword=${keyword}&pageIndex=${pageIndex}&pageSize=${pageSize}`;

        // Call the API to get toy rental data
        const response = await axiosInstance.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the response indicates success
        if (response.status === 200) {
            const responseData = response.data;

            // Check if response data contains the necessary fields
            if (responseData && responseData.items) {
                return responseData.items; // Return the list of toys from the response
            } else {
                throw new Error('No toy data found.');
            }
        } else {
            throw new Error('Failed to retrieve toy rental data.');
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
        console.error('Error retrieving toy rental data:', error);
        throw error; // Re-throw the original error if not validation-related
    }
};

export const SearchToySale = async (keyword,pageIndex, pageSize) => {
    try {
        // Construct the API URL dynamically based on passed arguments
        const url = `https://localhost:7221/api/Toy/search/sale?keyword=${keyword}&pageIndex=${pageIndex}&pageSize=${pageSize}`;

        // Call the API to get toy rental data
        const response = await axiosInstance.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the response indicates success
        if (response.status === 200) {
            const responseData = response.data;

            // Check if response data contains the necessary fields
            if (responseData && responseData.items) {
                return responseData.items; // Return the list of toys from the response
            } else {
                throw new Error('No toy data found.');
            }
        } else {
            throw new Error('Failed to retrieve toy rental data.');
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
        console.error('Error retrieving toy rental data:', error);
        throw error; // Re-throw the original error if not validation-related
    }
};