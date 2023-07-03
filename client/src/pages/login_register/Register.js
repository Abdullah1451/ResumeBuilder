import { Button, Form, Input, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import "./authentication.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    console.log(values)
    try {
      await axios.post("/api/user/register", values);
      setLoading(false);
      message.success("Registration successfull.");
    } catch (err) {
      setLoading(false);
      message.error("Registration failed.");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("vikiresume-user")) {
      window.location.replace("/");;
    }
  });

  return (
    <div className="auth-parent">
      {loading && <Spin size="large" />}
      <h1 className="brand">Resume Builder</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <h1>Register</h1>
        <hr />
        <Form.Item name="username" label="Username">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input type="password" />
        </Form.Item>
        <Form.Item name="cpassword" label="Confirm Password">
          <Input type="password" />
        </Form.Item>
        <div className="login_register_button">
          <Link to="/login">Click here to Login</Link>
          <Button type="primary" htmlType="submit">
            REGISTER
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Register;
