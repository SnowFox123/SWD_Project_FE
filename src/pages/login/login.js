import React, { useEffect, useState, useContext } from "react";
import { loginApi } from "../../services/UserServices";
import { toast } from 'react-toastify';
import { Spin } from 'antd';

import "./login.css";

import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { loginContext } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingAPI, setLoadingAPI] = useState(false);


  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email/Password is required!");
      return;
    }
    setLoadingAPI(true);

    try {
      let res = await loginApi(email, password);
      if (res && res.token) {
        loginContext(email, res.token)
        navigate("/")
        toast.success("Login successful!");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.error || "Invalid email or password.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoadingAPI(false);
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
            alt=""
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
            alt=""
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
            Đăng ký
          </p>
          <p>( eve.holt@reqres.in )</p>

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
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
              rules={[{ required: true, message: "Please input your Password!" }]}
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
                  className={`login-button ${email && password ? "active" : ""}`}
                  disabled={email && password ? false : true}
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

export default Login;
