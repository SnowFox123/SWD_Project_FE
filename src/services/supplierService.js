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



export const GetRentOrderDetail = async () => {
  try {
    const url = `https://localhost:7221/api/Order/rent-details-for-supplier`;

    const response = await axiosInstance.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export const GetSaleOrderDetail = async () => {
  try {
    const url = `https://localhost:7221/api/Order/sale-details-for-supplier`;

    const response = await axiosInstance.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};


export const getToyByID = async (toyId) => {
  try {
    const url = `https://localhost:7221/api/Toy/${toyId}`;

    const response = await axiosInstance.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data.object;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export const GetInfoShip = async (orderDetailId) => {
  try {
    const url = `https://localhost:7221/api/Order/information-ship/${orderDetailId}`;

    const response = await axiosInstance.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export const SupplierConfirmShip = async ({ orderDetailId, shipper, shipperPhone }) => {
  try {
    const url = `https://localhost:7221/api/Order/supplier-confirm-ship`;

    const response = await axiosInstance.put(
      url,
      { orderDetailId, shipper, shipperPhone },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error confirming shipping: ", error);
    throw error;
  }
};


export const ViewToyRentSupplier = async (keyword, sortoption, pageIndex, pageSize) => {
  try {
    const url = `https://localhost:7221/api/Toy/view-toys/for-rent-supplier?search=${keyword}&sort=${sortoption}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    const response = await axiosInstance.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export const ViewToySaleSupplier = async (keyword, sortoption, pageIndex, pageSize) => {
  try {
    const url = `https://localhost:7221/api/Toy/view-toys/sell-supplier?search=${keyword}&sort=${sortoption}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    const response = await axiosInstance.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export const UpdateToySupplier = async (toyId, updatedToyData) => {
  try {
    const url = `https://localhost:7221/api/Toy/update${toyId}`;
    const response = await axiosInstance.put(url, updatedToyData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating toy: ", error);
    throw error;
  }
};


export const GetCategorySupplier = async () => {
  try {
    const url = `https://localhost:7221/api/Category`;
    const response = await axiosInstance.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export const PutCategorySupplier = async (categoryId, categoryName) => {
  try {
    const url = `https://localhost:7221/api/Category`; // Assuming the API endpoint uses categoryId in the URL
    const response = await axiosInstance.put(url, {
      categoryId: categoryId,
      categoryName: categoryName,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating category: ", error);
    throw error;
  }
};



export const DeleteToySupplier = async (toyId) => {
  try {
    const url = `https://localhost:7221/api/Toy/delete?id=${toyId}`;
    const response = await axiosInstance.put(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating toy: ", error);
    throw error;
  }
};

