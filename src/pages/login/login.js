import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import { login } from '../../services/authService';
import { decodeJWT } from '../../utils/jwtUtils'; // Import decodeJWT
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Spin, Alert } from "antd"; // Import Alert component
import React, { useState } from "react";
import { toast } from 'react-toastify';
import "./login.css";

const Login2 = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // For showing error message
  const [loadingAPI, setLoadingAPI] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setLoadingAPI(true); // Start loading spinner

    try {
      const response = await login(email, password);

      if (response.accessToken) {
        const { accessToken, refreshToken } = response;
        const decodedToken = decodeJWT(accessToken);
        // console.log("🚀 ~ handleLogin ~ decodedToken:", decodedToken)
        const AccountId = decodedToken.AccountId;
        const role = decodedToken.role;
        const unique_name = decodedToken.unique_name;
        const phone = decodedToken.Phone;

        dispatch(loginSuccess({ accessToken, refreshToken, AccountId, role, email, unique_name, phone }));

        toast.success("Login successful!");

        // Redirect based on user role
        if (role === '1') {
          navigate("/user");
        } else if (role === '2') {
          navigate("/supplier");
        } else if (role === '3') {
          navigate("/staff");
        } else if (role === '4') {
          navigate("/admin");
        } else {
          navigate("/unauthorized");
        }
      } else {
        // If login failed but response didn't throw an error, show the backend message
        setError(response.error?.message || "Login failed. Please try again."); // Set error message
        toast.error(response.error?.message || "Login failed. Please try again.");
      }
    } catch (err) {
      // Display error message from backend using toast
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error.message); // Set error message from the backend
        toast.error(err.response.data.error.message);
      } else {
        setError("An unexpected error occurred during login.");
        toast.error("An unexpected error occurred during login.");
      }
    } finally {
      setLoadingAPI(false); // Stop loading spinner
    }
  };

  // Validate email using Validate
  const validateEmail = (email) => {
    const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailValidate.test(email);
  };

  // Validate password using Validate
  const validatePassword = (password) => {
    const passwordValidate = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
    return passwordValidate.test(password);
  };

  // Update email validation on change
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setIsEmailValid(validateEmail(value));
  };

  // Update password validation on change
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setIsPasswordValid(validatePassword(value));
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
              marginTop: "11%",
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
            Sign In
          </p>

          <span className="span-reset-password">
            Welcome to ERT System
          </span>

          {/* Display the error message
          {error && (
            <Alert
              message="Login Error"
              description={error}
              type="error"
              showIcon
              style={{ marginBottom: '20px' }}
            />
          )} */}

          <Form name="login" initialValues={{ remember: true }}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }, { type: "email", message: "Please enter a valid email address!" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email or username "
                type="text"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters" },
                { pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/, message: "Password must contain at least one uppercase letter and one special character" },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined />}
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Item>

            <Form.Item style={{ display: 'flex', justifyContent: 'right' }}>
              <Link style={{ fontSize: "16px" }} to="/forgotpassword">
                Forgot password?
              </Link>
            </Form.Item>

            <Form.Item>
              <Spin spinning={loadingAPI}>
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
                  className={`login-button ${isEmailValid && isPasswordValid ? "active" : ""}`}
                  disabled={!isEmailValid || !isPasswordValid}
                  onClick={handleLogin}
                >
                  Log in
                </Button>
              </Spin>
            </Form.Item>
          </Form>

          <div
            style={{
              marginTop: "10px",
              fontSize: "16px",
              display: "flex",
              justifyContent: "center",
              marginBottom: '16px'
            }}
          >
            Don't have an account yet?

            <Link className="btn-register" to="/register">
              Register an account
            </Link>
          </div>

          <Link to="/" className="link-container">
            <span className="link-text">Back to home page</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login2;










