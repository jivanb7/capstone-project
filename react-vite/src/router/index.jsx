import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Post from '../components/Post/Post'
import Layout from './Layout';
import PostDetail from '../components/PostDetail/PostDetail';
import Profile from "../components/Profile/Profile"
import UserCommentsPage from '../components/UserCommentsPage/UserCommentsPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Post />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "post/:postId",
        element: <PostDetail />
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "comments/current",
        element: <UserCommentsPage />
      },
    ],
  },
]);