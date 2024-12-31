import { useState } from "react"
import LogIn from '../components/auth/LogIn'
import Register from "../components/auth/Register"
import useTheme from "../hooks/useTheme"

export default function Welcome() {
    const [showLogIn, setShowLogIn] = useState(true)
    const { isDark } = useTheme()

    return (
        <>
            {
                showLogIn && <LogIn />
            }
            {
                !showLogIn && <Register />
            }
            <div className={`text-lg text-center ${isDark ? 'text-white' : ''}`}>
                {showLogIn ? 'Not a member yet? ' : 'Already have an account? '} <button onClick={() => setShowLogIn(prevState => !prevState)} className="text-secondary cus-btn">{showLogIn ? 'Create an account.' : 'LogIn.'}</button>
            </div>
        </>
    )
}
