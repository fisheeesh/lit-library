import { useState } from "react"
import LogIn from '../components/auth/LogIn'
import Register from "../components/auth/Register"
import BrowserWarningModal from '../components/modal/BrowserWarningModal'
import useTheme from "../hooks/useTheme"
import Google from '../assets/google.png'
import useGoogle from "../hooks/useGoogle"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function Welcome() {
    const [showLogIn, setShowLogIn] = useState(true)
    const [showBrowserWarning, setShowBrowserWarning] = useState(false)
    const { isDark } = useTheme()
    const navigate = useNavigate()
    const { signInWithGoogle } = useGoogle()

    const isInAppBrowser = () => {
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        //* Enhanced detection for more in-app browsers
        return /LinkedIn|Twitter|Line|WeChat|Snapchat|TikTok/.test(ua) &&
            /iPhone|iPad|iPod|Android/i.test(ua);
    };

    const handleGoogleLogIn = async () => {
        if (isInAppBrowser()) {
            setShowBrowserWarning(true)
            return;
        }

        try {
            let user = await signInWithGoogle()

            //* Redirect to home page after login
            if (user) {
                navigate('/')
            }
        } catch (error) {
            console.error('Google sign-in failed:', error);
            alert('Sign-in failed. Please try again.');
        }
    }

    const copyCurrentUrl = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            toast.success('URL copied to clipboard!')
        }).catch(() => {
            //* Fallback for older browsers
            const textArea = document.createElement('textarea')
            textArea.value = window.location.href
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
            toast.success('URL copied to clipboard!')
        })
    }

    return (
        <div className="pb-3">
            {/* Browser Warning Modal */}
            <BrowserWarningModal
                isOpen={showBrowserWarning}
                onClose={() => setShowBrowserWarning(false)}
            />

            {/* Show warning banner for in-app browsers */}
            {isInAppBrowser() && (
                <div className="p-3 mx-4 mb-4 bg-yellow-100 border border-yellow-400 rounded-lg">
                    <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> If you are accessing from LinkedIn mobile app, please copy the URL and open in external browsers(Chrome or Safari) for full functionality.
                    </p>
                    <button
                        onClick={copyCurrentUrl}
                        className="px-3 py-1 mt-2 text-sm text-white bg-yellow-600 rounded hover:bg-yellow-700"
                    >
                        Copy URL
                    </button>
                </div>
            )}

            {showLogIn && <LogIn />}
            {!showLogIn && <Register />}

            <div className={`text-lg text-center ${isDark ? 'text-white' : ''}`}>
                {showLogIn ? 'Not a member yet? ' : 'Already have an account? '}
                <button
                    onClick={() => setShowLogIn(prevState => !prevState)}
                    className="text-secondary cus-btn"
                >
                    {showLogIn ? 'Create an account.' : 'LogIn.'}
                </button>
            </div>

            {showLogIn && (
                <div>
                    <div className="flex items-center justify-center w-[300px] mx-auto my-4">
                        <div className="flex-1 border-t-2 border-gray-300"></div>
                        <span className="mx-3 text-gray-700">or</span>
                        <div className="flex-1 border-t-2 border-gray-300"></div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div
                            onClick={handleGoogleLogIn}
                            className={`p-3 transition duration-500 ease-in-out bg-white border rounded-lg shadow-xl cursor-pointer hover:scale-105 ${isInAppBrowser() ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            <div className="flex items-center px-3 py-2">
                                <img src={Google} width="30" alt="Google" className="img-fluid" />
                                <span className="ml-3 font-bold text-gray-700">
                                    {isInAppBrowser() ? 'Google Sign-In (Not Available)' : 'Continue with Google'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}