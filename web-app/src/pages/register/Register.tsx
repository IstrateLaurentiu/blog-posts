import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

export const Register: React.FC = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state: any) => state.user,
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/feed');
    }
    if (success) {
      navigate('/login');
    }
  }, [navigate, userInfo, success]);
  const onFinish = (values: any) => {
    //@ts-ignore
    dispatch(registerUser(values));
  };

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <div className="auth-card">
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Full Name"
          name="fullname"
          rules={[{ required: true, message: 'Please input your full name!' }]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
