import React, { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Dropdown, Space, Divider, Col, Row, Input } from 'antd';
import { logout } from '../../redux/authSlice'; // Make sure this is imported correctly
import './navbar.css'; // Ensure this imports your updated CSS
import SearchToyRentComponent from '../search/SearchToyRent';

const { Search } = Input;

export const Navbar = () => {
  const { unique_name, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirect to home after logout
  };

  const handleProfile = () => {
    // dispatch(logout());
    navigate('/profile'); // Redirect to home after logout
  };

  const handleChangePassword = () => {
    // dispatch(logout());
    navigate('/changepassword'); // Redirect to home after logout
  };

  const handleVoucher = () => {
    // dispatch(logout());
    navigate('/voucheruser'); // Redirect to home after logout
  };

  const handleOrderStatus = () => {
    // dispatch(logout());
    navigate('/statusorderpage'); // Redirect to home after logout
  };

  const handleRegister = () => {
    // dispatch(logout());
    navigate('/register'); // Redirect to home after logout
  };

  const items = isAuthenticated
    ? [
      {
        key: '1',
        label: <span onClick={handleProfile}>Profile</span>, // Trigger logout on click
      },
      {
        key: '3',
        label: <span onClick={handleChangePassword}>Change Password</span>, // Trigger logout on click
      },
      ,
      {
        key: '4',
        label: <span onClick={handleOrderStatus}>Order Status</span>, // Trigger logout on click
      },
      {
        key: '5',
        label: <span onClick={handleVoucher}>Voucher</span>, // Trigger logout on click
      },
      {
        key: '6',
        label: <span onClick={handleLogout}>Log out</span>, // Trigger logout on click
      },
    ]
    : [
      {
        key: '2',
        label: <Link to="/login">Sign In</Link>,
      },
      {
        key: '5',
        label: <span onClick={handleRegister}>Sign Up</span>, // Trigger logout on click
      },
    ];

  return (
    <div className="navbar" style={{ position: 'sticky' }}>
      <Row style={{ padding: '15px 200px' }}>
        <Col
          span={8}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Link to='/'>
            <img style={{ width: '150px', height: '45px' }} src="https://i.ebayimg.com/images/g/fGwAAOSwfhtejRhD/s-l1200.jpg" alt="" />
          </Link>
          {/* <Search
            placeholder="input search text"
            allowClear
            enterButton="Tìm kiếm"
            size="large"
            style={{ maxWidth: '80%' }}
            className="custom-search"
          /> */}
          {/* <SearchToyRentComponent /> */}

        </Col>
        <Col
          span={8}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Link to="/cartrental">
            <ShoppingCartOutlined style={{ fontSize: '24px', marginRight: '5px' }} />
            Cart Rental
          </Link>
          <Divider type="vertical" style={{ backgroundColor: '#ccc' }} className="divider" />
          <Link to="/cartsale">
            <ShoppingOutlined style={{ fontSize: '24px', marginRight: '5px' }} />
            Cart Sale
          </Link>
        </Col>

        <Col
          span={8}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '5px',
          }}
        >
          <Dropdown
            style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: '5px' }}
            menu={{ items }}
          >
            <Link to="" onClick={(e) => e.preventDefault()}>
              <Space>
                <UserOutlined />
                <span>{isAuthenticated ? unique_name : 'Guest'}</span>
                <DownOutlined />
              </Space>
            </Link>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
};
