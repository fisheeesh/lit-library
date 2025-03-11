import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import './layout.css'

import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useEffect, useRef, useState } from "react";
import useTheme from "../../hooks/useTheme";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from "react-top-loading-bar";

export default function Layout() {
    const location = useLocation()

    const nodeRef = useRef(null)
    const [progress, setProgress] = useState(0);

    const { isDark } = useTheme()

    useEffect(() => {
        if (isDark) {
            document.body.classList.add('bg-dbg')
        }
        else {
            document.body.classList.remove('bg-dbg')
        }
    }, [isDark])

    useEffect(() => {
        setProgress(30);
        const timer = setTimeout(() => setProgress(100), 200);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <div className={`${isDark ? 'bg-dbg' : ''}`}>
            <Navbar />
            <SwitchTransition>
                <CSSTransition nodeRef={nodeRef} timeout={200} classNames="fade" key={location.pathname}>
                    <div ref={nodeRef} className="w-full pt-3 mt-16">
                        <LoadingBar color="#cc2973" progress={progress} onLoaderFinished={() => setProgress(0)} />
                        <Outlet />
                    </div>
                </CSSTransition>
            </SwitchTransition>
            <ToastContainer />
        </div>
    )
}
