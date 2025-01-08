import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import './layout.css'

import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useEffect, useRef } from "react";
import useTheme from "../../hooks/useTheme";

export default function Layout() {
    const location = useLocation()

    const nodeRef = useRef(null)

    const { isDark } = useTheme()

    useEffect(() => {
        if (isDark) {
            document.body.classList.add('bg-dbg')
        }
        else {
            document.body.classList.remove('bg-dbg')
        }
    }, [isDark])

    return (
        <div className={`${isDark ? 'bg-dbg' : ''}`}>
            <Navbar />
            <SwitchTransition>
                <CSSTransition nodeRef={nodeRef} timeout={200} classNames="fade" key={location.pathname}>
                    <div ref={nodeRef} className="w-full py-3 mt-16">
                        <Outlet />
                    </div>
                </CSSTransition>
            </SwitchTransition>
            <h3 className="mt-6 mb-3 text-sm text-center text-gray-500">Copyright © 2025 Lit-Library. All rights reserved.</h3>
        </div>
    )
}
