import {
    createBrowserRouter
} from "react-router-dom";
import Layout from "../pages/layout/Layout";
import Home from '../pages/Home'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    },
]);

export default router