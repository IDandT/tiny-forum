import {
  createBrowserRouter,
  RouterProvider,
  // Outlet,
  Navigate,
} from 'react-router-dom'

import ForumPage from './routes/ForumPage.jsx'
import ThreadPage from './routes/ThreadPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/home" />,
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
