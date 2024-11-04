import React, { useEffect, useState } from 'react';
import { ViewOrderStatus, CompleteOrder } from '../../../services/UserServices';
import { Tabs, Table, Spin, Alert, Button, Modal, notification } from 'antd';

const OrderSaleStatus = () => {
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeStatus, setActiveStatus] = useState(1);

    const fetchOrderStatus = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await ViewOrderStatus(false, activeStatus);
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
                    notification.success({ message: 'Order Sale completed successfully!' });
                    await fetchOrderStatus();
                } catch (error) {
                    notification.error({ message: 'Failed to complete order. Please try again.' });
                    console.error(error);
                }
            },
        });
    };


    // Determine if we should show the Action column based on order statuses
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
            render: (text) => `$${text.toFixed(2)}`,
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            render: (text) => (text ? 'Paid' : 'Pending'),
        },
        // Conditionally add the Action column
        ...(showActionColumn ? [{
            title: 'Action',
            dataIndex: 'orderId',
            render: (orderId, record) => {
                if (record.statusName === 'Shipping') {
                    return (
                        <Button type="primary" onClick={() => handleCompleteOrder(orderId)}>
                            Complete
                        </Button>
                    );
                }
                return null; // Return null for other statuses
            },
        }] : []), // Include Action column if showActionColumn is true
    ];

    const statusNames = {
        1: 'Waiting for Approval',
        2: 'Prepare to Ship',
        3: 'Shipping',
        8: 'Completed',
        9: 'Canceled',
    };

    const tabItems = Object.keys(statusNames).map((key) => ({
        label: statusNames[key],
        key: key,
    }));

    return (
        <div>
            <h2>Order Sale Status</h2>
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
        </div>
    );
};

export default OrderSaleStatus;
