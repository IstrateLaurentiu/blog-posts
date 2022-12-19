import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = () => {
  const { userInfo, loading } = useSelector((state: any) => state.user);

  if (loading) {
    return <></>;
  }

  return userInfo ? <Outlet /> : <Navigate to="/login" />;
};
