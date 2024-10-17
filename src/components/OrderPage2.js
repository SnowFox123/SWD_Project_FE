import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { OrderRentToys, UserOrderCart } from '../services/UserServices'; // Import both functions
import { Spin, Alert, Form, Input, Button, DatePicker, Row, Col, Table } from 'antd';
import { toast } from 'react-toastify';

const OrderPage2 = () => {
  const orderData = useSelector((state) => state.order.orderData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null); // State to hold order details

  const onFinish = async (values) => {
    setLoading(true);
    const { shippingAddress, receivePhoneNumber, rentalDate, returnDate } = values;
    const toyList = orderData.map((item) => ({
      toyId: item.toyId,
      quantity: item.quantity,
    }));

    if (returnDate.isBefore(rentalDate)) {
      toast.error('Return date must be after rental date.');
      setLoading(false);
      return;
    }

    try {
      // Place the rental order
      const orderId = await OrderRentToys(
        shippingAddress,
        receivePhoneNumber,
        true, // Assuming this is always true based on your original code
        toyList,
        rentalDate,
        returnDate
      );

      if (typeof orderId === 'number') {
        setOrderId(orderId);
        toast.success(`Order placed successfully! Order ID: ${orderId}`);
        setError(null);

        // Call UserOrderCart with the order ID
        const orderDetails = await UserOrderCart(orderId);
        console.log('Order Details:', orderDetails); // Log order details
        setOrderDetails(orderDetails); // Set the order details to state
      } else {
        throw new Error('Unexpected response format.');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to place order.');
      setError(err.message || 'Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  // Define columns for the order summary table
  const orderColumns = [
    {
      title: 'Account Name',
      dataIndex: 'accountName',
      key: 'accountName',
    },
    {
      title: 'Shipping Address',
      dataIndex: 'shippingAddress',
      key: 'shippingAddress',
    },
    {
      title: 'Receive Phone Number',
      dataIndex: 'receivePhoneNumber',
      key: 'receivePhoneNumber',
    },
    {
      title: 'Status',
      dataIndex: 'statusName',
      key: 'statusName',
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (text) => new Date(text).toLocaleString(), // Format date
    },
    {
      title: 'Total Money',
      dataIndex: 'totalMoney',
      key: 'totalMoney',
      render: (text) => `${text} VNĐ`, // Format money
    },
  ];

  // Define columns for the toy details table
  const toyColumns = [
    {
      title: 'Toy Name',
      dataIndex: 'toyName',
      key: 'toyName',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Rental Date',
      dataIndex: 'rentalDate',
      key: 'rentalDate',
      render: (text) => new Date(text).toLocaleString(), // Format date
    },
    {
      title: 'Return Date',
      dataIndex: 'returnDate',
      key: 'returnDate',
      render: (text) => new Date(text).toLocaleString(), // Format date
    },
    {
      title: 'Rental Price',
      dataIndex: 'rentalPrice',
      key: 'rentalPrice',
      render: (text) => `${text} VNĐ`, // Format money
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Order Page</h1>
      {error && <Alert message="Error" description={error} type="error" showIcon />}
      {orderData.length > 0 ? (
        <Form layout="vertical" onFinish={onFinish} style={styles.form}>
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Shipping Address"
                name="shippingAddress"
                rules={[{ required: true, message: 'Please input your shipping address!' }]}
                style={styles.formItem}
              >
                <Input placeholder="Enter your shipping address" />
              </Form.Item>
              <Form.Item
                label="Receive Phone Number"
                name="receivePhoneNumber"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
                style={styles.formItem}
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Rental Date"
                name="rentalDate"
                rules={[{ required: true, message: 'Please select rental date!' }]}
                style={styles.formItem}
              >
                <DatePicker format="YYYY-MM-DD" style={styles.datePicker} />
              </Form.Item>
              <Form.Item
                label="Return Date"
                name="returnDate"
                rules={[{ required: true, message: 'Please select return date!' }]}
                style={styles.formItem}
              >
                <DatePicker format="YYYY-MM-DD" style={styles.datePicker} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item style={styles.formItem}>
            <Button type="primary" htmlType="submit" style={styles.submitButton} loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <p>No order data available.</p>
      )}

      {/* Render the order summary table if available */}
      {orderDetails && (
        <>
         
          <h2 style={styles.subHeader}>Toy Details</h2>
          <Table
            dataSource={orderDetails.ordersDetail} // Directly use the ordersDetail for the toy table
            columns={toyColumns}
            rowKey={(record) => record.toyName + record.rentalDate} // Use a unique key
            pagination={false} // Disable pagination for simplicity
            style={styles.table}
          />

<Table
            dataSource={[orderDetails]} // Wrap orderDetails in an array for the summary table
            columns={orderColumns}
            rowKey="accountName" // Use a unique key
            pagination={false} // Disable pagination for simplicity
            style={styles.table}
          />
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  subHeader: {
    margin: '20px 0',
    color: '#333',
  },
  form: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
  },
  formItem: {
    marginBottom: '16px',
  },
  datePicker: {
    width: '100%',
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#1890ff',
    borderColor: '#1890ff',
  },
  table: {
    marginTop: '20px',
  },
};

export default OrderPage2;
