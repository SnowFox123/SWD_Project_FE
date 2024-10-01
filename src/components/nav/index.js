import React, {useContext, useEffect, useState} from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCartOutlined,
  CodeSandboxOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./navbar.css"; // Ensure this imports your updated CSS
import { Col, Row, Input, Divider } from "antd"; // Combine imports for better readability

import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space, Button } from "antd";

import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";

const { Search } = Input;

export const Navbar = () => {
  const { logout, user } = useContext(UserContext);


  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Log out success")
  };

  const items = user && user.auth === true
    ? [
        {
          key: "1",
          label: (
            <NavLink to="" onClick={() => handleLogout()}>
              Logout
            </NavLink>
          ),
        },
      ]
    : [
        {
          key: "2",
          label: <NavLink to="/login">Login</NavLink>,
        },
      ];

  return (
    <div className="navbar" style={{ position: "sticky" }}>
      {" "}
      {/* Add the navbar class here */}
      {/* <div className="rectangle"> */}
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
          />
        </Col>
        <Col span={12}>
          <Row>
            { (user && user.auth || window.location.pathname === '/') &&
            <>
            <Col span={12}>
              <Link to="/cart">
                <ShoppingCartOutlined
                  style={{ fontSize: "24px", marginRight: "5px" }}
                />
                Giỏ hàng
              </Link>
              <Divider
                type="vertical"
                style={{ backgroundColor: "#ccc" }}
                className="divider"
              />
              <Link to="/historyusercart">
                <CodeSandboxOutlined
                  style={{ fontSize: "24px", marginRight: "5px" }}
                />
                Lịch sử đơn hàng
              </Link>

            </Col>
            <Col span={12}>
              <Row
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Link to="/login">
                  <UserOutlined
                    style={{ fontSize: "24px", marginRight: "5px" }}
                  />
                  Đăng nhập
                </Link>
              </Row>

              <Row>
               {user && user.email && <span>Welcome {user.email}</span>} 
              <Dropdown menu={{ items }}>
                  <NavLink to="" onClick={(e) => e.preventDefault()}>
                    <Space>
                      Hover me
                      <DownOutlined />
                    </Space>
                  </NavLink>
                </Dropdown>
              </Row>
            </Col>
            </>
            }
          </Row>
        </Col>
      </Row>
      {/* </div> */}
    </div>
  );
};
