// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { UserGetToyByID, OrderRentToys } from '../../../services/UserServices';
// import { Table, Spin, Alert, Form, Input, Button, DatePicker, Row, Col } from 'antd';
// import { toast } from 'react-toastify';

// const OrderPage = () => {
//   const orderData = useSelector((state) => state.order.orderData);
//   const [toyDetails, setToyDetails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isRentalOrder, setIsRentalOrder] = useState(true);

//   // Fetch toy details when orderData changes
//   useEffect(() => {
//     const fetchToyDetails = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const details = await Promise.all(
//           orderData.map((item) => UserGetToyByID(item.toyId))
//         );
//         setToyDetails(details);
//       } catch (err) {
//         setError(err.message || 'Error fetching toy details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (orderData.length > 0) {
//       fetchToyDetails();
//     }
//   }, [orderData]);

//   const columns = [
//     {
//       title: 'Toy ID',
//       dataIndex: 'toyId',
//       key: 'toyId',
//     },
//     {
//       title: 'Image',
//       dataIndex: 'imageUrl',
//       key: 'imageUrl',
//       render: (text, record) => {
//         const toy = toyDetails.find((toy) => toy.toyId === record.toyId);
//         return toy ? (
//           <img src={toy.imageUrl} alt={toy.toyName} style={{ width: 100 }} />
//         ) : (
//           'Loading...'
//         );
//       },
//     },
//     {
//       title: 'Toy Name',
//       dataIndex: 'toyName',
//       key: 'toyName',
//       render: (text, record) => {
//         const toy = toyDetails.find((toy) => toy.toyId === record.toyId);
//         return toy ? toy.toyName : 'Loading...';
//       },
//     },
//     {
//       title: 'Rent Price Per Day',
//       dataIndex: 'rentPricePerDay',
//       key: 'rentPricePerDay',
//       render: (text, record) => {
//         const toy = toyDetails.find((toy) => toy.toyId === record.toyId);
//         return `$${toy ? toy.rentPricePerDay : 'Loading...'}`;
//       },
//     },
//     {
//       title: 'Quantity',
//       dataIndex: 'quantity',
//       key: 'quantity',
//     },
//     {
//       title: 'Price',
//       dataIndex: 'price',
//       key: 'price',
//       render: (text, record) => {
//         const toy = toyDetails.find((toy) => toy.toyId === record.toyId);
//         return `$${toy ? toy.rentPricePerDay * record.quantity : 'Loading...'}`;
//       },
//     },
//   ];

//   const dataSource = orderData.map((item) => ({
//     ...item,
//   }));

//   const onFinish = async (values) => {
//     const { shippingAddress, receivePhoneNumber, rentalDate, returnDate } = values;

//     const toyList = orderData.map((item) => ({
//       toyId: item.toyId,
//       quantity: item.quantity,
//     }));

//     try {
//       const orderId = await OrderRentToys(
//         shippingAddress,
//         receivePhoneNumber,
//         isRentalOrder,
//         toyList,
//         rentalDate,
//         returnDate
//       );

//       if (typeof orderId === 'number') {
//         toast.success(`Order placed successfully! Order ID: ${orderId}`);
//         setError(null);
//       } else {
//         throw new Error('Unexpected response format.');
//       }
//     } catch (err) {
//       toast.error(err.message || 'Failed to place order.');
//       setError(err.message || 'Failed to place order.');
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.header}>Order Page</h1>
//       {loading && <Spin tip="Loading toy details..." />}
//       {error && <Alert message="Error" description={error} type="error" showIcon />}
//       {orderData.length > 0 ? (
//         <>
//           <Form layout="vertical" onFinish={onFinish} style={styles.form}>
//             <Row gutter={24}>
//               <Col xs={24} sm={12}>
//                 <Form.Item
//                   label="Shipping Address"
//                   name="shippingAddress"
//                   rules={[{ required: true, message: 'Please input your shipping address!' }]}
//                   style={styles.formItem}
//                 >
//                   <Input placeholder="Enter your shipping address" />
//                 </Form.Item>
//                 <Form.Item
//                   label="Receive Phone Number"
//                   name="receivePhoneNumber"
//                   rules={[{ required: true, message: 'Please input your phone number!' }]}
//                   style={styles.formItem}
//                 >
//                   <Input placeholder="Enter your phone number" />
//                 </Form.Item>
//               </Col>
//               <Col xs={24} sm={12}>
//                 <Form.Item
//                   label="Rental Date"
//                   name="rentalDate"
//                   rules={[{ required: true, message: 'Please select rental date!' }]}
//                   style={styles.formItem}
//                 >
//                   <DatePicker format="YYYY-MM-DD" style={styles.datePicker} />
//                 </Form.Item>
//                 <Form.Item
//                   label="Return Date"
//                   name="returnDate"
//                   rules={[{ required: true, message: 'Please select return date!' }]}
//                   style={styles.formItem}
//                 >
//                   <DatePicker format="YYYY-MM-DD" style={styles.datePicker} />
//                 </Form.Item>
//               </Col>
//             </Row>
//             <Form.Item style={styles.formItem}>
//               <Button type="primary" htmlType="submit" style={styles.submitButton}>
//                 Submit
//               </Button>
//             </Form.Item>
//           </Form>
//           <Table
//             dataSource={dataSource}
//             columns={columns}
//             rowKey="toyId"
//             pagination={{ pageSize: 5 }}
//             style={styles.table}
//           />
//         </>
//       ) : (
//         <p>No order data available.</p>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: '20px',
//     maxWidth: '1200px',
//     margin: '0 auto',
//     backgroundColor: '#f9f9f9',
//     borderRadius: '8px',
//     boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
//   },
//   header: {
//     textAlign: 'center',
//     marginBottom: '20px',
//     color: '#333',
//   },
//   form: {
//     backgroundColor: '#fff',
//     padding: '20px',
//     borderRadius: '10px',
//     boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
//   },
//   formItem: {
//     marginBottom: '16px',
//   },
//   datePicker: {
//     width: '100%',
//   },
//   submitButton: {
//     width: '100%',
//     backgroundColor: '#1890ff',
//     borderColor: '#1890ff',
//   },
//   table: {
//     marginTop: '20px',
//   },
// };

// export default OrderPage;
