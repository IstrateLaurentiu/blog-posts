import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Post } from '../../../../src/core/types/Models';
import { getPostById } from '../../redux/actions/postActions';
import styles from './feed.module.css';

export const PostCard = ({ post }: { post: Post }) => {
  const date = new Date(post.createdDate).toDateString();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBtnClick = (id: any) => {
    //@ts-ignore
    dispatch(getPostById(post._id));
    navigate(`/post/${post._id}`);
  };
  return (
    <div className={styles.postCard}>
      <div className={styles.postHeader}>
        <span>Created by: {post.createdBy.fullname}</span>
        <span>{date}</span>
      </div>
      <h2 className={styles.postTitle}>{post.title}</h2>
      <p>{post.body}</p>
      <div className={styles.postFooter}>
        <Button onClick={handleBtnClick}>Keep reading</Button>
        <p>{post.viewsCounter} views</p>
      </div>
    </div>
  );
};
