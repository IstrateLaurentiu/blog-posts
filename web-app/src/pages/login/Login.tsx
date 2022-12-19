import React, { useEffect } from 'react';
import { Alert, Button, Checkbox, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../redux/actions/userActions';
import { Link, useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    //@ts-ignore
    dispatch(userLogin(values));
  };

  const onFinishFailed = (errorInfo: any) => {};
  const { userInfo, error } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/feed');
    }
  }, [navigate, userInfo]);

  const errorMessage = 'Invalid credentials';

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
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <p>
          Don't have an account yet? <Link to={'/register'}>Create one</Link>
        </p>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        {error && <Alert message={errorMessage} type="error"></Alert>}
      </Form>
    </div>
  );
};
