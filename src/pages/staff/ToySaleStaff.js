import React, { useEffect, useState } from 'react';
import { Table, Pagination, Spin, message, Input, Select } from 'antd';
import { ViewToySaleNew } from '../../services/UserServices'; // Import the new API
import { Link } from 'react-router-dom';

import { formatCurrency } from '../../utils/currency';

const { Search } = Input;
const { Option } = Select;

const ToySaleStaff = () => {
    const [toys, setToys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(10);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        const fetchToys = async () => {
            try {
                setLoading(true);

                // Call the new API with combined search, sort, and pagination
                const response = await ViewToySaleNew(keyword, sortOption, pageIndex - 1, pageSize);

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

    const columns = [
        {
            title: 'Image',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (text) => (
                <img src={text} alt="Toy" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
            ),
        },
        {
            title: 'Toy Name',
            dataIndex: 'toyName',
            key: 'toyName',
            render: (text, record) => (
                // <Link to={`/toysaledetail/${record.toyId}`} style={{ textDecoration: 'none' }}>
                text
                // </Link>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Price',
            dataIndex: 'buyPrice',
            key: 'buyPrice',
            render: (text) => <span>{formatCurrency(text)}</span>,
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
            render: (text) => <span>{text}</span>,
        },
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
                <div>
                    <Table
                        columns={columns}
                        dataSource={toys}
                        rowKey="toyId"
                        pagination={false}
                    />

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

export default ToySaleStaff;
