import React, { useEffect, useState } from 'react';
import {
    Table,
    Pagination,
    Spin,
    message,
    Input,
    Select,
    Typography,
    Image,
    Button,
    Modal,
    Form,
    InputNumber
} from 'antd';
import {
    ViewToyRentSupplier,
    UpdateToySupplier,
    GetCategorySupplier,
    DeleteToySupplier // Import Delete API
} from '../../services/supplierService';
import { formatCurrency } from '../../utils/currency';

const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;

const ViewToyRentBySupplier = () => {
    const [toys, setToys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(10);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentToy, setCurrentToy] = useState(null);
    const [categories, setCategories] = useState([]);

    // Fetch toys data
    // const fetchToys = async () => {
    //     try {
    //         setLoading(true);
    //         const response = await ViewToyRentSupplier(keyword, sortOption, pageIndex - 1, pageSize);
    //         if (response) {
    //             // Filter out toys where isDelete is true
    //             const filteredToys = (response.items || response).filter(toy => !toy.isDelete);
    //             setToys(filteredToys);
    //             setTotalItemsCount(response.totalItemsCount || filteredToys.length);
    //         } else {
    //             setToys([]);
    //             setTotalItemsCount(0);
    //         }
    //     } catch (error) {
    //         message.error('Error fetching toy rental data.');
    //         console.error('Error fetching toy rental data:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const fetchToys = async () => {
        try {
            setLoading(true);
            const response = await ViewToyRentSupplier(keyword, sortOption, pageIndex - 1, pageSize);
            if (response) {
                // Remove the filter to include all toys, even those with isDelete set to true
                const allToys = response.items || response;
                setToys(allToys);
                setTotalItemsCount(response.totalItemsCount || allToys.length);
            } else {
                setToys([]);
                setTotalItemsCount(0);
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
                console.error('Error fetching categories:', error);
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
            setCurrentToy(toy);
            setIsModalVisible(true);
        }
    };

    // Close the modal
    const handleModalCancel = () => {
        setIsModalVisible(false);
        setCurrentToy(null);
    };

    // Handle form submission for updating toy
    const handleFormSubmit = async (values) => {
        if (!currentToy) {
            message.error('No toy selected for updating.');
            return;
        }

        const updatedToy = {
            ...values,
            toyId: currentToy.toyId,
            toyName: currentToy.toyName,
            imageUrl: currentToy.imageUrl,
            isActive: currentToy.isActive,
            categoryId: currentToy.categoryId,
            buyPrice: currentToy.buyPrice || 0,
        };

        try {
            await UpdateToySupplier(updatedToy.toyId, updatedToy);
            message.success('Toy updated successfully!');

            setToys(prevToys =>
                prevToys.map((toy) =>
                    toy.toyId === updatedToy.toyId ? { ...toy, ...updatedToy } : toy
                )
            );

            setIsModalVisible(false);
            setCurrentToy(null);
        } catch (error) {
            message.error('Error updating toy.');
            console.error('Error updating toy:', error);
        }
    };

    // Handle delete toy
    // Handle delete or undelete toy
    const handleDelete = async (toyId, flag) => {
        try {
            await DeleteToySupplier(toyId, flag);
            message.success(flag ? 'Toy deleted successfully!' : 'Toy restored successfully!');

            // Update the toys list by re-fetching or manually updating the list
            setToys(prevToys =>
                prevToys.map(toy =>
                    toy.toyId === toyId ? { ...toy, isDelete: Boolean(flag) } : toy
                )
            );
        } catch (error) {
            message.error(flag ? 'Error deleting toy.' : 'Error restoring toy.');
            console.error(flag ? 'Error deleting toy:' : 'Error restoring toy:', error);
        }
    };


    // Table columns definition
    const columns = [
        {
            title: 'Image',
            dataIndex: 'imageUrl',
            render: (url) => (
                <Image
                    src={url}
                    alt="Toy"
                    width={150}
                    height={150}
                    style={{ objectFit: 'contain' }}
                />
            ),
        },
        {
            title: 'Toy Name',
            dataIndex: 'toyName',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Day Price',
            dataIndex: 'rentPricePerDay',
            render: (price) => formatCurrency(price),
        },
        {
            title: 'Week Price',
            dataIndex: 'rentPricePerWeek',
            render: (price) => formatCurrency(price),
        },
        {
            title: 'Two Weeks Price',
            dataIndex: 'rentPricePerTwoWeeks',
            render: (price) => formatCurrency(price),
        },
        {
            title: 'Category',
            dataIndex: 'categoryName',
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <>
                    <Button
                        type="primary"
                        onClick={() => handleUpdate(record.toyId)}
                        style={{ marginRight: 8 }}
                    >
                        Update
                    </Button>
                    {record.isDelete ? (
                        <Button
                            type="primary"
                            onClick={() => handleDelete(record.toyId, 0)} // Undelete action
                        >
                            Undelete
                        </Button>
                    ) : (
                        <Button
                            type="primary"
                            danger
                            onClick={() => handleDelete(record.toyId, 1)} // Delete action
                        >
                            Delete
                        </Button>
                    )}
                </>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <Search
                    placeholder="Search for toys"
                    enterButton="Search"
                    size="large"
                    onSearch={handleSearch}
                    allowClear
                />
                <Select
                    placeholder="Sort by"
                    onChange={handleSortChange}
                    style={{ width: 200 }}
                    allowClear
                >
                    <Option value="name_asc">Name Ascending</Option>
                    <Option value="name_desc">Name Descending</Option>
                    {/* <Option value="dayprice_asc">Day Price Ascending</Option>
                    <Option value="dayprice_desc">Day Price Descending</Option>
                    <Option value="weekyprice_asc">Week Price Ascending</Option>
                    <Option value="weekprice_desc">Week Price Descending</Option>
                    <Option value="twoweekprice_asc">Two Weeks Price Ascending</Option>
                    <Option value="twowekprice_desc">Two Weeks Price Descending</Option> */}
                </Select>
            </div>

            {loading ? (
                <Spin size="large" style={{ display: 'block', marginTop: '50px', textAlign: 'center' }} />
            ) : (
                <>
                    <Table
                        columns={columns}
                        dataSource={toys}
                        rowKey="toyId"
                        pagination={false}
                        bordered
                    />
                    <Pagination
                        current={pageIndex}
                        pageSize={pageSize}
                        total={totalItemsCount}
                        onChange={onPageChange}
                        style={{ marginTop: '20px', textAlign: 'center' }}
                        showSizeChanger={false}
                    />
                </>
            )}

            {/* Modal for Updating Toy */}
            <Modal
                title="Update Toy"
                visible={isModalVisible}
                onCancel={handleModalCancel}
                footer={null}
                destroyOnClose
            >
                {currentToy && (
                    <Form
                        initialValues={{
                            description: currentToy.description,
                            rentPricePerDay: currentToy.rentPricePerDay,
                            rentPricePerWeek: currentToy.rentPricePerWeek,
                            rentPricePerTwoWeeks: currentToy.rentPricePerTwoWeeks,
                            stock: currentToy.stock,
                            buyPrice: currentToy.buyPrice || 0, // Default buyPrice to 0 if not set
                            categoryId: currentToy.categoryId, // Pre-select current category
                        }}
                        onFinish={handleFormSubmit}
                        layout="vertical"
                        key={currentToy.toyId} // Key is used to re-render the form on toy change
                    >

                        {/* Description */}
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input the toy description!' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>

                        {/* Rent Price Per Day */}
                        <Form.Item
                            label="Rent Price Per Day"
                            name="rentPricePerDay"
                            rules={[{ required: true, message: 'Please input the rent price per day!' }]}
                        >
                            <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>

                        {/* Rent Price Per Week */}
                        <Form.Item
                            label="Rent Price Per Week"
                            name="rentPricePerWeek"
                            rules={[{ required: true, message: 'Please input the rent price per week!' }]}
                        >
                            <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>

                        {/* Rent Price Per Two Weeks */}
                        <Form.Item
                            label="Rent Price Per Two Weeks"
                            name="rentPricePerTwoWeeks"
                            rules={[{ required: true, message: 'Please input the rent price per two weeks!' }]}
                        >
                            <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>

                        {/* Stock */}
                        <Form.Item
                            label="Stock"
                            name="stock"
                            rules={[{ required: true, message: 'Please input the stock!' }]}
                        >
                            <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>

                        {/* Submit Button */}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Update Toy
                            </Button>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </div>
    );
};

export default ViewToyRentBySupplier;
