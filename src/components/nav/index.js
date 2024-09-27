import React from "react";
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined, CodeSandboxOutlined, UserOutlined } from '@ant-design/icons';
import "./navbar.css";  // Ensure this imports your updated CSS
import { Col, Row } from 'antd';
import { Input, Space } from 'antd';
import { Divider } from 'antd';

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

export const Navbar = () => {
    return (
        <div className="box">
            <div className="rectangle">
                <Row style={{ padding: "20px 200px" }}>
                    <Col span={12}>
                        <Search
                            placeholder="input search text"
                            allowClear
                            enterButton="Tìm kiếm"
                            size="large"
                            style={{
                                maxWidth: "80%",
                            }}
                            className="custom-search"
                            onSearch={onSearch}
                        />
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={12}>
                                <Link to="/cart">
                                    <ShoppingCartOutlined style={{ fontSize: "24px", marginRight: "5px" }} />
                                    Giỏ hàng
                                </Link>
                                <Divider type="vertical" style={{ backgroundColor: "#ccc"}} className="divider" />
                                <Link to="/historyusercart">
                                    <CodeSandboxOutlined style={{ fontSize: "24px", marginRight: "5px" }} />
                                    Lịch sử đơn hàng
                                </Link>
                            </Col>
                            <Col span={12}>
                                <Row style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                                    <Link to="/login">
                                        <UserOutlined style={{ fontSize: "24px", marginRight: "5px" }} />
                                        Đăng nhập
                                    </Link>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
