import React, { useEffect, useState } from 'react';
import { getCategories, postCategories, putCategories } from '../services/staffService';
import { Table, Button, Input, Modal, Form } from "antd";

const CategoryList = () => {
    const [categories, setCategories] = useState([]); // State to hold the categories
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to hold any errors
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
    const [selectedCategory, setSelectedCategory] = useState(null); // State to hold selected category
    const [form] = Form.useForm(); // Form for add/edit modal

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getCategories();
                setCategories(fetchedCategories); // Set the fetched categories
            } catch (error) {
                setError(error); // Set any error encountered during fetching
            } finally {
                setLoading(false); // Set loading to false after fetch is complete
            }
        };

        fetchCategories(); // Call the fetch function when the component mounts
    }, []);

    // Function to handle "Add" action
    const handleAdd = () => {
        form.resetFields();
        setSelectedCategory(null); // Clear selected category for new addition
        setIsModalVisible(true); // Show modal for adding new category
    };

    // Function to handle "Edit" action
    const handleEdit = (category) => {
        setSelectedCategory(category); // Set the selected category for editing
        form.setFieldsValue(category); // Populate the form with category data
        setIsModalVisible(true); // Show modal for editing category
    };

    // Function to handle form submission (both for add and edit)
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields(); // Validate the form fields

            if (selectedCategory) {
                // Edit category
                await putCategories(selectedCategory.categoryId, values.categoryName); // Send PUT request to edit
            } else {
                // Add new category
                await postCategories(values.categoryName); // Send POST request to add
            }

            // Refetch categories after add/edit
            const updatedCategories = await getCategories();
            setCategories(updatedCategories); // Update the categories list
            setIsModalVisible(false); // Close modal after successful submission
        } catch (error) {
            setError(error); // Handle errors
        }
    };

    // Define the columns for the Ant Design table
    const columns = [
        {
            title: 'Category ID',
            dataIndex: 'categoryId',
            key: 'categoryId',
        },
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button onClick={() => handleEdit(record)} type="primary" style={{ marginRight: 8 }}>
                        Edit
                    </Button>
                    <Button onClick={handleAdd} type="default">
                        Add
                    </Button>
                </span>
            ),
        }
    ];

    // Handle loading state
    if (loading) {
        return <p>Loading categories...</p>;
    }

    // Handle error state
    if (error) {
        return <p>Error fetching categories: {error.message}</p>;
    }

    return (
        <div>
            <h2>Categories</h2>
            <Table dataSource={categories} columns={columns} rowKey="categoryId" />

            {/* Modal for add/edit category */}
            <Modal
                title={selectedCategory ? "Edit Category" : "Add Category"}
                visible={isModalVisible}
                onOk={handleSubmit}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Category Name"
                        name="categoryName"
                        rules={[{ required: true, message: 'Please input the category name!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CategoryList;
