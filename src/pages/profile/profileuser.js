import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../../services/profile';
import { Form, Input, Button, Row, Col, Typography, Spin, notification } from 'antd'; // Ant Design imports
import { EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons'; // Ant Design icons
import { useDispatch } from 'react-redux';
import { updateNamePhone } from '../../redux/authSlice';

const { Title } = Typography;

const ProfileUser = () => {
  const [profile, setProfile] = useState({
    accountName: '',
    address: '',
    phoneNumber: '',
  });
  const [initialProfile, setInitialProfile] = useState(null); // Store the initial profile data
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form] = Form.useForm(); // Ant Design's form instance

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await getProfile();
        setProfile(userProfile);
        setInitialProfile(userProfile);
        form.setFieldsValue(userProfile); // Initialize form with profile data
        // console.log(userProfile)
      } catch (err) {
        notification.error({
          message: 'Error',
          description: err.message || 'Failed to load profile',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (values) => {
    const { accountName, address, phoneNumber } = values;

    try {
      await updateProfile({ accountName, address, phoneNumber });
      notification.success({
        message: 'Success',
        description: 'Profile updated successfully!',
      });
      setIsEditing(false);
      setInitialProfile({ accountName, address, phoneNumber });
      setProfile({ accountName, address, phoneNumber }); // Update current profile
      dispatch(updateNamePhone({ accountName, phoneNumber }));
    } catch (err) {
      if (err.response && err.response.data.errors) {
        const backendErrors = err.response.data.errors;
        const formattedErrors = Object.keys(backendErrors).map((field) => ({
          name: field,
          errors: backendErrors[field],
        }));
        form.setFields(formattedErrors); // Set errors on corresponding fields
      } else {
        notification.error({
          message: 'Error',
          description: err.message || 'Failed to update profile',
        });
      }
    }
  };

  const handleCancel = () => {
    // Reset form and state only if there are changes
    if (hasProfileChanged()) {
      form.setFieldsValue(initialProfile); // Reset form fields to initial values
      setProfile(initialProfile); // Set the profile state back to the initial profile
    }
    setIsEditing(false); // Exit editing mode
  };

  const hasProfileChanged = () => {
    return (
      profile.accountName !== initialProfile?.accountName ||
      profile.address !== initialProfile?.address ||
      profile.phoneNumber !== initialProfile?.phoneNumber
    );
  };

  if (loading) {
    return (
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
        <Spin size="large" />
      </Row>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      <Title level={2}>Profile Information</Title>
      <Form
        form={form} // Bind form to the Ant Design form instance
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={profile} // Set initial values
      >
        <Form.Item
          label="Name"
          name="accountName"
          rules={[
            { required: true, message: "Please input your username!" },
            {
              pattern: /^[A-Za-z\s]+$/,
              message: "Username must contain only letters and spaces!",
            },
            {
              min: 3,
              message: "Username must be at least 3 characters long",
            },
          ]}
        >
          {isEditing ? (
            <Input
              name="accountName"
              value={profile.accountName}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          ) : (
            <span>{profile.accountName || 'N/A'}</span> // Render valid string
          )}
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[
            { required: true, message: "Please input your address!" },
          ]}
        >
          {isEditing ? (
            <Input
              name="address"
              value={profile.address}
              onChange={handleChange}
              placeholder="Enter your address"
            />
          ) : (
            <span>{profile.address || 'N/A'}</span> // Render valid string
          )}
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
            {
              pattern: /^\d{10}$/,
              message: "Phone number must contain exactly 10 digits!",
            },
          ]}
        >
          {isEditing ? (
            <Input
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          ) : (
            <span>{profile.phoneNumber || 'N/A'}</span> // Render valid string
          )}
        </Form.Item>

        <Form.Item>
          {isEditing ? (
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
                  disabled={!hasProfileChanged()} // Enable save only if there are changes
                  icon={<SaveOutlined />}
                >
                  Save Changes
                </Button>
              </Col>
            </Row>
          ) : (
            <Button
              type="primary"
              onClick={() => setIsEditing(true)}
              icon={<EditOutlined />}
            >
              Edit Profile
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileUser;
