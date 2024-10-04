import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

import './register.css';
import { signup } from "../../services/authService";
import { toast } from "react-toastify";

const Register2 = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  
  const navigate = useNavigate();
  
  const nameInputRef = useRef(null); // reference for the input element

  // useEffect for focusing the name input field on component mount
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []); // Empty dependency array means this runs once after the initial render

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(name, email, password, address, phone);
      toast.success("Signup successful", response);
      navigate("/login");
    } catch (err) {
      toast.error("Signup failed");
    }
  };

  return (
    <div>
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
            src="zurg.png"
            style={{
              position: "absolute",
              objectFit: "contain",
              width: "52%",
              marginLeft: "55%",
              height: "90%",
              marginTop: "4%",
              zIndex: "3",
            }}
            className="fade-in"
          />
        </div>
        <div>
          <img
            alt=""
            src="t-rex.png"
            style={{
              position: "absolute",
              objectFit: "contain",
              width: "34%",
              height: "85%",
              zIndex: "1",
              marginTop: "6%",
            }}
            className="fade-in"
          />
        </div>
        <div style={{ position: "relative",display: "flex", justifyContent: "center", alignItems: 'center'}}>
        <div
          style={{
            borderRadius: "33.684px",
            background:
              "radial-gradient(110.62% 129.38% at 8.52% 8.5%, rgba(255, 255, 255, 0.80) 0%, rgba(255, 255, 255, 0.48) 100%)",
            backdropFilter: "blur(10px)",
            // position: "absolute",
            objectFit: "contain",
            justifyContent: "center",
            width: "85%",
            zIndex: "5",
            maxWidth: 410,
            // marginLeft: "36%",
            marginTop: "2%",
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

          <div
            style={{
              marginTop: "10px",
              fontSize: "16px",
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            Đã có tài khoản?
            <Link className="btn-register" to="/login">
              Đăng nhập tại đây!
            </Link>
          </div>

          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            {/* Name Validation */}
            <Form.Item
              label="Name"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
                {
                  pattern: /^[A-Za-z]+$/,
                  message: "Username must contain only letters!",
                },
                {
                  min: 3,
                  message: "Username must be at least 3 characters long",
                },
              ]}
            >
              <Input
                placeholder="Name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                ref={nameInputRef}  // Set ref to focus on this input field
              />
            </Form.Item>

            {/* Email Validation */}
            <Form.Item
              label="Email"
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
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Item>

            {/* Phone Validation */}
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please input your phone number!" },
                {
                  pattern: /^\d{10}$/,
                  message: "Phone number must contain exactly 10 digits!",
                },
              ]}
            >
              <Input
                placeholder="Phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </Form.Item>

            {/* Address Validation */}
            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input
                placeholder="Address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </Form.Item>

            {/* Password Validation */}
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                {
                  min: 6,
                  message: "Password must be at least 6 characters",
                },
                {
                  pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                  message:
                    "Password must contain at least one uppercase letter and one special character",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Item>

            {/* Confirm Password Validation */}
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                className="register-button"
                onClick={handleRegister}
                style={{
                  padding: "20px",
                  borderRadius: "10px",
                  background: "red",
                  boxShadow: "0px 4px 15px 0px rgba(0, 0, 0, 0.20)",
                  fontSize: "16px",
                  width: "100%",
                }}
              >
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
        </div>

        </div>
      </div>
    </div>
  );
};

export default Register2;
