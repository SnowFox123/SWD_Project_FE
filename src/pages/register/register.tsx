import React from "react";
// import "./login.css";
import { Form, Input, Button } from "antd";
import type { FormProps } from "antd";

import { Link } from "react-router-dom";


import './register.css'

type FieldType = {
  username?: string;
  email?: string;
  phone?: string;
  address?: string;
  password?: string;
  confirmPassword?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Register: React.FC = () => {
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
            justifyContent: "center",
            width: "85%",
            zIndex: "5",
            maxWidth: 410,
            marginLeft: "34%",
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
              marginBottom: "10px"
            }}
          >
            Đăng ký
          </p>

          <div style={{ marginTop: "10px", fontSize:"16px", display: "flex", justifyContent: "center", marginBottom: "20px"}}>
              Đã có tài khoản?
                <Link className="btn-register" to="/login">
                  Đăng nhập tại đây!
                </Link>
              </div>

          {/* <p
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
            Đăng ký <br />
            the bunch of awesome movies and games
          </p> */}

          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            {/* Username Validation */}
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
                { min: 3, message: "Username must be at least 3 characters" },
              ]}
            >
              <Input />
            </Form.Item>

            {/* Email Validation */}
            <Form.Item<FieldType>
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
              <Input />
            </Form.Item>

            {/* Phone Validation */}
            <Form.Item<FieldType>
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please input your phone number!" },
                {
                  pattern: /^\d{10}$/,
                  message: "Phone number must be 10 digits!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/* Address Validation */}
            <Form.Item<FieldType>
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input />
            </Form.Item>

            {/* Password Validation */}
            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            {/* Confirm Password Validation */}
            <Form.Item<FieldType>
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              labelCol={{ span: 8 }} // Adjust label width
              wrapperCol={{ span: 16 }} // Adjust input width
              labelAlign="left" // Align label to the left
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
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

            <Form.Item >
              <Button
                block
                type="primary"
                htmlType="submit"
                className="register-button"
                style={{
                  // backgroundColor: "green",
                  padding: "20px",
                  borderRadius: "10px",
                  background: "red",
                  boxShadow: "0px 4px 15px 0px rgba(0, 0, 0, 0.20)",
                  fontSize: "16px",
                  width: "100%",
                  // display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center"
                }}
              >
                Đăng ký
              </Button>
            </Form.Item>

            {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item> */}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
