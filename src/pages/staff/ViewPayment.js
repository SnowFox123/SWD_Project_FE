import React, { useState, useEffect } from 'react';
import { Tabs, Table, Spin, message } from 'antd';
import { ViewPaymentForStaff } from '../../services/staffService'; // Ensure correct path for ViewPaymentForStaff function
import { getAllAccount } from '../../services/staffService'; // Adjust path if necessary

const { TabPane } = Tabs;

const ViewPayment = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [activeTab, setActiveTab] = useState("0"); // default to status 0 (Tab 1)

    // Function to fetch payment data and account details
    const fetchData = async (status) => {
        setLoading(true);
        try {
            // Fetch payment data based on status
            const response = await ViewPaymentForStaff(status);
            if (response.isSuccess && Array.isArray(response.object)) {
                const paymentData = response.object;

                // Fetch all account details
                const accounts = await getAllAccount();

                // Map account info to each payment record
                const mergedData = paymentData.map(payment => {
                    const account = accounts.find(acc => acc.accountId === payment.accountId);
                    return {
                        ...payment,
                        accountName: account ? account.accountName : 'N/A',
                        accountEmail: account ? account.accountEmail : 'N/A',
                        address: account ? account.address : 'N/A',
                        phoneNumber: account ? account.phoneNumber : 'N/A',
                    };
                });

                setData(mergedData);
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
            title: 'Account Name', // Add account name column
            dataIndex: 'accountName',
            key: 'accountName',
        },
        {
            title: 'Email',
            dataIndex: 'accountEmail',
            key: 'accountEmail',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
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
