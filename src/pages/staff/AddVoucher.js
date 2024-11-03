import React, { useEffect } from 'react';
import { Form, Input, Button, message, DatePicker } from 'antd';
import { AddNewVoucher, PutVoucher } from '../../services/staffService';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const AddVoucher = ({ initialData, onCloseModal }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialData) {
            const formattedData = {
                ...initialData,
                expiredDate: initialData.expiredDate ? dayjs(initialData.expiredDate).tz('Asia/Ho_Chi_Minh') : null,
            };
            form.setFieldsValue(formattedData);
        } else {
            form.resetFields();
        }
    }, [initialData, form]);

    const validateVoucherName = (_, value) => {
        if (!value || /^[A-Za-z\s]+$/.test(value.trim())) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Voucher name must contain only letters and spaces.'));
    };

    const validateExpiryDate = (_, value) => {
        const now = dayjs().tz('Asia/Ho_Chi_Minh'); // Get the current date and time in the Vietnam timezone

        // Check if the value is valid and whether it is in the future
        if (!value || value.isAfter(now)) {
            return Promise.resolve(); // Date is valid (either not set or in the future)
        }

        return Promise.reject(new Error('Expiry date must be a future date and time.')); // Error message for invalid date
    };


    const validateDiscount = (_, value) => {
        if (value > 0 && value < 100) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Discount must be greater than 0 and less than 100.'));
    };

    const validateQuantity = (_, value) => {
        if (value > 0) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Quantity must be greater than 0.'));
    };

    const handleFinish = async (formData) => {
        // Trim all form data to remove leading/trailing spaces
        const trimmedData = {
            ...formData,
            voucherName: formData.voucherName.trim(),
            // Do NOT convert to UTC for submission; keep it in local time
            expiredDate: formData.expiredDate ? formData.expiredDate.format('YYYY-MM-DD') : null, // format to string
            discount: formData.discount,
            quantity: formData.quantity,
        };

        try {
            // Create a FormData object for submission
            const submissionData = new FormData();
            Object.keys(trimmedData).forEach((key) => {
                submissionData.append(key, trimmedData[key]);
            });

            if (initialData && initialData.voucherId) {
                submissionData.append("voucherId", initialData.voucherId);
                await PutVoucher(submissionData);
                message.success("Voucher updated successfully!");
            } else {
                await AddNewVoucher(submissionData);
                message.success("Voucher added successfully!");
            }

            form.resetFields(); // Reset all fields to empty
            onCloseModal(true); // Close modal and refresh on success
        } catch (error) {
            // Error handling remains the same
        }
    };


    const handleCancel = () => {
        form.resetFields();
        onCloseModal();
    };

    return (
        <Form form={form} onFinish={handleFinish} layout="vertical">
            <Form.Item
                name="voucherName"
                label="Voucher Name"
                rules={[{ required: true, message: "Voucher name is required." }, { validator: validateVoucherName }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="expiredDate"
                label="Expiry Date"
                rules={[{ required: true, message: "Expiry date is required." }, { validator: validateExpiryDate }]}
            >
                <DatePicker
                    format="YYYY-MM-DD HH:mm:ss" // Include time in format
                    showTime={{ format: 'HH:mm:ss' }} // Show time selector
                    disabledDate={(current) => current.isBefore(dayjs().tz('Asia/Ho_Chi_Minh').startOf('day'))}
                />
            </Form.Item>
            <Form.Item
                name="discount"
                label="Discount (%)"
                rules={[{ required: true, message: "Discount is required." }, { validator: validateDiscount }]}
            >
                <Input type="number" min={0} max={100} />
            </Form.Item>
            <Form.Item
                name="quantity"
                label="Quantity"
                rules={[{ required: true, message: "Quantity is required." }, { validator: validateQuantity }]}
            >
                <Input type="number" min={1} />
            </Form.Item>
            <Button type="primary" htmlType="submit">
                {initialData ? "Update Voucher" : "Add Voucher"}
            </Button>
            <Button type="default" onClick={handleCancel}>
                Cancel
            </Button>
        </Form>
    );
};

export default AddVoucher;
