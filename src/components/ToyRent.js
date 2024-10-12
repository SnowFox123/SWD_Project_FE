import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Pagination, Spin, message, Input, Button } from 'antd';
import { ViewToyRent, SearchToyRent } from '../services/UserServices'; // Import your service functions
import { Link } from 'react-router-dom';
import './card.css';  // Create and import a CSS file

const { Search } = Input;

const ToyRent = () => {
    const [toys, setToys] = useState([]);
    const [loading, setLoading] = useState(false);
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
                    response = await SearchToyRent(keyword, pageIndex , pageSize);
                } else {
                    response = await ViewToyRent(pageIndex - 1, pageSize);
                }

                if (response) {
                    setToys(response);
                    setTotalItemsCount(response.totalItemsCount);
                } else {
                    setToys([]);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                message.error('Error fetching toy rental data.');
                console.error('Error fetching toy rental data:', error);
            }
        };

        fetchToys();
    }, [pageIndex, pageSize, keyword]); // Reload toys when pageIndex, pageSize, or keyword changes

    const onPageChange = (page) => {
        setPageIndex(page);
    };

    const handleSearch = (value) => {
        setKeyword(value);
        setPageIndex(1); // Reset to the first page on a new search
    };

    return (
        <div style={{ padding: '20px' }}>
            {/* <h1>View Toy Rentals</h1> */}

            {/* Search input */}
            <div style={{ marginBottom: '20px', width:'400px' }}>
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
                                                <span className="price-current">${toy.rentPricePerDay}</span>
                                            </div>
                                            <p className="toy-card__description">{toy.description}</p>
                                        </Link>

                                        <div className="toy-card__actions">
                                            <Link to="/login" className="add-to-cart-btn">Add to Cart</Link>
                                        </div>
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

export default ToyRent;
