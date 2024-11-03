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

export const SearchToyRent = async (keyword, pageIndex, pageSize) => {
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


export const SortToyRent = async (sortoption, pageIndex, pageSize) => {
    try {
        // Construct the API URL dynamically based on passed arguments
        const url = `https://localhost:7221/api/Toy/SortToysForRent?sortBy=${sortoption}&pageIndex=${pageIndex}&pageSize=${pageSize}`;

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


export const ViewToyRentNew = async (keyword, sortoption, pageIndex, pageSize) => {
    try {
        // Construct the API URL dynamically based on passed arguments
        const url = `https://localhost:7221/api/Toy/view-toys/rent?search=${keyword}&sort=${sortoption}&pageIndex=${pageIndex}&pageSize=${pageSize}`;

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





export const SearchToySale = async (keyword, pageIndex, pageSize) => {
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


export const GetLinkPayment = async (orderId) => {
    try {
        // Construct the API URL dynamically based on passed arguments
        const url = `https://localhost:7221/api/Payment/create-rent-payment-link/${orderId}`;

        // Call the API to get toy rental data
        const response = await axiosInstance.post(url, {
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


export const GetPaid = async (orderId) => {
    try {
        // Construct the API URL dynamically based on passed arguments
        const url = `https://localhost:7221/api/Payment/payment-link-info/${orderId}`;

        // Call the API to get toy rental data
        const response = await axiosInstance.post(url, {
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





export const GetCart = async () => {
    try {
        // Construct the API URL dynamically based on passed arguments
        const url = `https://localhost:7221/api/Cart/rental-cart`;

        // Call the API to get toy rental data
        const response = await axiosInstance.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the response indicates success
        if (response.status === 200 && response.data.isSuccess) {
            const responseData = response.data;

            // Check if the 'object' array contains data
            if (responseData && responseData.object) {
                return responseData.object; // Return the array of cart items
            } else {
                throw new Error('No cart data found.');
            }
        } else {
            throw new Error('Failed to retrieve cart data.');
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
        console.error('Error retrieving cart data:', error);
        throw error; // Re-throw the original error if not validation-related
    }
};

export const GetCart2 = async () => {
    try {
        // Construct the API URL dynamically based on passed arguments
        const url = `https://localhost:7221/api/Cart/sale-cart`;

        // Call the API to get toy rental data
        const response = await axiosInstance.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the response indicates success
        if (response.status === 200 && response.data.isSuccess) {
            const responseData = response.data;

            // Check if the 'object' array contains data
            if (responseData && responseData.object) {
                return responseData.object; // Return the array of cart items
            } else {
                throw new Error('No cart data found.');
            }
        } else {
            throw new Error('Failed to retrieve cart data.');
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
        console.error('Error retrieving cart data:', error);
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



// export const AddToCart = async (toyId, quantity) => {
//     try {
//         // Call the API to add item to cart
//         const response = await axiosInstance.post('https://localhost:7221/api/Cart/add-item-to-cart', {
//             toyId,
//             quantity,
//         });

//         // Check if the response indicates success
//         if (response.data.isSuccess) {
//             return response.data.object; // Return the added cart item
//         } else {
//             throw new Error('Failed to add item to cart.'); // Handle generic failure cases
//         }
//     } catch (error) {
//         if (error.response && error.response.data.errors) {
//             // Handle validation errors returned from the backend
//             const validationErrors = error.response.data.errors;

//             // Create a new Error object and attach validation errors to it
//             const validationError = new Error('Validation errors occurred');
//             validationError.validationErrors = Object.keys(validationErrors).reduce((acc, key) => {
//                 acc[key] = validationErrors[key].join(' '); // Join multiple messages if any
//                 return acc;
//             }, {});

//             throw validationError; // Throw the error object with validation data
//         }

//         console.error('Error adding item to cart:', error);
//         throw error; // Re-throw the original error if not validation-related
//     }
// };

export const AddToCart2 = async (
    toyId,
    quantity = 1,
) => {
    try {
        // Create form data object to handle file uploads
        const formData = new FormData();
        formData.append('toyId', toyId);
        formData.append('quantity', quantity);

        // Make the API request with axiosInstance
        const response = await axiosInstance.post('https://localhost:7221/api/Cart/add-item-to-cart', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Ensure multipart/form-data is used
            },
        });

        // Return the response data if successful
        if (response.data.isSuccess) {
            return response.data;  // You can also return specific response data fields here
        } else {
            throw new Error('Submission failed. Please check the form data.');
        }
    } catch (error) {
        // Catch and rethrow any errors from the API call
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error.message || 'An error occurred while submitting the form.');
        } else {
            throw new Error('Network error or server is unreachable.');
        }
    }
};


export const UserGetToyByID = async (id) => {
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




export const OrderRentToys = async (shippingAddress, receivePhoneNumber, isRentalOrder, toyList, rentalDate, returnDate, voucherId) => {
    try {
        // Construct payload, adding voucherId only if it is defined
        const payload = {
            shippingAddress,
            receivePhoneNumber,
            isRentalOrder,
            toyList,
            rentalDate,
            returnDate,
            ...(voucherId && { voucherId })  // Conditionally add voucherId
        };

        // Call the API to post the order
        const response = await axiosInstance.post('https://localhost:7221/api/Order', payload);

        // Check if the response indicates success
        if (response.data.isSuccess) {
            return response.data.object; // Return the response object if success
        } else {
            throw new Error('Failed to place order.'); // Handle generic failure cases
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
        console.error('Error placing order:', error);
        throw error; // Re-throw the original error if not validation-related
    }
};



export const UserOrderCart = async (id) => {
    try {
        // Call the API to get the toy by its ID
        const response = await axiosInstance.get(`https://localhost:7221/api/Order/order-detail/user/${id}`, {
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

export const ListVoucherUser = async () => {
    try {
        // Construct the API URL dynamically based on passed arguments
        const url = `https://localhost:7221/api/Voucher/for-account`;

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


export const PaymentInfo = async (orderId) => {
    try {
        // Construct the API URL dynamically based on passed arguments
        const url = `https://localhost:7221/api/Payment/payment-link-info/${orderId}`;

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





