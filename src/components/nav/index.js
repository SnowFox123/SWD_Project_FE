import React from "react";
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined, CodeSandboxOutlined } from '@ant-design/icons';
import "./navbar.css";
import { Col, Row } from 'antd';
import { Input, Space } from 'antd';
import { Divider } from 'antd';
const { Search } = Input;



const onSearch = (value, _e, info) => console.log(info?.source, value);

export const Navbar = () => {
    return (
        <div className="box">
            <div className="rectangle">
                <Row style={{ padding: "20px 60px" }}>
                    <Col span={12}>
                        <Search
                            placeholder="input search text"
                            allowClear
                            enterButton="Tìm kiếm"
                            size="large"
                            style={{
                                maxWidth: "80%",
                                // padding: "10px",   // Increase input padding 
                            }}
                            className="custom-search" // Add class for further styling
                            onSearch={onSearch}
                        />
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={12}>
                                <Link to="/cart">
                                    <ShoppingCartOutlined />
                                    Giỏ hàng
                                </Link>
                                <Divider type="vertical" />
                                <Link to="/historyusercart">
                                    <CodeSandboxOutlined />
                                    Giỏ hàng
                                </Link>
                            </Col>
                            <Col span={12}>
                                <Link to="/login">
                                    <CodeSandboxOutlined />
                                    Login
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
