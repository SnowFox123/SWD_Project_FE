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
    DeleteToySupplier,
    ViewToySaleSupplier
} from '../../services/supplierService';
import { formatCurrency } from '../../utils/currency';

const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;

const ViewToySaleBySupplier = () => {
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
    const [form] = Form.useForm(); // Form instance to control values

    // Fetch toys data
    // const fetchToys = async () => {
    //     try {
    //         setLoading(true);
    //         const response = await ViewToySaleSupplier(keyword, sortOption, pageIndex - 1, pageSize);
    //         if (response) {
    //             const filteredToys = (response.items || response).filter(toy => !toy.isDelete);
    //             setToys(filteredToys);
    //             setTotalItemsCount(response.totalItemsCount || filteredToys.length);
    //         } else {
    //             setToys([]);
    //             setTotalItemsCount(0);
    //         }
    //     } catch (error) {
    //         message.error('Error fetching toy data.');
    //         console.error('Error fetching toy data:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const fetchToys = async () => {
        try {
            setLoading(true);
            const response = await ViewToySaleSupplier(keyword, sortOption, pageIndex - 1, pageSize);
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

    const onPageChange = (page) => {
        setPageIndex(page);
    };

    const handleSearch = (value) => {
        setKeyword(value.trim() ? value : '');
        setPageIndex(1);
    };

    const handleSortChange = (value) => {
        setSortOption(value);
        setPageIndex(1);
    };

    const handleUpdate = (toyId) => {
        const toy = toys.find((toy) => toy.toyId === toyId);
        if (toy) {
            setCurrentToy(toy);
            form.setFieldsValue({
                description: toy.description,
                buyPrice: toy.buyPrice || 0,
                stock: toy.stock,
                categoryId: toy.categoryId,
            });
            setIsModalVisible(true);
        }
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setCurrentToy(null);
    };

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
            buyPrice: values.buyPrice,
        };

        try {
            await UpdateToySupplier(updatedToy.toyId, updatedToy);
            message.success('Toy updated successfully!');

            setToys((prevToys) =>
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
        { title: 'Toy Name', dataIndex: 'toyName' },
        { title: 'Description', dataIndex: 'description' },
        {
            title: 'Buy Price',
            dataIndex: 'buyPrice',
            render: (price) => formatCurrency(price),
        },
        { title: 'Category', dataIndex: 'categoryName' },
        { title: 'Stock', dataIndex: 'stock' },
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

            <Modal
                title="Update Toy"
                visible={isModalVisible}
                onCancel={handleModalCancel}
                footer={null}
                destroyOnClose
            >
                {currentToy && (
                    <Form
                        form={form}
                        onFinish={handleFormSubmit}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input the toy description!' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item
                            label="Buy Price"
                            name="buyPrice"
                            rules={[{ required: true, message: 'Please input the buy price!' }]}
                        >
                            <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item
                            label="Stock"
                            name="stock"
                            rules={[{ required: true, message: 'Please input the stock!' }]}
                        >
                            <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>

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

export default ViewToySaleBySupplier;
