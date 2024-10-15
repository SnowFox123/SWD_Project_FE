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


export const GetCart = async () => {
  try {
    // Construct the API URL dynamically based on passed arguments
    const url = `https://localhost:7221/api/Cart/get-cart`;

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

  
  
  
