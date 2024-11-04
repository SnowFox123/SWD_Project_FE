import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert } from 'antd';
import { GetRentOrderDetail } from '../../services/supplierService';
import { getToyByID } from '../../services/supplierService';

const OrderRentDetailSupplier = () => {
    const [rentOrderDetails, setRentOrderDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRentOrderDetails = async () => {
            setLoading(true);
            try {
                const data = await GetRentOrderDetail();

                const rentOrdersWithToyDetails = await Promise.all(
                    data.map(async (order) => {
                        try {
                            const toyData = await getToyByID(order.toyId);
                            return {
                                ...order,
                                toyName: toyData.toyName,
                                imageUrl: toyData.imageUrl,
                                categoryName: toyData.categoryName,
                                rentPricePerDay: toyData.rentPricePerDay,
                                stock: toyData.stock,
                            };
                        } catch (toyError) {
                            console.error(`Failed to fetch toy with ID ${order.toyId}`, toyError);
                            return { ...order, toyName: 'Unknown Toy' };
                        }
                    })
                );

                setRentOrderDetails(rentOrdersWithToyDetails);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRentOrderDetails();
    }, []);

    // Define the columns for the table
    const columns = [
        {
            title: 'Order Detail ID',
            dataIndex: 'orderDetailId',
            key: 'orderDetailId',
        },
        {
            title: 'Toy Name',
            dataIndex: 'toyName',
            key: 'toyName',
        },
        {
            title: 'Toy Image',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (url) => <img src={url} alt="Toy" style={{ width: 50, height: 50 }} />,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Category',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: 'Rental Date',
            dataIndex: 'rentalDate',
            key: 'rentalDate',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Return Date',
            dataIndex: 'returnDate',
            key: 'returnDate',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Rental Price',
            dataIndex: 'rentalPrice',
            key: 'rentalPrice',
            render: (price) => (
                <span style={{
                    fontWeight: 'bold',
                    color: '#d32f2f', // Dark red color for emphasis
                    fontSize: '1.1em', // Slightly larger font size
                }}>
                    {price.toLocaleString('vi-VN')} ₫
                </span>
            ),
        },
    ];

    if (loading) {
        return <Spin tip="Loading..." />;
    }

    if (error) {
        return <Alert message="Error" description={error.message} type="error" showIcon />;
    }

    return (
        <div>
            <h1>Rent Order Details</h1>
            <Table
                columns={columns}
                dataSource={rentOrderDetails}
                rowKey="orderDetailId"
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
};

export default OrderRentDetailSupplier;
