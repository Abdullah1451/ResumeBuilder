import { Button, Form, Input, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./authentication.css";
import axios from "axios";

function Login() {
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    console.log(values)
    try {
      const user = await axios.post("/api/user/login", values);
      setLoading(false);
      message.success("Login successfull.");
      localStorage.setItem("vikiresume-user", JSON.stringify(user.data));
      window.location.replace("/templates");
    } catch (err) {
      console.log(err.message)
      setLoading(false);
      message.error("Login failed.");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("vikiresume-user")) {
      window.location.replace("/templates");
    }
  });

  return (
    <div className="auth-parent">
      {loading && <Spin size="large" />}
      <h1 className="brand">Resume Builder</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <h1>Login</h1>
        <hr />
        <Form.Item name="username" label="Username">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input type="password" />
        </Form.Item>
        <div className="login_register_button">
          <Link to="/register">Click here to Register</Link>
          <Button type="primary" htmlType="submit">
            LOGIN
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;
