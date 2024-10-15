import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Pagination, Spin, message, Input, Button } from 'antd';
import { ViewToyRent, SearchToyRent, AddToCart, AddToCart2, ViewToySale, SearchToySale } from '../services/UserServices'; // Import your service functions
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import './card.css';  // Create and import a CSS file

const { Search } = Input;

const ToySale = () => {
    const [toys, setToys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addingToCart, setAddingToCart] = useState({}); // State for tracking add-to-cart loading for individual toys
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(10);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const [keyword, setKeyword] = useState(''); // State for search keyword

    useEffect(() => {
        const fetchToys = async () => {
            try {
                setLoading(true);
                let response;

                // Conditionally fetch toys based on keyword presence
                if (keyword.trim()) {
                    response = await SearchToySale(keyword, pageIndex, pageSize);
                } else {
                    response = await ViewToySale(pageIndex - 1, pageSize);
                }

                if (response) {
                    setToys(response); // Assuming response.toys contains the list of toys
                    setTotalItemsCount(response.totalItemsCount); // Assuming the total item count is provided
                } else {
                    setToys([]);
                }
            } catch (error) {
                message.error('Error fetching toy rental data.');
                console.error('Error fetching toy rental data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchToys();
    }, [pageIndex, pageSize, keyword]); // Reload toys when pageIndex, pageSize, or keyword changes

    const onPageChange = (page) => {
        setPageIndex(page);
    };

    const handleSearch = (value) => {
        if (value.trim()) {
            setKeyword(value);
            setPageIndex(1); // Reset to the first page on a new search
        } else {
            setKeyword(''); // Clear keyword if the input is empty
        }
    };

    const handleAddToCart = async (toyId, quantity = 1) => {
        if (quantity < 1 || quantity > 2147483647) {
            toast.error('Invalid quantity. Please enter a value between 1 and 2147483647.');
            return;  // Early return to avoid making a request with invalid quantity
        }
    
        try {
            // Set loading state only for the specific toy being added to the cart
            setAddingToCart((prevState) => ({ ...prevState, [toyId]: true }));
    
            console.log(`Adding toy ${toyId} to cart with quantity: ${quantity}`);  // Log the quantity
    
            const response = await AddToCart2(toyId, quantity);
    
            if (response) {
                toast.success('Item added to cart successfully!');
            } else {
                throw new Error('Failed to add item to cart.');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to add item to cart.');
            console.error('Add to cart error:', error);
        } finally {
            // Reset loading state for the specific toy
            setAddingToCart((prevState) => ({ ...prevState, [toyId]: false }));
        }
    };
    

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px', width: '400px' }}>
                <Search
                    placeholder="Search for toys"
                    enterButton="Search"
                    size="large"
                    className="custom-search"
                    onSearch={handleSearch}
                />
            </div>

            {loading ? (
                <Spin size="large" />
            ) : (
                <div>
                    <Row gutter={60}>
                        {toys && toys.length > 0 ? (
                            toys.map((toy) => (
                                <Col key={toy.toyId} span={6}>
                                    <Card
                                        className="toy-card"  // Reference the class for custom styling
                                        hoverable={true}
                                    >
                                        <Link to="/register" style={{ textDecoration: 'none' }}>
                                            <img
                                                className="toy-card__image"
                                                alt={toy.toyName}
                                                src={toy.imageUrl}
                                            />
                                            <h4 className="toy-card__name">{toy.toyName}</h4>
                                            <div className="toy-card__price">
                                                <span className="price-current">${toy.buyPrice}</span>
                                            </div>
                                            <p className="toy-card__description">{toy.description}</p>
                                        </Link>

                                        <Button
                                            type="primary"
                                            onClick={() => handleAddToCart(toy.toyId, 1)}
                                            className="add-to-cart-btn"
                                            loading={addingToCart[toy.toyId]} // Loading state for this specific toy
                                        >
                                            {addingToCart[toy.toyId] ? 'Adding...' : 'Add to Cart'}
                                        </Button>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <p>No toys found.</p>
                        )}
                    </Row>

                    <Pagination
                        current={pageIndex}
                        pageSize={pageSize}
                        total={totalItemsCount}
                        onChange={onPageChange}
                        style={{ textAlign: 'center', marginTop: '20px' }}
                    />
                </div>
            )}
        </div>
    );
};

export default ToySale;
