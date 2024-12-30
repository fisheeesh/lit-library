import {
    createBrowserRouter,
    Navigate,
    RouterProvider
} from "react-router-dom";
import Layout from "../pages/layout/Layout";
import Home from '../pages/Home'
import BookForm from '../pages/BookForm'
import BookDetail from '../pages/BookDetail'
import NotFound from '../pages/NotFound'
import Register from '../pages/auth/Register'
import LogIn from '../pages/auth/LogIn'
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
                    element: isAuthenticated ? <BookForm /> : <Navigate to='/login' />
                },
                {
                    path: '/edit/:id',
                    element: isAuthenticated ? <BookForm /> : <Navigate to='/login' />
                },
                {
                    path: '/books/:id',
                    element: <BookDetail />
                },
                {
                    path: '/register',
                    element: !isAuthenticated ? <Register /> : <Navigate to='/' />
                },
                {
                    path: '/login',
                    element: !isAuthenticated ? <LogIn /> : <Navigate to='/' />
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