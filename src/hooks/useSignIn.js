import { useState } from "react"
import { auth } from "../firebase/config"
import { signInWithEmailAndPassword } from "firebase/auth"
import toast from "react-hot-toast"

const useSignIn = () => {
    const [loading, setLoading] = useState(false)

    const logInAccount = async (email, password) => {
        try {
            setLoading(true)
            let res = await signInWithEmailAndPassword(auth, email, password)
            if (!res) throw new Error('Something went wrong. Please try again.!')
            return res
        }
        catch (err) {
            console.log(err)
            switch (err.code) {
                case 'auth/invalid-credential':
                    toast.error('Invalid credentials. Please try again.')
                    break
                case 'auth/user-not-found':
                    toast.error('User not found. Please create an account.')
                    break
                case 'auth/wrong-password':
                    toast.error('Incorrect password. Please try again.')
                    break
                case 'auth/too-many-requests':
                    toast.error('Too many requests. Please try again later.')
                    break
                case 'auth/network-request-failed':
                    toast.error('Network error. Please check your internet connection and try again.')
                    break
                case 'operation-not-allowed':
                    toast.error('Google Sign-In is not enabled. Contact the administrator.')
                    break
                case 'auth/user-disabled':
                    toast.error('This account has been disabled. Contact support.')
                    break
                default:
                    toast.error('Something went wrong. Please try again.!')
            }
        }
        finally {
            setLoading(false)
        }
    }

    return { logInAccount, loading }
}

export default useSignIn