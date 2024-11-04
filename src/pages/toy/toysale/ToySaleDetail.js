import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin, message, Card, Button, Row, Col, InputNumber, Typography, Space, Image, Radio } from 'antd';
import { AddToCart2, UserGetToyByID } from '../../../services/UserServices';
import { toast } from 'react-toastify';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

// Constants for rental durations
const DURATIONS = {
    DAY: 'day',
    WEEK: 'week',
    TWO_WEEKS: 'twoWeeks'
};

const ToySaleDetail = () => {
    const { id } = useParams();
    const [toy, setToy] = useState(null);
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [rentalDuration, setRentalDuration] = useState(DURATIONS.DAY);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    // Fetch toy details by ID
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
    // useEffect(() => {
    //     if (toy) {
    //         let pricePerUnit;
    //         switch (rentalDuration) {
    //             case DURATIONS.WEEK:
    //                 pricePerUnit = toy.rentPricePerWeek;
    //                 break;
    //             case DURATIONS.TWO_WEEKS:
    //                 pricePerUnit = toy.rentPricePerTwoWeeks;
    //                 break;
    //             default:
    //                 pricePerUnit = toy.rentPricePerDay;
    //         }
    //         setTotalPrice(pricePerUnit * quantity);
    //         // console.log('rentalDuration', rentalDuration)

    //     }
    // }, [rentalDuration, quantity, toy]);

    // Handle adding to cart
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

    // Handle buy now functionality
    const handleBuyNow = async () => {
        try {
            const response = await AddToCart2(toy.toyId, quantity);
            if (response) {
                toast.success('Item added to cart successfully!');
                // console.log('rentalDuration2', rentalDuration)


                // Navigate to the CartRent page, passing the toy details, quantity, and rental duration
                navigate('/cartsale', {
                    state: {
                        selectedToyId: toy.toyId,
                        // quantity: quantity,
                        // rentalDuration: rentalDuration
                    }
                });
            } else {
                throw new Error('Failed to add item to cart.');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to add item to cart.');
        }
    };

    // Handle quantity change, preventing overflow based on stock
    const handleQuantityChange = (value) => {
        if (value <= toy.stock) {
            setQuantity(value);
        } else {
            toast.warning('Quantity exceeds available stock');
        }
    };

    // Handle rental duration change
    const handleDurationChange = (e) => {
        setRentalDuration(e.target.value);
        console.log(e.target.value)

    };

    if (loading) {
        return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }} />;
    }

    if (!toy) {
        return (
            <p>No toy details available.</p>
        );
    }

    return (
        <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            <Row gutter={[24, 24]}>
                <Col span={12}>
                    <div
                        style={{
                            padding: '16px',
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
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
                            <Title style={{ color: '#222', marginBottom: '8px', fontSize: '26px' }}>{toy.toyName}</Title>
                            <span
                                style={{ fontSize: '18px', color: '#555' }}
                            >
                                {toy.description}
                            </span>

                            <Row>
                                <Col style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Text style={{ fontSize: '18px', fontWeight: '400', color: '#757575' }}>
                                        Buy Price
                                    </Text>
                                </Col>
                                <Col style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#ee4d2d' }}>${toy.buyPrice}</span>
                                </Col>
                            </Row>

                            {/* <div>
                                <Text style={{ marginRight: '8px', fontSize: '16px' }}>Rental Duration:</Text>
                                <Radio.Group onChange={handleDurationChange} value={rentalDuration}>
                                    <Radio value={DURATIONS.DAY}>Per Day</Radio>
                                    <Radio value={DURATIONS.WEEK}>Per Week</Radio>
                                    <Radio value={DURATIONS.TWO_WEEKS}>Per Two Weeks</Radio>
                                </Radio.Group>
                            </div> */}

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

                            {/* <Text style={{ fontSize: '18px', fontWeight: 'bold', color: '#222' }}>
                                Price: <span style={{ color: 'red' }}>${totalPrice}</span>
                            </Text> */}

                            <Row gutter={16} style={{ marginTop: '16px' }}>
                                <Col span={12}>
                                    <Button
                                        type="primary"
                                        onClick={handleAddToCart}
                                        disabled={quantity > toy.stock || quantity < 1 || toy.stock === 0}
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
                                        disabled={quantity > toy.stock || quantity < 1 || toy.stock === 0}
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

export default ToySaleDetail;
