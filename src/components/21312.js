import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Space, Row, Col, Input } from 'antd';
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice'; // Ensure this imports your updated Redux action
import '../components/nav/navbar.css'; // Ensure this imports your updated CSS

const { Search } = Input;

const StaffPage2 = () => {
  const [current, setCurrent] = useState('1');
  const theme = 'dark'; // Set theme to dark directly

  const dispatch = useDispatch(); // Moved dispatch up
  const navigate = useNavigate(); // Moved navigate up

  const { unique_name, isAuthenticated } = useSelector((state) => state.auth);

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const items = [
    {
      key: 'sub1',
      label: 'Navigation One',
      icon: <MailOutlined />,
      children: [
        { key: '1', label: 'Option 1' },
        { key: '2', label: 'Option 2' },
        { key: '3', label: 'Option 3' },
        { key: '4', label: 'Option 4' },
      ],
    },
    {
      key: 'sub2',
      label: 'Navigation Two',
      icon: <AppstoreOutlined />,
      children: [
        { key: '5', label: 'Option 5' },
        { key: '6', label: 'Option 6' },
        {
          key: 'sub3',
          label: 'Submenu',
          children: [
            { key: '7', label: 'Option 7' },
            { key: '8', label: 'Option 8' },
          ],
        },
      ],
    },
    {
      key: 'sub4',
      label: 'Navigation Three',
      icon: <SettingOutlined />,
      children: [
        { key: '9', label: 'Option 9' },
        { key: '10', label: 'Option 10' },
        { key: '11', label: 'Option 11' },
        { key: '12', label: 'Option 12' },
      ],
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirect to home after logout
  };

  // Dropdown menu items
  const dropdownMenuItems = (
    <Menu>
      {isAuthenticated && (
        <Menu.Item key="logout" onClick={handleLogout}>
          Đăng xuất
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <>
      <Row>
        <Col flex="250px" style={{backgroundColor: "#ccc"}}>
          <Menu
            theme={theme}
            onClick={onClick}
            style={{ width: 256 }}
            defaultOpenKeys={['sub1']}
            selectedKeys={[current]}
            mode="inline"
            items={items}
          />
        </Col>
        <Col flex="auto">
          <div className="navbar" style={{ position: 'sticky' }}>
            <Row >
              <Col span={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p style={{ fontSize: '20px' }}>Staff page</p>
              </Col>
              <Col span={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px' }}>
                <Dropdown overlay={dropdownMenuItems}>
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
        </Col>
      </Row>
    </>
  );
};

export default StaffPage2;
