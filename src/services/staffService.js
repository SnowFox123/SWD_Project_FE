import { axiosInstance } from './customize-axios';

export const getCategories = async () => {
    try {
        // Call the API to get categories
        const response = await axiosInstance.get('https://localhost:7221/api/Category', {
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
        const response = await axiosInstance.post('https://localhost:7221/api/Category', {
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


export const putCategories = async (categoryId, categoryName) => {
    try {
        // Call the API to get categories
        const response = await axiosInstance.put('https://localhost:7221/api/Category', {
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


//get request

export const getAnsweredRequests = async () => {
    try {
        // Call the API to get categories
        const response = await axiosInstance.get('https://localhost:7221/api/Request/answered-requests?page=1&size=10', {
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

export const getUnansweredRequests = async () => {
    try {
        // Call the API to get categories
        const response = await axiosInstance.get('https://localhost:7221/api/Request/unanswered-requests?page=1&size=10', {
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

export const getToyByID = async (id) => {
    try {
        // Call the API to get the toy by its ID
        const response = await axiosInstance.get(`https://localhost:7221/api/Toy/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the response indicates success
        if (response.data.isSuccess) {
            return response.data.object; // Return the toy object from the response
        } else {
            throw new Error('Failed to retrieve toy.'); // Handle generic failure cases
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
        console.error('Error retrieving toy:', error);
        throw error; // Re-throw the original error if not validation-related
    }
};


export const getAllAccount = async (page = 1) => {
    try {
        // Call the API to get the toy by its ID
        const response = await axiosInstance.get(`https://localhost:7221/api/Account?page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the response indicates success
        if (response.data.isSuccess) {
            return response.data.object; // Return the toy object from the response
        } else {
            throw new Error('Failed to retrieve toy.'); // Handle generic failure cases
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
        console.error('Error retrieving toy:', error);
        throw error; // Re-throw the original error if not validation-related
    }
};

export const banAccount = async (accountId) => {
    try {
        // Call the API to ban the account by its ID
        const response = await axiosInstance.put(`https://localhost:7221/api/Account/banAccount?account=${accountId}`,
            // { accountId },  // Send the accountId in the request body
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // Check if the response indicates success
        if (response.data.isSuccess) {
            return response.data.message; // Return the success message from the response
        } else {
            throw new Error('Failed to ban the account.'); // Handle generic failure cases
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
        console.error('Error banning account:', error);
        throw error; // Re-throw the original error if not validation-related
    }
};

export const PutSignUpSupplier = async (accountName, accountEmail, accountPassword, address, phoneNumber) => {
    try {
        const response = await axiosInstance.post('https://localhost:7221/api/Account/sign-up-supplier', {
            accountName,
            accountEmail,
            accountPassword,
            address,
            phoneNumber
        });

        // Check if the response indicates success
        return response.error?.message; // Return the success message from the response

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
        console.error('Error banning account:', error);
        throw error; // Re-throw the original error if not validation-related
    }
};



export const AcceptDenyRequest = async (requestId, requestStatus, denyReason) => {
    try {
        // Call the API to get categories
        const response = await axiosInstance.put('https://localhost:7221/api/Request/status', {
            requestId,
            requestStatus,
            denyReason
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

export const ListVoucher = async () => {
    try {
        // Construct the API URL dynamically based on passed arguments
        const url = `https://localhost:7221/api/Voucher/list-vouchers`;

        // Call the API to get toy rental data
        const response = await axiosInstance.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw error; // Throw the error for handling in the component
    }
};


export const AddNewVoucher = async (formData) => {
    try {
        // Construct the API URL dynamically based on passed arguments
        const url = `https://localhost:7221/api/Voucher/new-voucher`;

        // Call the API to get toy rental data
        const response = await axiosInstance.post(url, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw error; // Throw the error for handling in the component
    }
};


export const PutVoucher = async (formData) => {
    try {
        // Construct the API URL dynamically based on passed arguments
        const url = `https://localhost:7221/api/Voucher/voucher-information`;

        // Call the API to get toy rental data
        const response = await axiosInstance.put(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw error; // Throw the error for handling in the component
    }
};