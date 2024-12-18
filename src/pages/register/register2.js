import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Button, Radio } from "antd";
import { Link, useNavigate } from "react-router-dom";
import './register.css';
import { signup } from "../../services/authService";
import { signupSupplier } from "../../services/authService"; // Assuming you've added this in your service
import { toast } from "react-toastify";

const Register2 = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isSupplier, setIsSupplier] = useState(false); // State for switching between user and supplier

  const navigate = useNavigate();
  const [form] = Form.useForm(); // Ant Design form instance
  const nameInputRef = useRef(null); // reference for the input element

  // useEffect for focusing the name input field on component mount
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (isSupplier) {
        // Call signupSupplier for suppliers
        response = await signupSupplier(name, email, password, address, phone);
        toast.success("Supplier registration successful", response);
      } else {
        // Call signup for regular users
        response = await signup(name, email, password, address, phone);
        toast.success("User registration successful", response);
      }

      navigate("/login");
    } catch (err) {
      toast.error("Signup failed");
    }
  };

  // Function to handle form change and update button state
  const handleFormChange = (_, allFields) => {
    const hasErrors = allFields.some(field => field.errors.length > 0); // Check if any field has errors
    const allFilled = allFields.every(field => field.value); // Ensure all fields are filled
    setIsButtonDisabled(hasErrors || !allFilled); // Disable button if errors exist or fields are empty
  };

  return (
    <div>
      <div style={{ position: "relative", width: "100%", height: "650px" }}>
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
              marginTop: "2%",
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
              marginTop: "4%",
            }}
            className="fade-in"
          />
        </div>
        <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: 'center' }}>
          <div
            style={{
              borderRadius: "33.684px",
              background:
                "radial-gradient(110.62% 129.38% at 8.52% 8.5%, rgba(255, 255, 255, 0.80) 0%, rgba(255, 255, 255, 0.48) 100%)",
              backdropFilter: "blur(10px)",
              justifyContent: "center",
              width: "85%",
              zIndex: "5",
              maxWidth: 410,
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
              {isSupplier ? "Register Supplier with ERT System" : "Register User with ERT System"}
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
              Already have an account?
              <Link className="btn-register" to="/login">
                Sign in here!
              </Link>
            </div>

            <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
              <Radio.Group
                value={isSupplier}
                onChange={(e) => setIsSupplier(e.target.value)}
                buttonStyle="solid"
              >
                <Radio.Button value={false}>User</Radio.Button>
                <Radio.Button value={true}>Supplier</Radio.Button>
              </Radio.Group>
            </div>

            <Form
              form={form}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              autoComplete="off"
              onFieldsChange={handleFormChange} // Add this handler to monitor form changes
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
                rules={[{ required: true, message: "Please input your address!" }]}
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
                  className="register-button-2"
                  onClick={handleRegister}
                  disabled={isButtonDisabled} // Disable button based on validation
                  style={{
                    width: "100%", // Adjust the width here if needed
                    background: isButtonDisabled ? "#d9d9d9" : "red", // Gray when disabled, red when enabled
                    padding: "20px",
                    color: isButtonDisabled ? "#a0a0a0" : "#fff", // Adjust text color when disabled
                    cursor: isButtonDisabled ? "not-allowed" : "pointer", // Change cursor when disabled
                  }}
                >
                  Register
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
