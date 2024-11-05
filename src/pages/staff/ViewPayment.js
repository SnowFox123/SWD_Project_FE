// ViewPaymentForStaff.js
import React, { useState, useEffect } from 'react';
import { Tabs, Table, Spin, message } from 'antd';
import { ViewPaymentForStaff } from '../../services/staffService'; // Ensure correct path for ViewPaymentForStaff function

const { TabPane } = Tabs;

const ViewPayment = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [activeTab, setActiveTab] = useState("0"); // default to status 0 (Tab 1)

    // Function to fetch payment data based on status
    const fetchData = async (status) => {
        setLoading(true);
        try {
            const response = await ViewPaymentForStaff(status);
            // Ensure response contains the expected structure
            if (response.isSuccess && Array.isArray(response.object)) {
                setData(response.object);
            } else {
                setData([]);
                message.error("Unexpected data format from the server.");
            }
        } catch (error) {
            message.error("Failed to load payment data.");
            console.error("Error fetching payment data: ", error);
            setData([]); // Set data to an empty array on error
        } finally {
            setLoading(false);
        }
    };

    // Fetch data when activeTab changes
    useEffect(() => {
        fetchData(activeTab);
    }, [activeTab]);

    // Columns for the table, matching the structure of the API response
    const columns = [
        {
            title: 'Payment ID',
            dataIndex: 'paymentId',
            key: 'paymentId',
        },
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId',
        },
        {
            title: 'Account ID',
            dataIndex: 'accountId',
            key: 'accountId',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => `$${amount}`, // Format as currency
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (status === 0 ? 'Pending' : 'Completed'),
        },
        {
            title: 'Transaction ID',
            dataIndex: 'transactionId',
            key: 'transactionId',
        },
        {
            title: 'Transaction Date',
            dataIndex: 'transactionDate',
            key: 'transactionDate',
            render: (date) => new Date(date).toLocaleDateString(), // Format as local date
        },
    ];

    return (
        <div>
            <Tabs
                activeKey={activeTab}
                onChange={(key) => setActiveTab(key)}
            >
                <TabPane tab="Pending Payments" key="0">
                    {loading ? (
                        <Spin />
                    ) : (
                        <Table 
                            columns={columns} 
                            dataSource={data} 
                            rowKey="paymentId" 
                        />
                    )}
                </TabPane>
                <TabPane tab="Completed Payments" key="1">
                    {loading ? (
                        <Spin />
                    ) : (
                        <Table 
                            columns={columns} 
                            dataSource={data} 
                            rowKey="paymentId" 
                        />
                    )}
                </TabPane>
            </Tabs>
        </div>
    );
};

export default ViewPayment;
