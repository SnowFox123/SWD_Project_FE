import React, { useEffect, useState } from 'react';
import { Table, Pagination, Spin, message, Input, Button, Select } from 'antd';
import { AddToCart2, ViewToyRentNew } from '../../services/UserServices';
import { toast } from 'react-toastify';
import { formatCurrency } from '../../utils/currency';

const { Search } = Input;
const { Option } = Select;

const ToyRentStaff = () => {
    const [toys, setToys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addingToCart, setAddingToCart] = useState({});
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(10);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        const fetchToys = async () => {
            try {
                setLoading(true);
                const response = await ViewToyRentNew(keyword, sortOption, pageIndex - 1, pageSize);
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

        fetchToys();
    }, [pageIndex, pageSize, keyword, sortOption]);

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

    const handleAddToCart = async (toyId, quantity = 1) => {
        if (quantity < 1 || quantity > 2147483647) {
            toast.error('Invalid quantity. Please enter a value between 1 and 2147483647.');
            return;
        }

        try {
            setAddingToCart((prevState) => ({ ...prevState, [toyId]: true }));
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
            setAddingToCart((prevState) => ({ ...prevState, [toyId]: false }));
        }
    };

    const columns = [
        {
            title: 'Image',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (text, record) => (
                <img src={record.imageUrl} alt={record.toyName} style={{ width: '50px', height: '50px' }} />
            ),
        },
        {
            title: 'Toy Name',
            dataIndex: 'toyName',
            key: 'toyName',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Price/Day',
            dataIndex: 'rentPricePerDay',
            key: 'rentPricePerDay',
            render: (price) => formatCurrency(price),
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
            render: (stock) => (stock > 0 ? stock : 'Out of Stock'),
        }
    ];

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
                        <Option value="price_asc">Price Ascending</Option>
                        <Option value="price_desc">Price Descending</Option>
                    </Select>
                </div>
            </div>

            {loading ? (
                <Spin size="large" />
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
                        style={{ textAlign: 'center', marginTop: '20px' }}
                    />
                </>
            )}
        </div>
    );
};

export default ToyRentStaff;
