import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Button, message, Modal, Input, Form } from 'antd';
import { GetSaleOrderDetail, GetInfoShip } from '../../services/supplierService';
import { getToyByID, SupplierConfirmShip } from '../../services/supplierService';
import { formatCurrency } from '../../utils/currency';

const OrderSaleDetailSupplier = () => {
    const [saleOrderDetails, setSaleOrderDetails] = useState([]); // Renamed to saleOrderDetails
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [shippingInfo, setShippingInfo] = useState(null);
    const [currentOrderDetailId, setCurrentOrderDetailId] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchSaleOrderDetails = async () => { // Adjusted function name
            setLoading(true);
            try {
                const data = await GetSaleOrderDetail(); // Fetch sale orders
                if (data.isSuccess && Array.isArray(data.object)) {
                const saleOrdersWithToyDetails = await Promise.all(
                    data.object.map(async (order) => {
                        try {
                            const toyData = await getToyByID(order.toyId);
                            return {
                                ...order,
                                toyName: toyData.toyName,
                                imageUrl: toyData.imageUrl,
                                categoryName: toyData.categoryName,
                                stock: toyData.stock,
                                buyPrice: toyData.buyPrice // Relevant for sales
                            };
                        } catch (toyError) {
                            console.error(`Failed to fetch toy with ID ${order.toyId}`, toyError);
                            return { ...order, toyName: 'Unknown Toy' };
                        }
                    })
                );

                setSaleOrderDetails(saleOrdersWithToyDetails); // Updated state variable
            } else {
                throw new Error('Failed to load rent order details.');
            }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSaleOrderDetails(); // Fetch sale details on mount
    }, []);

    const handleConfirmShip = async (orderDetailId) => {
        try {
            setLoading(true);
            const info = await GetInfoShip(orderDetailId);
            setShippingInfo(info.object);
            setCurrentOrderDetailId(orderDetailId);
            setIsModalVisible(true);
        } catch (error) {
            message.error(`Failed to confirm shipping for order ${orderDetailId}: ${error.message}`);
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
            title: 'Buy Price', // Changed to Buy Price for sales context
            dataIndex: 'buyPrice',
            key: 'buyPrice',
            render: (price) => (
                <span style={{
                    fontWeight: 'bold',
                    color: '#d32f2f', // Dark red color for emphasis
                    fontSize: '1.1em', // Slightly larger font size
                }}>
                    {formatCurrency(price)}
                </span>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Button
                    type="primary"
                    onClick={() => handleConfirmShip(record.orderDetailId)}
                >
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
            <h1>Sale Order Details</h1>
            <Table
                columns={columns}
                dataSource={saleOrderDetails} // Renamed to saleOrderDetails
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

export default OrderSaleDetailSupplier;
