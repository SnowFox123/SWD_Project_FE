import React, { useState, useEffect } from 'react';
import { submitRentalRequest } from '../services/supplierService';
import { Form, Input, InputNumber, Button, Upload, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

import { getCategories } from '../services/staffService';

const RequestRental = () => {
  const [toyName, setToyName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(null); // Initialize with null for default empty selection
  const [rentPricePerDay, setRentPricePerDay] = useState(0);
  const [rentPricePerWeek, setRentPricePerWeek] = useState(0);
  const [rentPricePerTwoWeeks, setRentPricePerTwoWeeks] = useState(0);
  const [stock, setStock] = useState(1);
  const [imageFile, setImageFile] = useState(null); // To handle image file input
  const [imagePreview, setImagePreview] = useState(null); // To show the image preview
  const [categories, setCategories] = useState([]); // Initialize with an empty array
  const [response, setResponse] = useState(null); // To store server response
  const [error, setError] = useState(null); // To store error messages

  // Ant Design form instance
  const [form] = Form.useForm();

  // Fetch categories from API when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res || []); // Set categories or fallback to empty array
      } catch (err) {
        toast.error('Failed to fetch categories.');
      }
    };

    fetchCategories();
  }, []);

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
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
      setError(null); // Clear any previous errors

      // Show success toast
      toast.success('Toy rental request submitted successfully!');

      // Reset form values after successful submission
      setToyName('');
      setDescription('');
      setCategoryId(null);
      setRentPricePerDay(0);
      setRentPricePerWeek(0);
      setRentPricePerTwoWeeks(0);
      setStock(1);
      setImageFile(null);
      setImagePreview(null);
      
      // Reset the entire form
      form.resetFields();
    } catch (err) {
      setError(err.message || 'An error occurred');
      setResponse(null); // Clear any previous success message

      // Show error toast
      toast.error(err.message || 'An error occurred while submitting the request.');
    }
  };

  // Handle image upload before submission
  const handleBeforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      toast.error('You can only upload image files!');
      return false;
    }

    // Read and preview the image file
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    // Save the file to state
    setImageFile(file);
    return false; // Prevent automatic upload
  };

  // Custom validation for InputNumber to check if value is >= 0
  const validateNonNegativeNumber = (rule, value) => {
    if (value >= 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Value must be greater than or equal to zero!'));
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1>Request Toy Rental</h1>
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Form.Item
          label="Toy Name"
          name="toyName"
          rules={[{ required: true, message: 'Please enter the toy name' }]}
        >
          <Input value={toyName} onChange={(e) => setToyName(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter a description' }]}
        >
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select
            placeholder={categories.length > 0 ? 'Select Category' : 'Loading categories...'}
            value={categoryId}
            onChange={(value) => setCategoryId(value)}
            loading={categories.length === 0} // Show loading indicator while categories are being fetched
          >
            {categories.map((category) => (
              <Select.Option key={category.categoryId} value={category.id}>
                {category.categoryName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Rent Price Per Day"
          name="rentPricePerDay"
          rules={[
            { required: true, message: 'Please enter the rent price per day' },
            { validator: validateNonNegativeNumber },
          ]}
        >
          <InputNumber value={rentPricePerDay} onChange={(value) => setRentPricePerDay(value)} />
        </Form.Item>
        <Form.Item
          label="Rent Price Per Week"
          name="rentPricePerWeek"
          rules={[
            { required: true, message: 'Please enter the rent price per week' },
            { validator: validateNonNegativeNumber },
          ]}
        >
          <InputNumber value={rentPricePerWeek} onChange={(value) => setRentPricePerWeek(value)} />
        </Form.Item>
        <Form.Item
          label="Rent Price Per Two Weeks"
          name="rentPricePerTwoWeeks"
          rules={[
            { required: true, message: 'Please enter the rent price for two weeks' },
            { validator: validateNonNegativeNumber },
          ]}
        >
          <InputNumber value={rentPricePerTwoWeeks} onChange={(value) => setRentPricePerTwoWeeks(value)} />
        </Form.Item>
        <Form.Item
          label="Stock"
          name="stock"
          rules={[
            { required: true, message: 'Please enter the stock' },
            { validator: validateNonNegativeNumber },
          ]}
        >
          <InputNumber value={stock} onChange={(value) => setStock(value)} />
        </Form.Item>
        <Form.Item label="Image File" required>
          <Upload
            listType="picture-card"
            beforeUpload={handleBeforeUpload}
            showUploadList={false} // Don't show file list automatically
          >
            {imagePreview ? (
              <img src={imagePreview} alt="preview" style={{ width: '100%' }} />
            ) : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>


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
