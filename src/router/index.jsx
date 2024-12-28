import {
    createBrowserRouter
} from "react-router-dom";
import Layout from "../pages/layout/Layout";
import Home from '../pages/Home'
import BookForm from '../pages/BookForm'
import BookDetail from '../pages/BookDetail'
import NotFound from '../pages/NotFound'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/create',
                element: <BookForm />
            },
            {
                path: '/books/:id',
                element: <BookDetail />
            },
            {
                path: '/edit/:id',
                element: <BookForm />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default router