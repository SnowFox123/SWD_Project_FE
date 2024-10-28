import React, { useState } from 'react';
import { Button, Form, Input, DatePicker, InputNumber, message } from 'antd';
import dayjs from 'dayjs'; // Using day.js for date handling
import { PutVoucher } from '../../services/staffService';

const EditVoucherForm = ({ voucher, onSuccess }) => {
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (values) => {
        setLoading(true);

        // Prepare form data to send
        const formData = new FormData();
        formData.append('voucherId', voucher.id); // Assuming `id` is the identifier field
        formData.append('VoucherName', values.VoucherName);
        formData.append('ExpiredDate', values.ExpiredDate.format('YYYY-MM-DD')); // Format date for API
        formData.append('Discount', values.Discount);
        formData.append('Quantity', values.Quantity);

        try {
            await PutVoucher(formData); // Send the formData to update voucher
            message.success('Voucher updated successfully!');
            onSuccess(); // Callback to refresh list or close modal
        } catch (error) {
            message.error('Error updating voucher. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            initialValues={{
                VoucherName: voucher.voucherName,
                ExpiredDate: dayjs(voucher.expiredDate), // Initialize date
                Discount: voucher.discount,
                Quantity: voucher.quantity,
            }}
            onFinish={handleFormSubmit}
        >
            <Form.Item label="Voucher Name" name="VoucherName" rules={[{ required: true, message: 'Please enter voucher name' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Expiry Date" name="ExpiredDate" rules={[{ required: true, message: 'Please select expiry date' }]}>
                <DatePicker format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item label="Discount (%)" name="Discount" rules={[{ required: true, message: 'Please enter discount' }]}>
                <InputNumber min={0} max={100} />
            </Form.Item>

            <Form.Item label="Quantity" name="Quantity" rules={[{ required: true, message: 'Please enter quantity' }]}>
                <InputNumber min={1} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Update Voucher
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditVoucherForm;
