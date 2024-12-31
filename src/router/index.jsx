import {
    createBrowserRouter,
    Navigate,
    RouterProvider
} from "react-router-dom";
import Layout from "../pages/layout/Layout";
import Home from '../pages/Home'
import BookForm from '../pages/BookForm'
import BookDetail from '../pages/BookDetail'
import Profile from '../pages/Profile'
import NotFound from '../pages/NotFound'
import Welcome from '../pages/Welcome'
import useAuth from "../hooks/useAuth";

export default function Router() {
    const { authReady, user } = useAuth()

    const isAuthenticated = Boolean(user)

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: '',
                    element: <Home />
                },
                {
                    path: '/create',
                    element: isAuthenticated ? <BookForm /> : <Navigate to='/auth' />
                },
                {
                    path: '/edit/:id',
                    element: isAuthenticated ? <BookForm /> : <Navigate to='/auth' />
                },
                {
                    path: '/profile',
                    element: isAuthenticated ? <Profile /> : <Navigate to='/auth' />
                },
                {
                    path: '/books/:id',
                    element: <BookDetail />
                },
                {
                    path: '/auth',
                    element: !isAuthenticated ? <Welcome /> : <Navigate to='/' />
                }
            ]
        },
        {
            path: '*',
            element: <NotFound />
        }
    ]);
    return (
        authReady && <RouterProvider router={router} />
    )
}