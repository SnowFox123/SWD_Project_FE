import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Button, message, Modal, Input, Form } from 'antd';
import { GetRentOrderDetail, getToyByID, SupplierConfirmShip, GetInfoShip } from '../../services/supplierService';
import { formatCurrency } from '../../utils/currency';

const OrderRentDetailSupplier = () => {
    const [rentOrderDetails, setRentOrderDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [shippingInfo, setShippingInfo] = useState(null);
    const [currentOrderDetailId, setCurrentOrderDetailId] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchRentOrderDetails = async () => {
            setLoading(true);
            try {
                const data = await GetRentOrderDetail();

                if (data.isSuccess && Array.isArray(data.object)) {
                    const rentOrdersWithToyDetails = await Promise.all(
                        data.object.map(async (order) => {
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
                } else {
                    throw new Error('Failed to load rent order details.');
                }
            } catch (err) {
                console.error("Failed to fetch rent order details:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRentOrderDetails();
    }, []);

    const handleConfirmShip = async (orderDetailId) => {
        try {
            setLoading(true);
            const info = await GetInfoShip(orderDetailId);
            setShippingInfo(info.object);
            setCurrentOrderDetailId(orderDetailId);
            setIsModalVisible(true);
        } catch (error) {
            message.error(`Failed to fetch shipping info for order ${orderDetailId}: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            await SupplierConfirmShip({
                orderDetailId: currentOrderDetailId,
                shipper: values.shipper,
                shipperPhone: values.shipperPhone,
            });
            message.success(`Order ${currentOrderDetailId} has been confirmed for shipping!`);
            setIsModalVisible(false);
            form.resetFields();
            setShippingInfo(null);
            setCurrentOrderDetailId(null);
        } catch (error) {
            message.error(`Failed to confirm shipping: ${error.message}`);
        }
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setShippingInfo(null);
        setCurrentOrderDetailId(null);
    };

    const columns = [
        { title: 'Order Detail ID', dataIndex: 'orderDetailId', key: 'orderDetailId' },
        { title: 'Toy Name', dataIndex: 'toyName', key: 'toyName' },
        { 
            title: 'Toy Image', 
            dataIndex: 'imageUrl', 
            key: 'imageUrl',
            render: (url) => <img src={url} alt="Toy" style={{ width: 50, height: 50 }} />,
        },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Stock', dataIndex: 'stock', key: 'stock' },
        { title: 'Category', dataIndex: 'categoryName', key: 'categoryName' },
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
                <span style={{ fontWeight: 'bold', color: '#d32f2f', fontSize: '1.1em' }}>
                    {formatCurrency(price)}
                </span>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Button type="primary" onClick={() => handleConfirmShip(record.orderDetailId)}>
                    Confirm Ship
                </Button>
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
            <Modal
                title="Shipping Information"
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                {shippingInfo ? (
                    <div>
                        <p><strong>Account Name:</strong> {shippingInfo.accountName}</p>
                        <p><strong>Shipping Address:</strong> {shippingInfo.shippingAddress}</p>
                        <p><strong>Phone Number:</strong> {shippingInfo.receivePhoneNumber}</p>
                        <Form form={form} layout="vertical">
                            <Form.Item
                                name="shipper"
                                label="Shipper Name"
                                rules={[{ required: true, message: 'Please enter the shipper name' }]}
                            >
                                <Input placeholder="Enter shipper name" />
                            </Form.Item>
                            <Form.Item
                                name="shipperPhone"
                                label="Shipper Phone"
                                rules={[{ required: true, message: 'Please enter the shipper phone number' }]}
                            >
                                <Input placeholder="Enter shipper phone number" />
                            </Form.Item>
                        </Form>
                    </div>
                ) : (
                    <Spin tip="Loading shipping information..." />
                )}
            </Modal>
        </div>
    );
};

export default OrderRentDetailSupplier;
