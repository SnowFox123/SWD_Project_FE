import React, { useState } from 'react';
import { changePassword } from '../services/profile'; // assuming changePassword is from profile services
import { Form, Input, Button, Row, Col, Typography, Spin } from 'antd'; // Ant Design imports
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'; // Ant Design icons
import { ToastContainer, toast } from 'react-toastify'; // react-toastify imports
import 'react-toastify/dist/ReactToastify.css'; // react-toastify styles
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const { Title } = Typography;

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);  // State to track if submit button should be disabled
    const [form] = Form.useForm(); // Ant Design's form instance
    const navigate = useNavigate(); // Initialize navigate

    // Handle form submit
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await changePassword(oldPassword, newPassword); // Call the changePassword API
            if (res) {
                setNewPassword(''); // Clear the password input
                form.resetFields(); // Reset form fields
                toast.success('Password updated successfully!', res);
                // navigate('/login'); // Navigate to the login page
            }
        } catch (err) {
            toast.error(err.message || 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    // Handle cancel button click (reset form and clear password state)
    const handleCancel = () => {
        form.resetFields();  // Reset form fields
        setNewPassword('');  // Clear password state
        setIsButtonDisabled(true); // Disable the submit button on cancel
    };

    // Function to check if form has changes, is touched, and is valid
    const validateForm = () => {
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
        const allFieldsTouched = form.isFieldsTouched(true);  // Ensure all fields are touched
        return !hasErrors && allFieldsTouched;  // No errors and all fields touched
    };

    // Listen to form changes and enable/disable the submit button accordingly
    const handleFormChange = () => {
        setIsButtonDisabled(!validateForm());  // Enable the button if the form is valid
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
            <Title level={2}>Đổi mật khẩu</Title>
            <Form
                form={form} // Bind form to the Ant Design form instance
                layout="vertical"
                onFieldsChange={handleFormChange}  // Listen to form field changes
            >
                <Form.Item
                    label="Old Password"
                    name="oldPassword"
                    rules={[
                        { required: true, message: "Please input your old password!" },
                        {
                            min: 6,
                            message: "Password must be at least 6 characters long",
                        },
                        {
                            pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                            message: "Password must contain at least one uppercase letter and one special character",
                        },
                    ]}
                >
                    <Input.Password
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}  // Update password state on change
                        placeholder="Enter your old password"
                    />
                </Form.Item>

                <Form.Item
                    label="New Password"
                    name="password"
                    rules={[
                        { required: true, message: "Please input your new password!" },
                        {
                            min: 6,
                            message: "Password must be at least 6 characters long",
                        },
                        {
                            pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                            message: "Password must contain at least one uppercase letter and one special character",
                        },
                    ]}
                >
                    <Input.Password
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}  // Update password state on change
                        placeholder="Enter your new password"
                    />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        { required: true, message: "Please confirm your password!" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("The two passwords do not match!")
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Row gutter={16}>
                        <Col>
                            <Button
                                type="default"
                                onClick={handleCancel}
                                icon={<CloseOutlined />}
                            >
                                Cancel
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<SaveOutlined />}
                                disabled={isButtonDisabled}  // Disable button based on form validation
                                onClick={handleSubmit} // Pass function reference without invoking it
                            >
                                Change Password
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>

            {loading && (
                <Row justify="center" align="middle" style={{ marginTop: '1rem' }}>
                    <Spin size="large" />
                </Row>
            )}

            {/* Toast Container to show notifications */}
            <ToastContainer />
        </div>
    );
};

export default ChangePassword;
