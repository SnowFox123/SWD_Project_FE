import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS

import './SignUpSupplier.css';
import { PutSignUpSupplier } from "../../services/staffService";

const SignUpSupplier = () => {
  const [form] = Form.useForm(); // Using Ant Design form instance
  const navigate = useNavigate();
  const nameInputRef = useRef(null);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Button disabled state

  // Focus the name input field when the component mounts
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  // Enable or disable the button based on form validation
  const handleFormChange = () => {
    // Check if all fields are touched and have no errors
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length > 0);
    const isFormTouched = form.isFieldsTouched(true);

    setIsButtonDisabled(hasErrors || !isFormTouched); // Disable button if there are errors or if form is not touched
  };

  // Handle form submission and validation
  const handleRegister = async () => {
    try {
      // Validate all fields
      const values = await form.validateFields();

      // Perform the sign-up operation
      const response = await PutSignUpSupplier(
        values.username,
        values.email,
        values.password,
        values.address,
        values.phone
      );

      toast.success("Signup supplier successful");
    } catch (err) {
      if (err?.validationErrors) {
        Object.keys(err.validationErrors).forEach((key) => {
          toast.error(`${key}: ${err.validationErrors[key]}`);
        });
      } else if (err?.errorFields) {
        // Handle Ant Design form validation errors
        err.errorFields.forEach(({ name, errors }) => {
          toast.error(`${name[0]}: ${errors[0]}`);
        });
      } else {
        toast.error("Signup supplier failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <div style={{ position: "relative", width: "100%", height: "600px" }}>
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: 'center',
          }}
        >
          <div
            style={{
              borderRadius: "33.684px",
              border: 'solid 5px #ccc',
              background: "radial-gradient(110.62% 129.38% at 8.52% 8.5%, rgba(255, 255, 255, 0.80) 0%, rgba(255, 255, 255, 0.48) 100%)",
              backdropFilter: "blur(10px)",
              justifyContent: "center",
              width: "85%",
              zIndex: "5",
              maxWidth: 470,
              marginTop: "2%",
              padding: "20px 30px",
            }}
          >
            <p
              style={{
                color: "#292929",
                fontFamily: "Poppins",
                fontSize: "26px",
                fontWeight: "bold",
                margin: "0px",
                display: "flex",
                justifyContent: "center",
                marginBottom: "18px",
              }}
            >
              Register Supplier
            </p>

            <Form
              form={form}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              autoComplete="off"
              onFieldsChange={handleFormChange} // Handle form changes here
            >

              <Form.Item
                label="Name"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                  {
                    pattern: /^[A-Za-z]{3,}$/,
                    message: "Username must contain only letters and be at least 3 characters long",
                  },
                ]}
              >
                <Input placeholder="Name" ref={nameInputRef} />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email address!" },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

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
                <Input placeholder="Phone" />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: "Please input your address!" }]}
              >
                <Input placeholder="Address" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                hasFeedback
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 6, message: "Password must be at least 6 characters" },
                  {
                    pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                    message: "Password must contain at least one uppercase letter and one special character",
                  },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={['password']}
                hasFeedback
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("The two passwords do not match!"));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>

              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  className="register-button"
                  onClick={handleRegister}
                  disabled={isButtonDisabled} // Disable the button based on validation
                  style={{
                    padding: "20px",
                    borderRadius: "10px",
                    background: isButtonDisabled ? "gray" : "red", // Change color if not valid
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

export default SignUpSupplier;
