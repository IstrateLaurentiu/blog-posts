import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Post } from '../../../../src/core/types/Models';
import { getAllPosts } from '../../redux/actions/postActions';
import { selectAllPosts } from '../../redux/reducers/postsReducer';
import { RequestStatus } from '../../types';
import styles from './feed.module.css';
import { PostCard } from './PostCard';

export const Feed = () => {
  const dispatch = useDispatch();
  const { getAllPostsStatus, items } = useSelector(selectAllPosts);

  useEffect(() => {
    if (getAllPostsStatus === RequestStatus.IDLE) {
      //@ts-ignore
      dispatch(getAllPosts());
    }
  }, [getAllPostsStatus, dispatch]);

  const refresh = () => window.location.reload();

  if (getAllPostsStatus === RequestStatus.ERROR) {
    return (
      <p>
        There has been a problem while fetching posts. Please{' '}
        <button onClick={refresh}>Try Again</button>
      </p>
    );
  }

  if (getAllPostsStatus === RequestStatus.PENDING) {
    return <p>Fetching posts</p>;
  }

  if (getAllPostsStatus === RequestStatus.SUCCESSFUL) {
    return (
      <div className="container">
        <div className={styles.postsList}>
          <Link className={styles.createPostCTA} to={`/create-post`}>
            Create new post
          </Link>
          {items.map((post: Post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    );
  }
  return <>idle</>;
};
