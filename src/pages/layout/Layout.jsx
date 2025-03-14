import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import './layout.css'
import { Toaster } from "react-hot-toast";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useEffect, useRef, useState } from "react";
import useTheme from "../../hooks/useTheme";
import LoadingBar from "react-top-loading-bar";

export default function Layout() {
    const location = useLocation()

    const nodeRef = useRef(null)
    const [progress, setProgress] = useState(0);

    const { isDark } = useTheme()
    const customColor = !isDark ? "#4555d2" : "#cc2973"

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
                        <LoadingBar color={customColor} progress={progress} onLoaderFinished={() => setProgress(0)} />
                        <Outlet />
                    </div>
                </CSSTransition>
            </SwitchTransition>
            <Toaster position="top-center" toastOptions={{
                duration: 3000,
                removeDelay: 1000,
                style: {
                    alignContent: "center",
                    background: isDark ? '#333' : "#ffffff",
                    color: isDark ? "#ffffff" : "#333",
                    padding: "12px",
                    borderRadius: "8px",
                },
            }} />
        </div>
    )
}
