import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import { login } from '../../services/authService';
import { decodeJWT } from '../../utils/jwtUtils'; // Import decodeJWT

import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";

import React, { useEffect, useState } from "react";
import { loginApi } from "../../services/UserServices";
import { toast } from 'react-toastify';
import { Spin } from 'antd';

import "./login.css";


const Login2 = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loadingAPI, setLoadingAPI] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    try {
      // Await the API response
      const response = await login(email, password);

      const { accessToken, refreshToken } = response;

      // Decode accessToken to get user info
      const decodedToken = decodeJWT(accessToken);
      const role = decodedToken.role; // Get role from JWT
      const unique_name = decodedToken.unique_name; // Get role from JWT

      // Dispatch accessToken, refreshToken, and role to Redux store
      dispatch(loginSuccess({ accessToken, refreshToken, role, email, unique_name }));

      // Set welcome message with email
      // setWelcomeMessage(email);

      // Redirect based on role
      if (role === '1') {
        toast.success("Login successful", response);
        navigate("/user");
      } else if (role === '2') {
        toast.success("Login successful", response);
        navigate("/supplier");
      } else if (role === '3') {
        toast.success("Login successful", response);
        navigate("/staff");
      } else if (role === '4') {
        toast.success("Login successful", response);
        navigate("/admin");
      } else {
        navigate("/unauthorized");
      }
    } catch (err) {
      // Set error if login fails
      toast.error("Login failed", err.message);
    }
  };

  return (
    <div style={{}}>
      <div style={{ position: "relative", width: "100%", height: "600px" }}>
        <img
          alt=""
          src="loginbg.png"
          style={{
            position: "absolute",
            width: "100%",
            height: "102%",
            zIndex: "0",
          }}
        />

        <div>
          <img
            alt="Woody-removebg-preview.png"
            src="Woody-removebg-preview.png"
            style={{
              position: "absolute",
              objectFit: "contain",
              width: "60%",
              height: "102%",
              zIndex: "3",
            }}
            className="fade-in"
          />
        </div>

        <div>
          <img
            alt="Buzz-removebg-preview.png"
            src="Buzz-removebg-preview.png"
            style={{
              position: "absolute",
              objectFit: "contain",
              width: "82%",
              height: "66%",
              zIndex: "1",
              marginTop: "13%",
            }}
            className="fade-in-2"
          />
        </div>

        <div
          style={{
            borderRadius: "33.684px",
            background:
              "radial-gradient(110.62% 129.38% at 8.52% 8.5%, rgba(255, 255, 255, 0.80) 0%, rgba(255, 255, 255, 0.48) 100%)",
            backdropFilter: "blur(10px)",
            position: "absolute",
            objectFit: "contain",
            width: "85%",
            zIndex: "5",
            maxWidth: 360,
            marginLeft: "53%",
            marginTop: "4%",
            padding: "20px 30px",
          }}
        >
          <p
            style={{
              color: "#292929",
              fontFamily: "Poppins",
              fontSize: "26px",
              fontStyle: "normal",
              fontWeight: "bold",
              lineHeight: "normal",
              margin: "0px",
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            Đăng nhập
          </p>
          <p>( user@gmail.com )</p>
          <p>( supplier@gmail.com )</p>
          <p>( staff@gmail.com )</p>
          <p>( admin@gmail.com )</p>
          <p>( edutoyrent123 )</p>

          <Form
            name="login"
            initialValues={{ remember: true }}
          // onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email or username "
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your Password!" },
              {
                pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                message:
                  "Password must contain at least one uppercase letter and one special character",
              },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>
              <Link style={{ fontSize: "16px" }} to="/forgotpassword">
                Quên mật khẩu ?
              </Link>
            </Form.Item>

            <Form.Item>
              <Spin spinning={loadingAPI} >
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  style={{
                    padding: "20px",
                    borderRadius: "10px",
                    background: "#ccc",
                    boxShadow: "0px 4px 15px 0px rgba(0, 0, 0, 0.20)",
                    fontSize: "16px",
                  }}
                  // className={`login-button ${email && password ? "active" : ""}`}
                  // disabled={email && password ? false : true}
                  onClick={handleLogin}

                >

                  Đăng nhập
                </Button>
              </Spin>


              <div
                style={{
                  marginTop: "10px",
                  fontSize: "16px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Chưa có tài khoản?
                <Link className="btn-register" to="/register">
                  Đăng kí tài khoản
                </Link>
              </div>
            </Form.Item>
          </Form>
          <Link to="/" className="link-container">
            <span className="link-text">Về trang chủ</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login2;

// {/* Display welcome message after login */}
// {welcomeMessage && (
//     <span>Welcome, {welcomeMessage}!</span>
// )}