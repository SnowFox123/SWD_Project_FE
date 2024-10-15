import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin, message, Card, Button, Row, Col, InputNumber, Typography, Space, Image, Radio } from 'antd';
import { AddToCart2, UserGetToyByID } from '../services/UserServices';
import { toast } from 'react-toastify';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const ToyRentalDetail = () => {
    const { id } = useParams();
    const [toy, setToy] = useState(null);
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [rentalDuration, setRentalDuration] = useState('day');
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchToyDetails = async () => {
            try {
                setLoading(true);
                const toyData = await UserGetToyByID(id);
                setToy(toyData);
            } catch (error) {
                message.error('Failed to load toy details.');
                console.error('Error fetching toy details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchToyDetails();
    }, [id]);

    // Update total price based on rental duration and quantity
    useEffect(() => {
        if (toy) {
            let pricePerUnit;
            switch (rentalDuration) {
                case 'week':
                    pricePerUnit = toy.rentPricePerWeek;
                    break;
                case 'twoWeeks':
                    pricePerUnit = toy.rentPricePerTwoWeeks;
                    break;
                default:
                    pricePerUnit = toy.rentPricePerDay;
            }
            setTotalPrice(pricePerUnit * quantity);
        }
    }, [rentalDuration, quantity, toy]);

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
                // Chỉ cần truyền ID và số lượng sản phẩm đã chọn vào trạng thái
                navigate('/cartrental', { state: { selectedToyId: toy.toyId, quantity: quantity } });
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

    const handleDurationChange = (e) => {
        setRentalDuration(e.target.value);
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
                    <div style={{
                        padding: '16px',
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex'
                    }}>
                        <Image
                            src={toy.imageUrl}
                            alt={toy.toyName}
                            style={{
                                width: '100%',
                                borderRadius: '8px',
                                objectFit: 'contain',
                                height: '400px'
                            }}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <Card
                        bordered={false}
                        style={{
                            background: '#fff',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            <Title level={6} style={{ color: '#222', marginBottom: '8px' }}>{toy.toyName}</Title>
                            <Paragraph
                                type="secondary"
                                style={{ fontSize: '18px', lineHeight: '1.6', color: '#555' }}
                            >
                                {toy.description}
                            </Paragraph>

                            <Row>
                                <Col style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Text style={{ fontSize: '18px', fontWeight: '400', color: '#757575' }}>
                                        Rent per day:
                                    </Text>
                                    <Text style={{ fontSize: '20px', fontWeight: '400', color: '#757575' }}>
                                        Rent per week:
                                    </Text>
                                    <Text style={{ fontSize: '22px', fontWeight: '400', color: '#757575' }}>
                                        Rent per two weeks:
                                    </Text>
                                </Col>
                                <Col style={{ display: 'flex', flexDirection: 'column', marginLeft: '5px' }}>
                                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#ee4d2d' }}>${toy.rentPricePerDay}</span>
                                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ee4d2d' }}>${toy.rentPricePerWeek}</span>
                                    <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#ee4d2d' }}>${toy.rentPricePerTwoWeeks}</span>
                                </Col>
                            </Row>

                            <div>
                                <Text style={{ marginRight: '8px', fontSize: '16px' }}>Rental Duration:</Text>
                                <Radio.Group onChange={handleDurationChange} value={rentalDuration}>
                                    <Radio value="day">Per Day</Radio>
                                    <Radio value="week">Per Week</Radio>
                                    <Radio value="twoWeeks">Per Two Weeks</Radio>
                                </Radio.Group>
                            </div>

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
                                        color: '#222',
                                        marginLeft: '10px'
                                    }}
                                >
                                    {toy.stock} available
                                </Text>
                            </div>

                            <Text style={{ fontSize: '18px', fontWeight: 'bold', color: '#222' }}>
                                Price: <span style={{ color: 'red' }}>${totalPrice}</span>
                            </Text>

                            <Row gutter={16} style={{ marginTop: '16px' }}>
                                <Col span={12}>
                                    <Button
                                        type="primary"
                                        onClick={handleAddToCart}
                                        disabled={quantity > toy.stock || quantity < 1}
                                        style={{
                                            backgroundColor: '#ee4d2d',
                                            borderColor: '#ee4d2d',
                                            color: '#fff',
                                            width: '100%',
                                            height: '48px',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            borderRadius: '4px'
                                        }}
                                    >
                                        <ShoppingCartOutlined style={{ fontSize: '20px' }} /> Add to Cart
                                    </Button>
                                </Col>
                                <Col span={12}>
                                    <Button
                                        type="primary"
                                        onClick={handleBuyNow}
                                        disabled={quantity > toy.stock || quantity < 1}
                                        style={{
                                            backgroundColor: '#ff9900',
                                            borderColor: '#ff9900',
                                            color: '#fff',
                                            width: '100%',
                                            height: '48px',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            borderRadius: '4px'
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
        </div>
    );
};

export default ToyRentalDetail;
