import React, { useState } from "react";

import "./login.css";

import { Link } from "react-router-dom";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";

const Login: React.FC = () => {
  // State variables with proper TypeScript types
  const [email, setEmail] = useState<string>(""); // email is a string
  const [password, setPassword] = useState<string>(""); // password is a string
  const [error, setError] = useState<string>(""); // error is a string

  // Event handler with proper typing
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Dummy authentication logic (replace this with actual authentication)
    if (email === "user@example.com" && password === "password") {
      alert("Login successful!");
      // Redirect or update state accordingly
    } else {
      setError("Invalid email or password.");
    }
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
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
              fontSize: "22px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              margin: "0px",
            }}
          >
            Joy is yet to begin
          </p>

          <p
            style={{
              color: "#5C5C5C",
              fontFamily: "Poppins",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              margin: "5px 0px 15px 0px",
            }}
          >
            Enter your username & password to enjoy <br />
            the bunch of awesome movies and games
          </p>

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={
              {
                // width: "200px", // Set width and height for testing purposes
                // height: "200px",
              }
            }
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                </Form.Item>
                <Link style={{ fontSize: "16px"}} to="/forgotpassword">Quên mật khẩu ?</Link>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                className="login-button"
                style={{
                  // backgroundColor: "green",
                  padding: "20px",
                  borderRadius: "10px",
                  background: "red",
                  boxShadow: "0px 4px 15px 0px rgba(0, 0, 0, 0.20)",
                  fontSize: "16px",
                }}
              >
                Đăng nhập
              </Button>
              <div style={{ marginTop: "10px", fontSize:"16px", display: "flex", justifyContent: "center"}}>
              Chưa có tài khoản?
                <Link className="btn-register" to="/register">
                  Đăng kí tài khoản
                </Link>
              </div>
            </Form.Item>
          </Form>
          <Link to="/register" className="link-container">
            <span className="link-text">Register with email</span>
          </Link>

          {/* <Link to="/" className="link-container">
            <img src="Google.png" alt="google-icon" />
            <span className="link-text">Continue with Google</span>
          </Link>

          <Link to="/" className="link-container">
            <img src="Facebook.png" alt="facebook-icon" />
            <span className="link-text">Continue with Facebook</span>
          </Link> */}
        </div>
      </div>
      {/* <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form> */}
    </div>
  );
};

export default Login;
