import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import { createBrowserRouter } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import NonAuthRoute from "./components/NonAuthRoute";
import EditPost from "./pages/EditPost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <NonAuthRoute>
            <Login />
          </NonAuthRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <NonAuthRoute>
            <Register />
          </NonAuthRoute>
        ),
      },
      {
        path: "/post",
        element: (
          <ProtectedRoute>
            <Post />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/post/:id/edit",
        element: (
          <ProtectedRoute>
            <EditPost />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
