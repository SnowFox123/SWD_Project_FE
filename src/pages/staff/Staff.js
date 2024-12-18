import React, { useState } from 'react';
import {
  AppstoreOutlined,
  UsergroupDeleteOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserOutlined,
  FileDoneOutlined,
  AlertOutlined,
  RocketOutlined,
  InboxOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Space, Row, Col, Input } from 'antd';
import { DownOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice'; // Ensure this imports your updated Redux action
import '../../components/nav/navbar.css'; // Ensure this imports your updated CSS
import CategoryList from './Categories';
import ApprovalRequestFrom from './ApprovalRequestFrom';
import BanAccount from './BanAccount';
import SignUpSupplier from './SignUpSupplier';
import AddVoucher from './AddVoucher';
import VoucherManager from './VoucherManager';
import ViewPayment from './ViewPayment';
import ViewReportPage from './ViewReport';
import ViewToyPage from './ViewToyPage';

const { Header, Content, Footer, Sider } = Layout;
const siderStyle = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarColor: 'unset',
};

// Define your components for different tabs
const UserPage = () => <p>User Content</p>;
const VideoPage = () => <p>Video Content</p>;
const UploadPage = () => <p>Upload Content</p>;
const BarChartPage = () => <p>Bar Chart Content</p>;
const CloudPage = () => <p>Cloud Content</p>;
const AppStorePage = () => <p>App Store Content</p>;
const TeamPage = () => <p>Team Content</p>;
const ShopPage = () => <p>Shop Content</p>;

const items = [
  // { key: '1', icon: <FileDoneOutlined />, label: 'Approval Request', component: ApprovalRequestFrom },
  { key: '1', icon: <AlertOutlined />, label: 'Report Request', component: ViewReportPage },
  { key: '2', icon: <RocketOutlined />, label: 'Manage Toy', component: ViewToyPage },
  { key: '3', icon: <InboxOutlined />, label: 'Category List', component: CategoryList },
  // { key: '3', icon: <UserAddOutlined />, label: 'SignUp Supplier', component: SignUpSupplier },
  { key: '4', icon: <UsergroupDeleteOutlined />, label: 'View Account', component: BanAccount },
  { key: '5', icon: <AppstoreOutlined />, label: 'Voucher Manager', component: VoucherManager },
  { key: '6', icon: <DollarOutlined />, label: 'View Payment', component: ViewPayment },
];

const StaffPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { unique_name, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirect to home after logout
  };

  const [selectedKey, setSelectedKey] = useState('1'); // State to track selected tab

  // Function to handle menu click
  const handleMenuClick = ({ key }) => {
    setSelectedKey(key); // Set the selected key on menu item click
  };

  // Get the component for the selected tab
  const selectedComponent = items.find(item => item.key === selectedKey)?.component || <p>Content not found</p>;

  // Dropdown menu items
  const dropdownMenuItems = (
    <Menu>
      {isAuthenticated && (
        <Menu.Item key="logout" onClick={handleLogout}>
          Logout
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
          onClick={handleMenuClick} // Add the onClick event handler to the menu
        />
      </Sider>
      <Layout
        style={{
          marginInlineStart: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height: '40px', // Set header height
            lineHeight: '40px', // Set line height for vertical centering
            position: 'sticky',
            display: 'flex', // Use flexbox for alignment
            alignItems: 'center', // Center items vertically
          }}
        >
          <div className="navbar-2" style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <p style={{ fontSize: '18px', margin: 0 }}>Staff page</p>
            </Col>
            <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
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
          </div>
        </Header>

        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {React.createElement(selectedComponent)} {/* Render the selected component */}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default StaffPage;
