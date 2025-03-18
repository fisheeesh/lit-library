import { useState } from "react"
import LogIn from '../components/auth/LogIn'
import Register from "../components/auth/Register"
import useTheme from "../hooks/useTheme"
import Google from '../assets/google.png'
import useGoogle from "../hooks/useGoogle"
import { useNavigate } from "react-router-dom"

export default function Welcome() {
    const [showLogIn, setShowLogIn] = useState(true)
    const { isDark } = useTheme()
    const navigate = useNavigate()
    const { signInWithGoogle } = useGoogle()

    const handleGoogleLogIn = async () => {
        let user = await signInWithGoogle()

        // $ redirect to home page after login
        if (user) {
            navigate('/')
        }
    }

    return (
        <div className="pb-3">
            {
                showLogIn && <LogIn />
            }
            {
                !showLogIn && <Register />
            }
            <div className={`text-lg text-center ${isDark ? 'text-white' : ''}`}>
                {showLogIn ? 'Not a member yet? ' : 'Already have an account? '} <button onClick={() => setShowLogIn(prevState => !prevState)} className="text-secondary cus-btn">{showLogIn ? 'Create an account.' : 'LogIn.'}</button>
            </div>
            {showLogIn && (
                <div>
                    <div className="flex items-center justify-center w-[300px] mx-auto my-4">
                        <div className="flex-1 border-t-2 border-gray-300"></div>
                        <span className="mx-3 text-gray-700">or</span>
                        <div className="flex-1 border-t-2 border-gray-300"></div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div onClick={handleGoogleLogIn} className="p-3 transition duration-500 ease-in-out bg-white border rounded-lg shadow-xl cursor-pointer hover:scale-105">
                            <div className="flex items-center px-3 py-2" >
                                <img src={Google} width="30" alt="Google" className="img-fluid" />
                                <span className="ml-3 font-bold text-gray-700">Continue with Google</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
