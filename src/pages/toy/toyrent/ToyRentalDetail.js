import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin, message, Card, Button, Row, Col, InputNumber, Typography, Space, Image, Modal, Input } from 'antd';
import { AddToCart2, UserGetToyByID } from '../../../services/UserServices';
import { toast } from 'react-toastify';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { UserReport } from '../../../services/UserServices'; // Import the UserReport function
import { formatCurrency } from '../../../utils/currency';

const { Title, Text } = Typography;

const DURATIONS = {
    DAY: 'day',
    WEEK: 'week',
    TWO_WEEKS: 'twoWeeks'
};

const ToyRentalDetail = () => {
    const AccountId = useSelector((state) => state.auth.AccountId);

    const { id } = useParams();
    const [toy, setToy] = useState(null);
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [rentalDuration, setRentalDuration] = useState(DURATIONS.DAY);
    const [reportModalVisible, setReportModalVisible] = useState(false); // To control the visibility of the report modal
    const [reportDetail, setReportDetail] = useState(''); // To store the report detail text
    const navigate = useNavigate();

    useEffect(() => {
        const fetchToyDetails = async () => {
            try {
                setLoading(true);
                const toyData = await UserGetToyByID(id);
                setToy(toyData);
            } catch (error) {
                message.error('Failed to load toy details.');
            } finally {
                setLoading(false);
            }
        };

        fetchToyDetails();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            const response = await AddToCart2(toy.toyId, quantity);
            if (response) {
                toast.success('Item added to cart successfully!');
            } else {
                throw new Error('Failed to add item to cart.');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to add item to cart.');
        }
    };

    const handleBuyNow = async () => {
        try {
            const response = await AddToCart2(toy.toyId, quantity);
            if (response) {
                toast.success('Item added to cart successfully!');
                navigate('/cartrental', {
                    state: {
                        selectedToyId: toy.toyId,
                    }
                });
            } else {
                throw new Error('Failed to add item to cart.');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to add item to cart.');
        }
    };

    const handleQuantityChange = (value) => {
        if (value <= toy.stock) {
            setQuantity(value);
        } else {
            toast.warning('Quantity exceeds available stock');
        }
    };

    const handleReport = async () => {
        if (!reportDetail) {
            toast.error('Please provide a report detail.');
            return;
        }

        try {
            const response = await UserReport(toy.toyId, AccountId, reportDetail);
            if (response) {
                toast.success('Report submitted successfully!');
                setReportModalVisible(false); // Close the report modal
            } else {
                throw new Error('Failed to submit the report.');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to submit the report.');
        }
    };

    const handleOpenReportModal = () => {
        setReportModalVisible(true);
    };

    const handleCancelReportModal = () => {
        setReportModalVisible(false);
    };

    if (loading) {
        return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }} />;
    }

    if (!toy) {
        return <p>No toy details available.</p>;
    }

    return (
        <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            <Row gutter={[24, 24]}>
                <Col span={12}>
                    <div
                        style={{
                            padding: '16px',
                            backgroundColor: '#f9f9f9',
                            borderRadius: '10px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            src={toy.imageUrl}
                            alt={toy.toyName}
                            style={{
                                width: '100%',
                                borderRadius: '10px',
                                objectFit: 'contain',
                                height: '450px',
                            }}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <Card
                        bordered={false}
                        style={{
                            background: '#fff',
                            borderRadius: '10px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            position: 'relative', // Important for absolute positioning of the button
                        }}
                    >
                        {/* Report Button */}
                        <Button
                            type="default"
                            onClick={handleOpenReportModal}
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                backgroundColor: '#f44336',
                                borderColor: '#f44336',
                                color: '#fff',
                                fontSize: '14px',
                                fontWeight: 'bold',
                            }}
                        >
                            Report
                        </Button>

                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            <Title style={{ color: '#e64545', marginBottom: '8px', fontSize: '28px' }}>{toy.toyName}</Title>
                            <Text style={{ color: '#666', fontSize: '16px', fontWeight: 'bold' }}>Supplier: {toy.supplierName}</Text>
                            <Text style={{ color: 'blue', fontSize: '15px', fontStyle: 'italic' }}>Category: {toy.categoryName}</Text>
                            <Text style={{ color: '#444', fontSize: '16px' }}>Description: {toy.description}</Text>

                            <Row gutter={16} style={{ marginTop: '16px' }}>
                                <Col style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Text style={{ fontSize: '16px', color: '#666' }}>Rent per day:</Text>
                                    <Text style={{ fontSize: '16px', color: '#666' }}>Rent per week:</Text>
                                    <Text style={{ fontSize: '16px', color: '#666' }}>Rent per two weeks:</Text>
                                </Col>
                                <Col style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#e64545' }}>{formatCurrency(toy.rentPricePerDay)}</span>
                                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#e64545' }}>{formatCurrency(toy.rentPricePerWeek)}</span>
                                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#e64545' }}>{formatCurrency(toy.rentPricePerTwoWeeks)}</span>
                                </Col>
                            </Row>

                            <div>
                                <Text style={{ marginRight: '8px', fontSize: '16px' }}>Quantity:</Text>
                                <InputNumber
                                    min={1}
                                    max={toy.stock}
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    style={{ width: '100px' }}
                                />
                                <Text
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        color: '#333',
                                        marginLeft: '10px',
                                    }}
                                >
                                    {toy.stock} available
                                </Text>
                            </div>

                            <Row gutter={16} style={{ marginTop: '16px' }}>
                                <Col span={12}>
                                    <Button
                                        type="primary"
                                        onClick={handleAddToCart}
                                        disabled={quantity > toy.stock || quantity < 1 || toy.stock === 0}
                                        style={{
                                            backgroundColor: '#e64545',
                                            borderColor: '#e64545',
                                            color: '#fff',
                                            width: '100%',
                                            height: '48px',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            borderRadius: '6px',
                                        }}
                                    >
                                        <ShoppingCartOutlined style={{ fontSize: '20px' }} /> Add to Cart
                                    </Button>
                                </Col>
                                <Col span={12}>
                                    <Button
                                        type="primary"
                                        onClick={handleBuyNow}
                                        disabled={quantity > toy.stock || quantity < 1 || toy.stock === 0}
                                        style={{
                                            backgroundColor: '#ff9800',
                                            borderColor: '#ff9800',
                                            color: '#fff',
                                            width: '100%',
                                            height: '48px',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            borderRadius: '6px',
                                        }}
                                    >
                                        Buy Now
                                    </Button>
                                </Col>
                            </Row>
                        </Space>
                    </Card>
                </Col>
            </Row>

            {/* Report Modal */}
            <Modal
                title="Report Toy"
                visible={reportModalVisible}
                onCancel={handleCancelReportModal}
                onOk={handleReport}
                okText="Submit Report"
                cancelText="Cancel"
            >
                <Input.TextArea
                    rows={4}
                    value={reportDetail}
                    onChange={(e) => setReportDetail(e.target.value)}
                    placeholder="Please provide a reason for the report..."
                />
            </Modal>
        </div>
    );
};

export default ToyRentalDetail;
