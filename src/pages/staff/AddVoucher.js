import React, { useState } from 'react';
import { Form, Input, InputNumber, DatePicker, Button, message } from 'antd';
import { AddNewVoucher } from '../../services/staffService';
import dayjs from 'dayjs';

const AddVoucher = ({ onCloseModal }) => {
    const [form] = Form.useForm();
    
    const handleSubmit = async (values) => {
        try {
            const formData = {
                voucherName: values.voucherName,
                expiredDate: values.expiredDate.toISOString(),
                discount: values.discount,
                quantity: values.quantity,
            };
            
            const response = await AddNewVoucher(formData);
            message.success("Voucher added successfully!");
            form.resetFields(); // Reset form after submission
            onCloseModal(true); // Close modal and trigger refresh
        } catch (error) {
            message.error("Error adding voucher. Please try again.");
            console.error("Error adding voucher:", error);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            style={{ maxWidth: 400, margin: '0 auto', padding: 20, backgroundColor: '#fff', borderRadius: 8 }}
        >
            <Form.Item
                label="Voucher Name"
                name="voucherName"
                rules={[{ required: true, message: 'Please enter the voucher name!' }]}
            >
                <Input placeholder="Enter voucher name" />
            </Form.Item>

            <Form.Item
                label="Expired Date"
                name="expiredDate"
                rules={[{ required: true, message: 'Please select the expiry date!' }]}
            >
                <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    style={{ width: '100%' }}
                    disabledDate={(current) => current && current < dayjs().startOf('day')}
                />
            </Form.Item>

            <Form.Item
                label="Discount (%)"
                name="discount"
                rules={[{ required: true, message: 'Please enter the discount value!' }]}
            >
                <InputNumber
                    min={0}
                    max={100}
                    placeholder="Enter discount percentage"
                    style={{ width: '100%' }}
                />
            </Form.Item>

            <Form.Item
                label="Quantity"
                name="quantity"
                rules={[{ required: true, message: 'Please enter the quantity!' }]}
            >
                <InputNumber
                    min={1}
                    placeholder="Enter quantity"
                    style={{ width: '100%' }}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Add Voucher
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddVoucher;
