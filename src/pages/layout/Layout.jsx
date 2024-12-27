import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import './layout.css'

import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useRef } from "react";

export default function Layout() {
    const location = useLocation()

    const nodeRef = useRef(null)

    return (
        <>
            <Navbar />
            <SwitchTransition>
                <CSSTransition nodeRef={nodeRef} timeout={200} classNames="fade" key={location.pathname}>
                    <div ref={nodeRef} className="py-3 mx-auto max-w-7xl">
                        <Outlet />
                    </div>
                </CSSTransition>
            </SwitchTransition>

        </>
    )
}
