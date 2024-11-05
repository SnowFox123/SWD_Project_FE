import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { OrderRentToys, UserOrderCart, GetLinkPayment, ListVoucherUser } from '../../../services/UserServices';
import { Spin, Alert, Form, Input, Button, DatePicker, Row, Col, Table, Modal, List } from 'antd';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const OrderRent = () => {
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
  const [rentalDate, setRentalDate] = useState(null); // Add state to hold rental date

  // Function to disable past dates
  const disablePastDates = (current) => {
    return current && current.isBefore(dayjs().startOf('day')); // Disable all past dates
  };

  const fetchVouchers = async () => {
    try {
      const availableVouchers = await ListVoucherUser();
      setVouchers(availableVouchers.object);
      console.log(availableVouchers.object)
    } catch (error) {
      toast.error('Failed to load vouchers.', error);
      console.error('Voucher error:', error);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    const { shippingAddress, receivePhoneNumber, rentalDate, returnDate } = values;
    const toyList = orderData.map((item) => ({
      toyId: item.toyId,
      quantity: item.quantity,
    }));

    // Convert dates to dayjs objects for comparison
    const rentalDayjs = dayjs(rentalDate);
    const returnDayjs = dayjs(returnDate);

    // Check if returnDate is before rentalDate or not at least one day greater
    if (returnDayjs.isBefore(rentalDayjs) || returnDayjs.diff(rentalDayjs, 'day') < 1) {
      toast.error('Return date must be at least one day after the rental date.');
      setLoading(false);
      return;
    }

    try {
      // Only set voucherId if selectedVoucher.voucherId exists
      const voucherId = selectedVoucher?.voucherId;

      const orderId = await OrderRentToys(
        shippingAddress,
        receivePhoneNumber,
        true,
        toyList,
        rentalDayjs.format(),
        returnDayjs.format(),
        voucherId
      );


      if (typeof orderId === 'number') {
        setOrderId(orderId);
        toast.success(`Order placed successfully! Order ID: ${orderId}`);
        // setError(null);

        const orderDetails = await UserOrderCart(orderId);
        setOrderDetails(orderDetails);
        setFormVisible(false);
      } else {
        throw new Error('Unexpected response format.');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to place order.');
      // setError(err.message || 'Failed to place order.');
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
      const paymentLink = await GetLinkPayment(orderId);
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
    console.log("🚀 ~ handleVoucherSelect ~ selectedVoucher:", selectedVoucher)
    console.log("🚀 ~ handleVoucherSelect ~ voucher.voucherId:", voucher.voucherId)

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
      title: 'Rental Date',
      dataIndex: 'rentalDate',
      key: 'rentalDate',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Return Date',
      dataIndex: 'returnDate',
      key: 'returnDate',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Rental Price',
      dataIndex: 'rentalPrice',
      key: 'rentalPrice',
      render: (text) => `${text} VNĐ`,
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Order Rental</h1>
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
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Rental Date"
                  name="rentalDate"
                  rules={[{ required: true, message: 'Please select rental date!' }]}
                  style={styles.formItem}
                >
                  <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime
                    style={styles.datePicker}
                    disabledDate={disablePastDates}
                    onChange={(date) => setRentalDate(date)} // Save rental date in state
                  />
                </Form.Item>
                <Form.Item
                  label="Return Date"
                  name="returnDate"
                  rules={[{ required: true, message: 'Please select return date!' }]}
                  style={styles.formItem}
                >
                  <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime
                    style={styles.datePicker}
                    disabledDate={(current) => disablePastDates(current) || current.isBefore(rentalDate)} // Disable past dates and dates before rental date
                  />
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
  voucherButton: {
    marginLeft: '10px',
  },
  selectedVoucher: {
    marginTop: '4px',
    fontSize: '16px',
    color: '#333',
    marginLeft: '20px'
  },
  table: {
    marginTop: '20px',
  },
  listItem: {
    cursor: 'pointer',
    padding: '10px',
    borderBottom: '1px solid #e8e8e8',
  },
  voucherTitle: {
    fontWeight: 'bold',
    fontSize: '16px',
  },
};

// CSS for hover effect
const hoverEffectStyle = `
  .voucher-item:hover {
    background-color: #f0f0f0;
  }
`;

// Inject hover effect style
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = hoverEffectStyle;
document.head.appendChild(styleSheet);

export default OrderRent;
