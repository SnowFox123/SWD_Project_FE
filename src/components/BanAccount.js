import React, { useEffect, useState } from 'react';
import { Table, Button, notification } from 'antd';
import { banAccount, getAllAccount } from '../services/staffService'; // Import the API function for banning account
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const BanAccount = () => {
    const [accounts, setAccounts] = useState([]); // State to store account list
    const [loading, setLoading] = useState(false);
    const [banLoading, setBanLoading] = useState({}); // Loading state for ban button (per account)

    // Fetch all accounts on component mount
    useEffect(() => {
        const fetchAccounts = async () => {
            setLoading(true); // Set loading while fetching data
            try {
                const accountList = await getAllAccount();
                setAccounts(accountList); // Update the state with fetched accounts
            } catch (err) {
                if (err.response && err.response.data && err.response.data.error) {
                    toast.error(err.response.data.error.message);
                  } else {
                    toast.error("An unexpected error occurred during login.");
                  }
            } finally {
                setLoading(false); // Stop loading once data is fetched
            }
        };

        fetchAccounts();
    }, []);

    // Handler for banning an account
    const handleBanAccount = async (accountId) => {
        setBanLoading(prev => ({ ...prev, [accountId]: true })); // Show loading for the specific account

        try {
            const responseMessage = await banAccount(accountId); // Ban the selected account

            // Show success notification
            notification.success({
                message: 'Account Banned',
                description: responseMessage || 'The account has been banned successfully.',
            });

            // Optionally, refresh the account list after banning
            const updatedAccounts = accounts.map(account =>
                account.accountId === accountId ? { ...account, isBan: true } : account
            );
            setAccounts(updatedAccounts);
        } catch (error) {
            notification.error({
                message: 'Error',
                description: error.message || 'Failed to ban the account.',
            });
        } finally {
            setBanLoading(prev => ({ ...prev, [accountId]: false })); // Stop loading for the specific account
        }
    };

    // Define table columns for account display
    const columns = [
        {
            title: 'Account ID',
            dataIndex: 'accountId',
            key: 'accountId',
        },
        {
            title: 'Account Name',
            dataIndex: 'accountName',
            key: 'accountName',
        },
        {
            title: 'Account Email',
            dataIndex: 'accountEmail',
            key: 'accountEmail',
        },
        {
            title: 'Role',
            dataIndex: 'roleId',
            key: 'roleId',
            render: (roleId) => {
                // let roleId;

                switch (roleId) {
                    case 1:
                        roleId = 'User';
                        break;
                    case 2:
                        roleId = 'Supplier';
                        break;
                    case 3:
                        roleId = 'Staff';
                        break;
                    case 4:
                        roleId = 'Admin';
                        break;
                    default:
                        roleId = 'Có lỗi rồi';
                        break;
                }

                return (
                    <span>
                        {roleId}
                    </span>
                );
            }
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
            title: 'Status',
            dataIndex: 'isBan',
            key: 'isBan',
            render: (isBan) => (
                <span>
                    {isBan ? (
                        <CheckOutlined style={{ color: 'green', marginRight: 5 }} />
                    ) : (
                        <CloseOutlined style={{ color: 'red', marginRight: 5 }} />
                    )}
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button
                    type="primary"
                    danger
                    loading={banLoading[record.accountId]} // Show loading for specific account
                    onClick={() => handleBanAccount(record.accountId)} // Pass account ID to handler
                    disabled={record.isBan} // Disable if already banned
                >
                    {record.isBan ? 'Banned' : 'Ban'}
                </Button>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h2>Ban Account</h2>

            <Table
                columns={columns}
                dataSource={accounts}
                rowKey="accountId"
                loading={loading} // Show loading while fetching accounts
                pagination={{ pageSize: 10 }} // Optional: Paginate the account list
            />
        </div>
    );
};

export default BanAccount;
