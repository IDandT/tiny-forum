import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import LoginPage from './routes/LoginPage.jsx'
import RegisterPage from './routes/RegisterPage.jsx'
import ForumPage from './routes/ForumPage.jsx'
import ThreadPage from './routes/ThreadPage.jsx'
import ProfilePage from './routes/ProfilePage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/home',
    element: <ForumPage />,
  },
  {
    path: '/thread/:idthread/:title',
    element: <ThreadPage />,
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
