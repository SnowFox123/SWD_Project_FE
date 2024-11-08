import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Pagination, Spin, message, Input, Select, Typography, Image, Button, Modal, Form, InputNumber } from 'antd';
import { ViewToyRentSupplier, UpdateToySupplier, GetCategorySupplier, PutCategorySupplier } from '../../services/supplierService'; // Import both APIs
import { formatCurrency } from '../../utils/currency';

const { Search } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

const ViewToyRentBySupplier = () => {
    const [toys, setToys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(10);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false); // For modal visibility
    const [currentToy, setCurrentToy] = useState(null); // For storing selected toy

    const [categories, setCategories] = useState([]);

    // Fetch toys data
    const fetchToys = async () => {
        try {
            setLoading(true);
            const response = await ViewToyRentSupplier(keyword, sortOption, pageIndex - 1, pageSize);
            if (response) {
                setToys(response.items || response);
                setTotalItemsCount(response.totalItemsCount || response.length);
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

    useEffect(() => {
        fetchToys();
    }, [pageIndex, pageSize, keyword, sortOption]);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await GetCategorySupplier();
                setCategories(data.object || []);
            } catch (error) {
                message.error('Error fetching categories.');
            }
        };

        fetchCategories();
    }, []);

    // Handle page change
    const onPageChange = (page) => {
        setPageIndex(page);
    };

    // Handle search input change
    const handleSearch = (value) => {
        setKeyword(value.trim() ? value : '');
        setPageIndex(1);
    };

    // Handle sort change
    const handleSortChange = (value) => {
        setSortOption(value);
        setPageIndex(1);
    };

    // Open modal for updating a toy
    const handleUpdate = (toyId) => {
        const toy = toys.find((toy) => toy.toyId === toyId);
        if (toy) {
            setCurrentToy(toy); // Set the selected toy data
            setIsModalVisible(true); // Show the modal
        }
    };

    // Close the modal
    const handleModalCancel = () => {
        setIsModalVisible(false); // Close the modal
    };

    // Handle form submission for updating toy
    const handleFormSubmit = async (values) => {
        const updatedToy = {
            ...values,
            toyId: currentToy.toyId, // Use the toyId from the current selected toy
            buyPrice: values.buyPrice !== undefined ? values.buyPrice : 0, // Default buyPrice to 0 if not provided
            isActive: currentToy.isActive, // Keep the same active status (assuming you want to preserve this)
        };

        try {
            // Update the toy data
            await UpdateToySupplier(updatedToy.toyId, updatedToy);
            message.success('Toy updated successfully!');

            // If the category has changed, update the category
            if (updatedToy.categoryId !== currentToy.categoryId) {
                const category = categories.find(category => category.categoryId === updatedToy.categoryId);
                if (category) {
                    await PutCategorySupplier(updatedToy.categoryId, category.categoryName); // Pass categoryId and categoryName
                    message.success('Category updated successfully!');
                }
            }

            // Update the toy in the state without refetching all toys
            setToys(prevToys =>
                prevToys.map((toy) =>
                    toy.toyId === updatedToy.toyId ? { ...toy, ...updatedToy } : toy
                )
            );

            setIsModalVisible(false); // Close the modal after successful update
        } catch (error) {
            message.error('Error updating toy.');
            console.error('Error updating toy:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex' }}>
                <div style={{ marginBottom: '20px', width: '600px' }}>
                    <Search
                        placeholder="Search for toys"
                        enterButton="Search"
                        size="large"
                        className="custom-search"
                        onSearch={handleSearch}
                    />
                </div>

                <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
                    <Select
                        placeholder="Sort by"
                        onChange={handleSortChange}
                        style={{ width: 200 }}
                    >
                        <Option value="name_asc">Name Ascending</Option>
                        <Option value="name_desc">Name Descending</Option>
                        <Option value="dayprice_asc">Day Price Ascending</Option>
                        <Option value="dayprice_desc">Day Price Descending</Option>
                        <Option value="weekyprice_asc">Week Price Ascending</Option>
                        <Option value="weekprice_desc"> Week Price Descending</Option>
                        <Option value="twoweekprice_asc">Two Weeks Price Ascending</Option>
                        <Option value="twowekprice_desc">Two Weeks Price Descending</Option>
                    </Select>
                </div>
            </div>

            {loading ? (
                <Spin size="large" />
            ) : (
                <div>
                    <Row gutter={60}>
                        {toys && toys.length > 0 ? (
                            toys.map((toy) => (
                                <Col key={toy.toyId} span={6}>
                                    <Card className="toy-card" hoverable={true}>
                                        <Image
                                            className="toy-card__image"
                                            alt={toy.toyName}
                                            src={toy.imageUrl}
                                            style={{
                                                width: '100%',
                                                maxHeight: '200px',
                                                height: '200px',
                                                objectFit: 'contain',
                                                marginBottom: '10px',
                                            }}
                                        />

                                        <h4 className="toy-card__name">{toy.toyName}</h4>
                                        <div className="toy-card__price">
                                            <span className="price-current">{formatCurrency(toy.rentPricePerDay)}/Day</span>
                                        </div>
                                        <div className="toy-card__price">
                                            <span className="price-current">{formatCurrency(toy.rentPricePerWeek)}/Week</span>
                                        </div>
                                        <div className="toy-card__price">
                                            <span className="price-current">{formatCurrency(toy.rentPricePerTwoWeeks)}/TwoWeeks</span>
                                        </div>
                                        <p style={{ color: 'blue', fontSize: '15px', fontStyle: 'italic' }}>Category: {toy.categoryName}</p>
                                        <p style={{ color: '#444', fontSize: '16px' }}>Description: {toy.description}</p>
                                        <p>Stock: {toy.stock}</p>

                                        <Button
                                            type="primary"
                                            onClick={() => handleUpdate(toy.toyId)}
                                            style={{ marginTop: '10px', padding: '20px', fontSize: '20px' }}
                                        >
                                            Update
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

            {/* Modal for Updating Toy */}
            <Modal
                title="Update Toy"
                visible={isModalVisible}
                onCancel={handleModalCancel}
                footer={null}
            >
                <Form
                    initialValues={{
                        ...currentToy,
                        buyPrice: currentToy?.buyPrice || 0, // Default buyPrice to 0 if not set
                    }} // Ensure buyPrice defaults to 0 in the form
                    onFinish={handleFormSubmit}
                    layout="vertical"
                    key={currentToy ? currentToy.toyId : 'default'} // Key is used to re-render the form on toy change
                >
                    <Form.Item
                        label="Toy Name"
                        name="toyName"
                        rules={[{ required: true, message: 'Please input the toy name!' }]}

                    >
                        <Input />
                    </Form.Item>

                    {/* <Form.Item
                        label="Category"
                        name="categoryId"
                        rules={[{ required: true, message: 'Please select a category!' }]}

                    >
                        <Select placeholder="Select Category">
                            {categories.map((category) => (
                                <Option key={category.categoryId} value={category.categoryId}>
                                    {category.categoryName}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item> */}

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input the toy description!' }]}

                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        label="Rent Price Per Day"
                        name="rentPricePerDay"
                        rules={[{ required: true, message: 'Please input the rent price per day!' }]}

                    >
                        <InputNumber min={0} />
                    </Form.Item>

                    <Form.Item
                        label="Rent Price Per Week"
                        name="rentPricePerWeek"
                        rules={[{ required: true, message: 'Please input the rent price per week!' }]}

                    >
                        <InputNumber min={0} />
                    </Form.Item>

                    <Form.Item
                        label="Rent Price Per Two Weeks"
                        name="rentPricePerTwoWeeks"
                        rules={[{ required: true, message: 'Please input the rent price per two weeks!' }]}

                    >
                        <InputNumber min={0} />
                    </Form.Item>

                    <Form.Item
                        label="Stock"
                        name="stock"
                        rules={[{ required: true, message: 'Please input the stock!' }]}

                    >
                        <InputNumber min={0} />
                    </Form.Item>

                    <Form.Item
                        label="Image URL"
                        name="imageUrl"
                        rules={[{ required: true, message: 'Please input the image URL!' }]}

                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Update Toy
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ViewToyRentBySupplier;
