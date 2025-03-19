import {
    createBrowserRouter,
    Navigate,
    RouterProvider
} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { lazy, Suspense } from "react";
import { BeatLoader } from "react-spinners";
import useTheme from "../hooks/useTheme";

const Layout = lazy(() => import('../pages/layout/Layout'))
const Home = lazy(() => import('../pages/Home'))
const BookForm = lazy(() => import('../pages/BookForm'))
const BookDetail = lazy(() => import('../pages/BookDetail'))
const AllBooks = lazy(() => import('../pages/AllBooks'))
const Profile = lazy(() => import('../pages/Profile'))
const NotFound = lazy(() => import('../pages/error/NotFound'))
const Welcome = lazy(() => import('../pages/Welcome'))
const ComingSoon = lazy(() => import('../pages/ComingSoon'))
const Test = lazy(() => import('../pages/Test'))
const ErorrElement = lazy(() => import('../pages/error/ErorrElement'))

export default function Router() {
    const { authReady, user } = useAuth()
    const { isDark } = useTheme()

    const customColor = !isDark ? "#4555d2" : "#cc2973"

    const isAuthenticated = Boolean(user)

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            errorElement: <ErorrElement />,
            children: [
                {
                    path: '',
                    element: <Home />
                },
                {
                    path: '/create',
                    element: isAuthenticated ? <BookForm /> : <Navigate to='/auth' replace />
                },
                {
                    path: '/edit/:id',
                    element: isAuthenticated ? <BookForm /> : <Navigate to='/auth' replace />
                },
                {
                    path: '/profile/:id',
                    element: <Profile />
                },
                {
                    path: '/blogs/:id',
                    element: <BookDetail />
                },
                {
                    path: '/blogs',
                    element: <AllBooks />
                },
                {
                    path: '/auth',
                    element: !isAuthenticated ? <Welcome /> : <Navigate to='/' />
                },
                {
                    path: '/test',
                    element: <Test />
                }
            ]
        },
        {
            path: '/coming-soon',
            element: <ComingSoon />
        },
        {
            path: '*',
            element: <NotFound />
        }
    ]);
    return (
        authReady &&
        <Suspense fallback={<div className={`my-56 flex items-center justify-center`}>
            <BeatLoader width={"100px"} height={"5px"} color={customColor} />
        </div>}>
            <RouterProvider router={router} />
        </Suspense>
    )
}

//? before
// 1881 modules transformed.
// dist/index.html                               0.62 kB │ gzip:   0.40 kB
// dist/assets/favicon-zPhBgo3k.png              1.52 kB
// dist/assets/google-Bp_336oh.png              20.87 kB
// dist/assets/default_profile-C5lYpRsV.jpg     32.64 kB
// dist/assets/details-1-BL_mxXkn.png           67.72 kB
// dist/assets/decoration-star-DPrktyd9.svg    105.18 kB │ gzip:  29.47 kB
// dist/assets/header-CFILRup6.png             117.48 kB
// dist/assets/index-Lzza-ewZ.css               44.37 kB │ gzip:  10.30 kB
// dist/assets/index-DolsCRDU.js             1,617.81 kB │ gzip: 388.31 kB

//? after
// ✓ 1882 modules transformed.
// dist/index.html                             0.62 kB │ gzip:   0.41 kB
// dist/assets/favicon-zPhBgo3k.png            1.52 kB
// dist/assets/google-Bp_336oh.png            20.87 kB
// dist/assets/default_profile-C5lYpRsV.jpg   32.64 kB
// dist/assets/details-1-BL_mxXkn.png         67.72 kB
// dist/assets/decoration-star-DPrktyd9.svg  105.18 kB │ gzip:  29.47 kB
// dist/assets/header-CFILRup6.png           117.48 kB
// dist/assets/Layout-C8bW8wLx.css             0.15 kB │ gzip:   0.09 kB
// dist/assets/Home-vHIubPVI.css               8.01 kB │ gzip:   3.23 kB
// dist/assets/index-CN2JA1nf.css             36.22 kB │ gzip:   7.12 kB
// dist/assets/favicon-Brv4CtJc.js             0.06 kB │ gzip:   0.08 kB
// dist/assets/default_profile-Ddf8BBhq.js     0.06 kB │ gzip:   0.08 kB
// dist/assets/useStorage-CpgDONfo.js          0.23 kB │ gzip:   0.19 kB
// dist/assets/useKey-BwSB7ouj.js              0.25 kB │ gzip:   0.19 kB
// dist/assets/createLucideIcon-3NijZQB6.js    1.58 kB │ gzip:   0.66 kB
// dist/assets/Test-iOHH8jyO.js                1.72 kB │ gzip:   0.94 kB
// dist/assets/SingleBook-CFgQVqjm.js          2.23 kB │ gzip:   1.03 kB
// dist/assets/ScrollTopBtn-ZSYv528g.js        2.31 kB │ gzip:   1.54 kB
// dist/assets/index-t-8fIf1D.js               3.34 kB │ gzip:   1.48 kB
// dist/assets/iconBase-DkHak4wC.js            3.55 kB │ gzip:   1.62 kB
// dist/assets/AllBooks-CHgyKW6s.js            4.13 kB │ gzip:   1.87 kB
// dist/assets/Profile-Ds9Wmizo.js             8.39 kB │ gzip:   2.68 kB
// dist/assets/BookForm-Gn_1tVsD.js            9.30 kB │ gzip:   2.82 kB
// dist/assets/Welcome-BXVSySFz.js            12.97 kB │ gzip:   3.07 kB
// dist/assets/index-DDYlop55.js              13.15 kB │ gzip:   5.30 kB
// dist/assets/cn-BGeKnM1B.js                 21.89 kB │ gzip:   7.33 kB
// dist/assets/BookDetail-CWXIA7zu.js         38.31 kB │ gzip:  15.65 kB
// dist/assets/moment-C5S46NFB.js             60.81 kB │ gzip:  19.58 kB
// dist/assets/Layout-BkQ-_l9R.js             72.53 kB │ gzip:  25.86 kB
// dist/assets/zod-CTgrHgp1.js                85.22 kB │ gzip:  23.64 kB
// dist/assets/Home-B9Yh_mpJ.js              121.11 kB │ gzip:  37.26 kB
// dist/assets/NotFound-CuIj2srv.js          429.81 kB │ gzip:  52.49 kB
// dist/assets/index-DG7zfKIs.js             726.24 kB │ gzip: 191.29 kB