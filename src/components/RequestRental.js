import React, { useState } from 'react';
import { submitRentalRequest } from '../services/supplierService';

const RequestRental = () => {
  // State variables to store form inputs
  const [toyName, setToyName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(2);  // Default category ID 2
  const [rentPricePerDay, setRentPricePerDay] = useState(120);
  const [rentPricePerWeek, setRentPricePerWeek] = useState(240);
  const [rentPricePerTwoWeeks, setRentPricePerTwoWeeks] = useState(360);
  const [stock, setStock] = useState(3);
  const [imageFile, setImageFile] = useState(null);  // To handle image file input

  const [response, setResponse] = useState(null);  // To store server response
  const [error, setError] = useState(null);  // To store error messages

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the API service to submit the form data
      const res = await submitRentalRequest(
        toyName,
        description,
        categoryId,
        rentPricePerDay,
        rentPricePerWeek,
        rentPricePerTwoWeeks,
        stock,
        imageFile
      );

      // Handle success
      setResponse(res);
      setError(null);  // Clear any previous errors
    } catch (err) {
      // Handle error
      setError(err.message || 'An error occurred');
      setResponse(null);  // Clear any previous success message
    }
  };

  return (
    <div>
      <h1>Submit Toy Rental</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Toy Name:</label>
          <input type="text" value={toyName} onChange={(e) => setToyName(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Category ID:</label>
          <input type="number" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required />
        </div>
        <div>
          <label>Rent Price Per Day:</label>
          <input type="number" value={rentPricePerDay} onChange={(e) => setRentPricePerDay(e.target.value)} required />
        </div>
        <div>
          <label>Rent Price Per Week:</label>
          <input type="number" value={rentPricePerWeek} onChange={(e) => setRentPricePerWeek(e.target.value)} required />
        </div>
        <div>
          <label>Rent Price Per Two Weeks:</label>
          <input type="number" value={rentPricePerTwoWeeks} onChange={(e) => setRentPricePerTwoWeeks(e.target.value)} required />
        </div>
        <div>
          <label>Stock:</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </div>
        <div>
          <label>Image File:</label>
          <input type="file" onChange={(e) => setImageFile(e.target.files[0])} required />
        </div>
        <button type="submit">Submit</button>
      </form>

      {/* Display server response or error */}
      {response && (
        <div>
          <h3>Response from server:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div style={{ color: 'red' }}>
          <h3>Error:</h3>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default RequestRental;
