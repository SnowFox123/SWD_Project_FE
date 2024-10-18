import React, { useState, useEffect } from 'react';
import { submitSaleRequest } from '../../services/supplierService';
import { Form, Input, InputNumber, Button, Upload, message, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles
import { getCategories } from '../../services/staffService';

const RequestSale = () => {
  const [form] = Form.useForm(); // Sử dụng form instance của Ant Design
  const [toyName, setToyName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [buyPrice, setBuyPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [categories, setCategories] = useState([]);
  const [imageFileList, setImageFileList] = useState([]); // Changed from imageFile to imageFileList
  const [imagePreview, setImagePreview] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res || []);
      } catch (err) {
        // console.error('Error fetching categories:', err);
        toast.error('Failed to fetch categories.');
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await submitSaleRequest(
        toyName,
        description,
        categoryId,
        buyPrice,
        stock,
        imageFileList[0] // Use the first image file in the array
      );

      setResponse(res);
      setError(null);
      toast.success('Form submitted successfully!');

      // Reset form fields to their default values
      form.resetFields(); // Đặt lại toàn bộ form
      setToyName('');
      setDescription('');
      setCategoryId(null);
      setBuyPrice(0);
      setStock(0);
      setImageFileList([]); // Reset the image file list
      setImagePreview(null);
    } catch (err) {
      setError(err.message || 'An error occurred');
      toast.error(`Error: ${err.message || 'An error occurred'}`);
      setResponse(null);
    }
  };

  const handleBeforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return false;
    }

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    // Update the image file list
    setImageFileList([file]); // Set the file list to contain the new file
    return false; // Prevent automatic upload
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1>Request Toy Sale</h1>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Toy Name" name="toyName" required>
          <Input value={toyName} onChange={(e) => setToyName(e.target.value)} required />
        </Form.Item>
        <Form.Item label="Description" name="description" required>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} required />
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
            loading={categories.length === 0}
          >
            {categories.map((category) => (
              <Select.Option key={category.categoryId} value={category.id}>
                {category.categoryName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Buy Price" name="buyPrice" required>
          <InputNumber value={buyPrice} onChange={(value) => setBuyPrice(value)} required />
        </Form.Item>
        <Form.Item label="Stock" name="stock" required>
          <InputNumber value={stock} onChange={(value) => setStock(value)} required />
        </Form.Item>
        <Form.Item label="Image File" name="imageFile" required>
          <Upload
            listType="picture-card"
            beforeUpload={handleBeforeUpload}
            fileList={imageFileList} // Use fileList instead of value
            showUploadList={false}
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

      <ToastContainer />
    </div>
  );
};

export default RequestSale;
