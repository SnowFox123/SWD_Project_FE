import React, { useEffect, useState } from 'react';
import { List, Card, Spin, Typography, Alert } from 'antd'; // Import Ant Design components
import { ListVoucherUser } from '../../services/UserServices'; // Import the function

const { Title } = Typography;

const VoucherUser = () => {
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                // Call the ListVoucherUser function
                const data = await ListVoucherUser();
                console.log(data.object);
                // Only set vouchers where isActive is true
                setVouchers(data.object.filter(voucher => voucher.isActive));
            } catch (error) {
                setError("Error fetching vouchers");
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVouchers();
    }, []);

    // Function to format the date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Format to 'YYYY-MM-DD HH:MM:SS'
        return date.toISOString().replace('T', ' ').substring(0, 19);
    };

    if (loading) {
        return <Spin size="large" tip="Loading vouchers..." />; // Ant Design loading spinner
    }

    if (error) {
        return <Alert message={error} type="error" showIcon />;
    }

    return (
        <div style={{ padding: '20px' }}>
            <Title style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} level={2}>User Vouchers</Title>
            {vouchers.length === 0 ? (
                <Alert message="No vouchers available." type="info" />
            ) : (
                <List
                    grid={{ gutter: 12, column: 4 }} // Set 4 columns
                    style={{ paddingLeft: '100px', paddingRight: '100px' }}
                    dataSource={vouchers}
                    renderItem={(voucher) => (
                        <List.Item> {/* Add horizontal padding */}
                            <Card title={`Code: ${voucher.voucherName}`}>
                                <p>Discount: {voucher.discount}%</p>
                                <p>Expiry Date: {formatDate(voucher.expiredDate)}</p> {/* Use the formatDate function here */}
                            </Card>
                        </List.Item>
                    )}
                />
            )}
        </div>
    );
};

export default VoucherUser;
