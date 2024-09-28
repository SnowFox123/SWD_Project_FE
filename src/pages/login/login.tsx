import React, { useState } from "react";

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
            height: "490px",
            zIndex: "5",
            maxWidth: 360,
            marginLeft: "53%",
            marginTop: "3%",
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
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Link to="">Forgot password</Link>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Log in
              </Button>
              or <Link to="">Register now!</Link>
            </Form.Item>
          </Form>
          <Link
            to="/"
            style={{
              display: "flex",
              width: "100%",
              height: "8%",
              borderRadius: "10px",
              border: "2px solid #292929",
              background: "rgba(80, 140, 193, 0.00)",
              justifyContent: "center",
              alignItems: "center",
              textDecoration: "none", // Add this line to ensure no underline
              margin: "10px 0",
            }}
          >
            <span
              style={{
                color: "#292929",
                fontFamily: "Poppins",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
                textDecoration: "none", // This ensures the text itself has no decoration
                textUnderlineOffset: "unset",
              }}
            >
              Register with email
            </span>
          </Link>

          <Link
            to="/"
            style={{
              display: "flex",
              width: "100%",
              height: "8%",
              borderRadius: "10px",
              border: "2px solid #292929",
              background: "rgba(80, 140, 193, 0.00)",
              justifyContent: "center",
              alignItems: "center",
              textDecoration: "none", // Add this line to ensure no underline
              margin: "10px 0",
            }}
          >
            <img
              src="Google.png"
              style={{ width: "20px", marginRight: "5px" }}
              alt="google-icon"
            />
            <span
              style={{
                color: "#292929",
                fontFamily: "Poppins",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
                textDecoration: "none", // This ensures the text itself has no decoration
                textUnderlineOffset: "unset",
              }}
            >
              Continue with Google
            </span>
          </Link>

          <Link
            to="/"
            style={{
              display: "flex",
              width: "100%",
              height: "8%",
              borderRadius: "10px",
              border: "2px solid #292929",
              background: "rgba(80, 140, 193, 0.00)",
              justifyContent: "center",
              alignItems: "center",
              textDecoration: "none", // Add this line to ensure no underline
              margin: "10px 0",
            }}
          >
            <img
              src="Facebook.png"
              style={{ width: "20px", marginRight: "5px" }}
              alt="google-icon"
            />
            <span
              style={{
                color: "#292929",
                fontFamily: "Poppins",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
                textDecoration: "none", // This ensures the text itself has no decoration
                textUnderlineOffset: "unset",
              }}
            >
              Continue with Facebook
            </span>
          </Link>
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
