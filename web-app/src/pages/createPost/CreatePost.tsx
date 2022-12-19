import React from 'react';
import { Alert, Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../redux/actions/postActions';
import styles from './createPost.module.css';
import { RequestStatus } from '../../types';

export const CreatePost: React.FC = () => {
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    //@ts-ignore
    dispatch(createPost({ ...values, createdBy: userInfo._id }));
  };

  const onFinishFailed = (errorInfo: any) => {};
  const { userInfo } = useSelector((state: any) => state.user);
  const { createPostStatus } = useSelector((state: any) => state.posts);

  return (
    <div className="container">
      <div className={styles.createPostForm}>
        <Form
          name="basic"
          labelWrap
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="title"
            name="title"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="body"
            name="body"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: 'Please enter a body' }]}
          >
            <Input.TextArea />
          </Form.Item>

          {createPostStatus === RequestStatus.SUCCESSFUL && (
            <Alert message="Post submitted successfully" type="success" />
          )}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
