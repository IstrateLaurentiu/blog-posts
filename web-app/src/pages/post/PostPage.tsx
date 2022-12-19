import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../redux/actions/postActions';
import { RequestStatus } from '../../types';

export const PostPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentPost = useSelector((state: any) => state.posts.currentPost);
  const getCurrentPostStatus = useSelector(
    (state: any) => state.posts.getCurrentPostStatus,
  );
  useEffect(() => {
    if (!currentPost && getCurrentPostStatus === RequestStatus.IDLE) {
      //@ts-ignore
      dispatch(getPostById(id));
    }
  }, [currentPost, dispatch, getCurrentPostStatus, id]);

  if (!currentPost) {
    return <></>;
  }
  return (
    <div className="container">
      <span>Created by: {currentPost.createdBy.fullname}</span>
      <h2>{currentPost.title}</h2>
      <p>{currentPost.body}</p>
      <p>{currentPost.viewsCounter} views</p>
    </div>
  );
};
