import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { OrderRentToys, UserOrderCart, ListVoucherUser, GetLinkPayment2 } from '../../../services/UserServices';
import { Spin, Alert, Form, Input, Button, Row, Col, Table, Modal, List } from 'antd';
import { toast } from 'react-toastify';

const OrderSale = () => {
  const orderData = useSelector((state) => state.order.orderData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [formVisible, setFormVisible] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const fetchVouchers = async () => {
    try {
      const availableVouchers = await ListVoucherUser();
      setVouchers(availableVouchers.object);
    } catch (error) {
      toast.error('Failed to load vouchers.');
      console.error('Voucher error:', error);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    const { shippingAddress, receivePhoneNumber } = values;
    const toyList = orderData.map((item) => ({
      toyId: item.toyId,
      quantity: item.quantity,
    }));

    try {
      const voucherId = selectedVoucher?.voucherId;

      const orderId = await OrderRentToys(
        shippingAddress,
        receivePhoneNumber,
        false,
        toyList,
        null,  // Removed rentalDate
        null,  // Removed returnDate
        voucherId
      );

      if (typeof orderId === 'number') {
        setOrderId(orderId);
        toast.success(`Order placed successfully! Order ID: ${orderId}`);
        const orderDetails = await UserOrderCart(orderId);
        setOrderDetails(orderDetails);
        setFormVisible(false);
      } else {
        throw new Error('Unexpected response format.');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!orderId) {
      toast.error("Order ID not found. Please try again.");
      return;
    }
    setPaymentLoading(true);
    try {
      const paymentLink = await GetLinkPayment2(orderId);
      toast.success("Payment link generated successfully!");
      window.open(paymentLink.object, "_blank");
    } catch (error) {
      toast.error("Failed to generate payment link.");
      console.error("Payment error:", error);
    } finally {
      setPaymentLoading(false);
    }
  };

  const openVoucherModal = async () => {
    setModalVisible(true);
    await fetchVouchers();
  };

  const handleVoucherSelect = (voucher) => {
    if (selectedVoucher && selectedVoucher.voucherId === voucher.voucherId) {
      setSelectedVoucher(null);
      toast.info(`Voucher deselected: ${voucher.voucherName}`);
    } else {
      setSelectedVoucher(voucher);
      toast.success(`Voucher selected: ${voucher.voucherName}`);
    }
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const orderColumns = [
    { title: 'Account Name', dataIndex: 'accountName', key: 'accountName' },
    { title: 'Shipping Address', dataIndex: 'shippingAddress', key: 'shippingAddress' },
    { title: 'Receive Phone Number', dataIndex: 'receivePhoneNumber', key: 'receivePhoneNumber' },
    { title: 'Status', dataIndex: 'statusName', key: 'statusName' },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Total Money',
      dataIndex: 'totalMoney',
      key: 'totalMoney',
      render: (text) => `${text} VNĐ`,
    },
    {
      title: 'Final Money',
      dataIndex: 'finalMoney',
      key: 'finalMoney',
      render: (text) => `${text} VNĐ`,
    },
  ];

  const toyColumns = [
    { title: 'Toy Name', dataIndex: 'toyName', key: 'toyName' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `${text} VNĐ`,
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Order Sale</h1>
      {error && <Alert message="Error" description={error} type="error" showIcon />}
      {orderData.length > 0 ? (
        formVisible && (
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
            </Row>
            <Row style={{ padding: '0 0 20px 0', display: 'flex', justifyContent: "flex-end" }}>
              {selectedVoucher && (
                <div style={styles.selectedVoucher}>
                  Selected Voucher: <strong>{selectedVoucher.voucherName}</strong> (Discount: <strong style={{ color: 'red' }}>{selectedVoucher.discount}%</strong>)
                </div>
              )}
              <Button type="default" onClick={openVoucherModal} style={styles.voucherButton}>
                Add Voucher
              </Button>
            </Row>

            <Form.Item style={styles.formItem}>
              <Button type="primary" htmlType="submit" style={styles.submitButton} loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        )
      ) : (
        <p>No order data available.</p>
      )}

      {orderDetails && (
        <>
          <h2 style={styles.subHeader}>Toy Details</h2>
          <Table
            dataSource={orderDetails.ordersDetail}
            columns={toyColumns}
            rowKey={(record) => record.toyName + record.quantity}
            pagination={false}
            style={styles.table}
          />
          <Table
            dataSource={[orderDetails]}
            columns={orderColumns}
            rowKey="accountName"
            pagination={false}
            style={styles.table}
          />

          <Row style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '20px', marginRight: '10%' }}>
            <Col style={{ fontSize: '30px' }}>
              <Button
                style={{ fontSize: '20px', padding: '20px', color: '#fff', backgroundColor: 'red' }}
                onClick={handlePayment}
                loading={paymentLoading}
              >
                Payment
              </Button>
            </Col>
          </Row>
        </>
      )}

      <Modal
        title="Select a Voucher"
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <List
          itemLayout="horizontal"
          dataSource={vouchers}
          renderItem={(voucher) => (
            <List.Item
              onClick={() => handleVoucherSelect(voucher)}
              style={styles.listItem}
              className="voucher-item"
            >
              <List.Item.Meta
                title={<span style={styles.voucherTitle}>{voucher.voucherName}</span>}
                description={`Discount: ${voucher.discount}%`}
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

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
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)',
  },
  formItem: {
    marginBottom: '16px',
  },
  submitButton: {
    width: '100%',
  },
  voucherButton: {
    marginBottom: '20px',
    backgroundColor: 'green',
    color: 'white',
    fontWeight: 'bold',
  },
  table: {
    marginBottom: '20px',
    backgroundColor: '#fff',
  },
  selectedVoucher: {
    marginRight: '20px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  listItem: {
    padding: '10px',
    cursor: 'pointer',
  },
  voucherTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'blue',
  },
};

export default OrderSale;
