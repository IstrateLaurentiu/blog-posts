import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'antd/dist/reset.css';
import { Login } from './pages/login/Login';
import './App.css';
import { PrivateRoute } from './routes/PrivateRoute';
import { Register } from './pages/register/Register';
import { useDispatch } from 'react-redux';
import { useGetUserDetailsQuery } from './services/userService';
import { useEffect } from 'react';
import { setCredentials } from './redux/reducers/userReducers';
import { Feed } from './pages/feed/Feed';
import { CreatePost } from './pages/createPost/CreatePost';
import { PostPage } from './pages/post/PostPage';
import { Navbar } from './layout/navbar/Navbar';

function App() {
  const dispatch = useDispatch();

  const { data, isFetching, isError } = useGetUserDetailsQuery('userDetails', {
    pollingInterval: 1800000, // 30mins
  });

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    } else if (isError) {
      dispatch(setCredentials(null));
    }
  }, [data, isError, dispatch]);

  if (isFetching) {
    return <div>Fetching user...</div>;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
