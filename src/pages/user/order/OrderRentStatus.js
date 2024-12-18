import React, { useEffect, useState } from 'react';
import { ViewOrderStatus, CompleteOrder, ReturnRentOrder, UserOrderCart, GetRentLinkPayment2 } from '../../../services/UserServices';
import { Tabs, Table, Spin, Alert, Button, Modal, notification } from 'antd';
import { formatCurrency } from '../../../utils/currency';

const OrderRentStatus = () => {
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeStatus, setActiveStatus] = useState(1); // Default to the first status tab
    const [orderDetails, setOrderDetails] = useState(null); // State to hold order details for modal
    const [detailsLoading, setDetailsLoading] = useState(false); // Loading state for details modal

    const fetchOrderStatus = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await ViewOrderStatus(true, activeStatus);
            if (response.isSuccess) {
                setOrderData(Array.isArray(response.object) ? response.object : []);
            } else {
                setOrderData([]);
                setError('No orders found or an error occurred');
            }
        } catch (err) {
            setError('Failed to fetch order status');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderStatus();
    }, [activeStatus]);

    const handleTabChange = (key) => {
        setActiveStatus(parseInt(key, 10));
    };

    const handleCompleteOrder = async (orderId) => {
        Modal.confirm({
            title: 'Are you sure you want to complete this order?',
            onOk: async () => {
                try {
                    await CompleteOrder(orderId);
                    notification.success({ message: 'Order completed successfully!' });
                    await fetchOrderStatus();
                } catch (error) {
                    notification.error({ message: 'Failed to complete order. Please try again.' });
                    console.error(error);
                }
            },
        });
    };

    const handleReturnOrder = async (orderId) => {
        Modal.confirm({
            title: 'Are you sure you want to return this order?',
            onOk: async () => {
                try {
                    const linkpayment2 = await GetRentLinkPayment2(orderId);

                    if (linkpayment2) {
                        window.open(linkpayment2.object, '_blank'); // Open the link in a new tab
                    }

                    notification.success({ message: 'Order returned successfully!' });
                    await fetchOrderStatus();
                } catch (error) {
                    notification.error({ message: 'Failed to return order. Please try again.' });
                    console.error(error);
                }
            },
        });
    };


    const handleViewDetail = async (orderId) => {
        setDetailsLoading(true);
        setOrderDetails(null); // Reset order details before fetching

        try {
            const details = await UserOrderCart(orderId);
            setOrderDetails(details); // Set the fetched order details
        } catch (error) {
            notification.error({ message: 'Failed to fetch order details. Please try again.' });
            console.error(error);
        } finally {
            setDetailsLoading(false);
        }
    };

    const handleModalClose = () => {
        setOrderDetails(null); // Reset order details on close
    };

    const showActionColumn = orderData.some((order) =>
        order.statusName === 'Shipping' || order.statusName === 'Complete get toy'
    );

    const columns = [
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: 'Shipping Address',
            dataIndex: 'shippingAddress',
        },
        {
            title: 'Phone Number',
            dataIndex: 'receivePhoneNumber',
        },
        {
            title: 'Status',
            dataIndex: 'statusName',
        },
        {
            title: 'Final Amount',
            dataIndex: 'finalMoney',
            render: (text) => formatCurrency(text),
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            render: (text) => (text ? 'Paid' : 'Not Paid'),
        },
        // New column for View Detail
        {
            title: 'Action',
            dataIndex: 'orderId',
            render: (orderId, record) => (
                <>
                    <Button type="primary" onClick={() => handleViewDetail(orderId)}>
                        View Detail
                    </Button>
                    {record.statusName === 'Shipping' && (
                        <Button type="primary" onClick={() => handleCompleteOrder(orderId)} style={{ marginLeft: 8 }}>
                            Complete
                        </Button>
                    )}
                    {record.statusName === 'Complete get toy' && (
                        <Button type="primary" onClick={() => handleReturnOrder(orderId)} style={{ marginLeft: 8 }}>
                            Return
                        </Button>
                    )}
                </>
            ),
        }
    ];

    const statusNames = {
        1: 'Waiting for Approval',
        2: 'Prepare to Ship',
        3: 'Shipping',
        5: 'Returned',
        7: 'Complete get Toy',
        8: 'Completed',
        9: 'Canceled',
    };

    const tabItems = Object.keys(statusNames).map((key) => ({
        label: statusNames[key],
        key: key,
    }));

    return (
        <div>
            <h2>Order Rent Status</h2>
            <Tabs defaultActiveKey="1" items={tabItems} onChange={handleTabChange} />

            {loading && (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <Spin size="large" />
                </div>
            )}

            {error && (
                <Alert message={error} type="error" showIcon style={{ margin: '20px 0' }} />
            )}

            {!loading && !error && (
                <Table
                    dataSource={orderData}
                    columns={columns}
                    rowKey="orderId"
                    pagination={false}
                    locale={{ emptyText: 'No orders found for this status' }}
                />
            )}

            {/* Modal for Order Details */}
            <Modal
                title="Order Details"
                visible={!!orderDetails}
                onCancel={handleModalClose}
                width={1000}
                footer={null}
                confirmLoading={detailsLoading}
            >
                {detailsLoading ? (
                    <Spin />
                ) : orderDetails ? (
                    <div>
                        <p><strong>Account Name:</strong> {orderDetails.accountName}</p>
                        <p><strong>Shipping Address:</strong> {orderDetails.shippingAddress}</p>
                        <p><strong>Phone Number:</strong> {orderDetails.receivePhoneNumber}</p>
                        {/* <p><strong>Status:</strong> {orderDetails.statusName}</p> */}
                        <p><strong>Order Date:</strong> {new Date(orderDetails.orderDate).toLocaleString()}</p>
                        {/* <p><strong>Payment Status:</strong> {orderDetails.paymentStatus ? 'Paid' : 'Pending'}</p> */}

                        <h3>Order Items</h3>
                        <Table
                            dataSource={orderDetails.ordersDetail}
                            columns={[
                                { title: 'Toy Name', dataIndex: 'toyName' },
                                { title: 'Quantity', dataIndex: 'quantity' },
                                {
                                    title: 'Rental Date',
                                    dataIndex: 'rentalDate',
                                    render: (text) => new Date(text).toLocaleString(),
                                },
                                {
                                    title: 'Return Date',
                                    dataIndex: 'returnDate',
                                    render: (text) => new Date(text).toLocaleString(),
                                },
                                { title: 'Rental Price', dataIndex: 'rentalPrice', render: (text) => formatCurrency(text) },
                                {
                                    title: 'Shipper',
                                    dataIndex: 'shipper',
                                    render: (text) => text || 'Not Available',
                                },
                                {
                                    title: 'Shipper Phone',
                                    dataIndex: 'shipperPhone',
                                    render: (text) => text || 'Not Available',
                                },
                            ]}
                            rowKey="toyName"
                            pagination={false}
                        />
                        <p><strong>Total Money:</strong> {formatCurrency(orderDetails.totalMoney)}</p>
                        <p><strong>Discount: </strong>{formatCurrency(orderDetails.discount)}</p>
                        <p><strong>Final Amount:</strong> {formatCurrency(orderDetails.finalMoney)}</p>

                    </div>
                ) : (
                    <div>No details available.</div>
                )}
            </Modal>
        </div>
    );
};

export default OrderRentStatus;
