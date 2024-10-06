import React, { useEffect, useState } from 'react';
import { getCategories, postCategories, putCategories } from '../services/staffService';
import { Table, Button, Input, Modal, Form } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [initialCategoryName, setInitialCategoryName] = useState(''); // Lưu giữ giá trị ban đầu của category name
    const [form] = Form.useForm();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getCategories();
                setCategories(fetchedCategories);
                setFilteredCategories(fetchedCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleAdd = () => {
        form.resetFields();
        setSelectedCategory(null);
        setInitialCategoryName(''); // Reset giá trị ban đầu khi thêm mới
        setIsModalVisible(true);
        setIsSubmitDisabled(true); // Reset trạng thái nút submit
    };

    const handleEdit = (category) => {
        setSelectedCategory(category);
        form.setFieldsValue(category);
        setInitialCategoryName(category.categoryName); // Thiết lập giá trị ban đầu khi chỉnh sửa
        setIsModalVisible(true);
        setIsSubmitDisabled(true); // Disable nút submit khi vào form edit
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            if (selectedCategory) {
                await putCategories(selectedCategory.categoryId, values.categoryName);
                toast.success('Category updated successfully!')
            } else {
                await postCategories(values.categoryName);
                toast.success('Category added successfully!')
            }
            const updatedCategories = await getCategories();
            setCategories(updatedCategories);
            setFilteredCategories(updatedCategories);
            setIsModalVisible(false);
        } catch (error) {
            let errorMessage = 'An error occurred while processing your request.';
            if (error.validationErrors) {
                errorMessage = Object.values(error.validationErrors).join(' '); // Join all validation messages
            }
            toast.error(errorMessage)
            setError(error);
        }
    };

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchTerm(searchValue);
        const filteredData = categories.filter((category) =>
            category.categoryName.toLowerCase().includes(searchValue)
        );
        setFilteredCategories(filteredData);
        setCurrentPage(1);
    };

    const validateCategoryName = (value) => {
        // Regular expression for validation: only letters and spaces, no Vietnamese characters
        const regex = /^[a-zA-Z\s]+$/;
        return regex.test(value);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        form.setFieldsValue({ categoryName: value });

        // Kiểm tra nếu giá trị hiện tại khác với giá trị ban đầu và hợp lệ thì cho phép bật nút submit
        if (validateCategoryName(value) && value !== initialCategoryName) {
            setIsSubmitDisabled(false); // Enable submit button if valid and value changed
        } else {
            setIsSubmitDisabled(true); // Disable submit button if invalid or value unchanged
        }
    };

    const columns = [
        {
            title: 'Category ID',
            dataIndex: 'categoryId',
            key: 'categoryId',
            sorter: (a, b) => a.categoryId - b.categoryId,
        },
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: 'categoryName',
            sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button onClick={() => handleEdit(record)} type="primary">
                    Edit
                </Button>
            ),
        }
    ];

    if (loading) {
        return <p>Loading categories...</p>;
    }

    if (error) {
        return <p>Error fetching categories: {error.message}</p>;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredCategories.slice(startIndex, endIndex);

    return (
        <div>
            <h2>Categories</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <Input
                    placeholder="Search categories"
                    prefix={<SearchOutlined />}
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ maxWidth: 300 }}
                />
                <Button onClick={handleAdd} type="primary">
                    Add Category
                </Button>
            </div>
            <Table
                dataSource={paginatedData}
                columns={columns}
                rowKey="categoryId"
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: filteredCategories.length,
                    onChange: (page) => setCurrentPage(page),
                }}
            />
            <Modal
                title={selectedCategory ? "Edit Category" : "Add Category"}
                visible={isModalVisible}
                onOk={handleSubmit}
                onCancel={() => setIsModalVisible(false)}
                okButtonProps={{ disabled: isSubmitDisabled }} // Disable the submit button based on validation
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Category Name"
                        name="categoryName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the category name!',
                            },
                            {
                                validator: (_, value) => {
                                    if (!value || validateCategoryName(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject({
                                        message: 'Category name must contain only letters and spaces and should not include Vietnamese characters!!',
                                    });
                                },
                            },
                        ]}
                    >
                        <Input
                            onChange={handleInputChange}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    // Kiểm tra tính hợp lệ trước khi submit
                                    form.validateFields().then(() => {
                                        // Nếu form hợp lệ, gọi hàm submit
                                        handleSubmit();
                                    })
                                }
                            }}
                        />
                    </Form.Item>
                </Form>


            </Modal>
        </div>
    );
};

export default CategoryList;
