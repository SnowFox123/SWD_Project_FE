import { axiosInstance } from './customize-axios';

// Define the function to submit the rental request
export const submitRentalRequest = async (
  ToyName,
  Description,
  CategoryId,
  RentPricePerDay,
  RentPricePerWeek,
  RentPricePerTwoWeeks,
  Stock,
  ImageFile
) => {
  try {
    // Create form data object to handle file uploads
    const formData = new FormData();
    formData.append('ToyName', ToyName);
    formData.append('Description', Description);
    formData.append('CategoryId', CategoryId);
    formData.append('RentPricePerDay', RentPricePerDay);
    formData.append('RentPricePerWeek', RentPricePerWeek);
    formData.append('RentPricePerTwoWeeks', RentPricePerTwoWeeks);
    formData.append('Stock', Stock);
    formData.append('ImageFile', ImageFile);  // Append the image file

    // Make the API request with axiosInstance
    const response = await axiosInstance.post('https://localhost:7221/api/Request/rental', formData, {
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


export const submitSaleRequest = async (
  ToyName,
  Description,
  CategoryId,
  BuyPrice,
  Stock,
  ImageFile
) => {
  try {
    // Create form data object to handle file uploads
    const formData = new FormData();
    formData.append('ToyName', ToyName);
    formData.append('Description', Description);
    formData.append('CategoryId', CategoryId);
    formData.append('BuyPrice', BuyPrice);
    formData.append('Stock', Stock);
    formData.append('ImageFile', ImageFile);  // Append the image file

    // Make the API request with axiosInstance
    const response = await axiosInstance.post('https://localhost:7221/api/Request/sale', formData, {
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



