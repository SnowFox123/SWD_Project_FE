import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserGetToyByID, OrderRentToys } from '../services/UserServices'; // Adjust the import based on your file structure
import { Table, Spin, Alert, Form, Input, Button, DatePicker, Checkbox } from 'antd'; // Import necessary Ant Design components

const OrderPage = () => {
  const orderData = useSelector((state) => state.order.orderData); // Access order data from Redux
  const [toyDetails, setToyDetails] = useState([]); // Local state for storing toy details
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const [successMessage, setSuccessMessage] = useState(null); // State for success message

  useEffect(() => {
    const fetchToyDetails = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching

      try {
        const details = await Promise.all(
          orderData.map(item => UserGetToyByID(item.toyId)) // Call the API for each toyId
        );

        setToyDetails(details); // Store the fetched toy details in state
      } catch (err) {
        setError(err.message || 'Error fetching toy details'); // Handle errors
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    if (orderData.length > 0) {
      fetchToyDetails(); // Only fetch if there are order items
    }
  }, [orderData]); // Depend on orderData

  const columns = [
    {
      title: 'Toy ID',
      dataIndex: 'toyId',
      key: 'toyId',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Toy Name',
      dataIndex: 'toyName',
      key: 'toyName',
      render: (_, record) => toyDetails[record.index]?.toyName || 'Loading...', // Render toy name from toyDetails
    },
    {
      title: 'Rent Price Per Day',
      dataIndex: 'rentPricePerDay',
      key: 'rentPricePerDay',
      render: (_, record) => `$${toyDetails[record.index]?.rentPricePerDay || 'Loading...'}`,
    },
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (_, record) => (
        toyDetails[record.index]?.imageUrl ? (
          <img src={toyDetails[record.index].imageUrl} alt={toyDetails[record.index].toyName} style={{ width: 100 }} />
        ) : 'Loading...'
      ),
    },
  ];

  const dataSource = orderData.map((item, index) => ({
    ...item,
    index, // Add index for mapping to toyDetails
  }));

  const onFinish = async (values) => {
    const { shippingAddress, receivePhoneNumber, isRentalOrder, rentalDate, returnDate } = values;

    const toyList = orderData.map(item => ({
      toyId: item.toyId,
      quantity: item.quantity,
    }));

    try {
      await OrderRentToys(shippingAddress, receivePhoneNumber, isRentalOrder, toyList, rentalDate, returnDate);
      setSuccessMessage('Order placed successfully!'); // Set success message
      setError(null); // Reset error message
    } catch (err) {
      setError(err.message || 'Failed to place order.'); // Set error message
      setSuccessMessage(null); // Reset success message
    }
  };

  return (
    <div>
      <h1>Order Page</h1>
      {loading && <Spin tip="Loading toy details..." />}
      {error && <Alert message="Error" description={error} type="error" showIcon />}
      {successMessage && <Alert message="Success" description={successMessage} type="success" showIcon />}
      {orderData.length > 0 ? (
        <>
          <Table 
            dataSource={dataSource} 
            columns={columns} 
            rowKey="toyId" // Specify the key for rows
          />
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Shipping Address"
              name="shippingAddress"
              rules={[{ required: true, message: 'Please input your shipping address!' }]}
            >
              <Input placeholder="Enter your shipping address" />
            </Form.Item>
            <Form.Item
              label="Receive Phone Number"
              name="receivePhoneNumber"
              rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
              <Input placeholder="Enter your phone number" />
            </Form.Item>
            <Form.Item
              label="Is Rental Order"
              name="isRentalOrder"
              valuePropName="checked"
            >
              <Checkbox>Yes</Checkbox>
            </Form.Item>
            <Form.Item
              label="Rental Date"
              name="rentalDate"
              rules={[{ required: true, message: 'Please select rental date!' }]}
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item
              label="Return Date"
              name="returnDate"
              rules={[{ required: true, message: 'Please select return date!' }]}
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Place Order
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <p>No order data available.</p>
      )}
    </div>
  );
};

export default OrderPage;
