import React from "react";
// import "./login.css";
import { Form, Input, Button } from "antd";
import type { FormProps } from "antd";

import { Link } from "react-router-dom";

import "./forgot-password.css";

type FieldType = {
  email?: string;
  phone?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ForgotPassword: React.FC = () => {
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
            marginTop: "8%",
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
            Đặt lại mật khẩu
          </p>

          <span className="span-reset-password">
            Chúng tôi sẽ gửi email cho bạn để đặt lại mật khẩu
          </span>

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
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
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

            <Form.Item>
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
                Lấy lại mật khẩu
              </Button>
            </Form.Item>
          </Form>
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
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
