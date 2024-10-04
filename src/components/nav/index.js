import React, { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ShoppingCartOutlined,
  CodeSandboxOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Dropdown, Space, Divider, Col, Row, Input } from 'antd';
import { logout } from '../../redux/authSlice'; // Make sure this is imported correctly
import './navbar.css'; // Ensure this imports your updated CSS

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

  const handleRegister = () => {
    // dispatch(logout());
    navigate('/register'); // Redirect to home after logout
  };

  const items = isAuthenticated
    ? [
      {
        key: '1',
        label: <span onClick={handleProfile}>Tài khoản</span>, // Trigger logout on click
      },
      {
        key: '3',
        label: <span onClick={handleChangePassword}>Đổi mật khẩu</span>, // Trigger logout on click
      },
        {
          key: '4',
          label: <span onClick={handleLogout}>Đăng xuất</span>, // Trigger logout on click
        },
      ]
    : [
        {
          key: '2',
          label: <Link to="/login">Đăng nhập</Link>,
        },
        {
          key: '5',
          label: <span onClick={handleRegister}>Đăng kí</span>, // Trigger logout on click
        },
      ];

  return (
    <div className="navbar" style={{ position: 'sticky' }}>
      <Row style={{ padding: '20px 200px' }}>
        <Col
          span={8}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {/* <img style={{width: '100px'}} src="https://w7.pngwing.com/pngs/968/724/png-transparent-toy-biz-hd-logo.png" alt=""/> */}
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Tìm kiếm"
            size="large"
            style={{ maxWidth: '80%' }}
            className="custom-search"
          />
        </Col>
        <Col
          span={8}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Link to="/cart">
            <ShoppingCartOutlined style={{ fontSize: '24px', marginRight: '5px' }} />
            Giỏ hàng
          </Link>
          <Divider type="vertical" style={{ backgroundColor: '#ccc' }} className="divider" />
          <Link to="/historyusercart">
            <CodeSandboxOutlined style={{ fontSize: '24px', marginRight: '5px' }} />
            Lịch sử đơn hàng
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
