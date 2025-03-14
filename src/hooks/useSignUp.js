import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useState } from "react"
import { auth, db } from "../firebase/config"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import useStorage from "./useStorage"
import toast from "react-hot-toast"

const useSignUp = () => {
    const [loading, setLoading] = useState(false)

    const { uploadFileToStorage } = useStorage()

    const createAccount = async (displayName, email, password, pPic) => {
        try {
            setLoading(true)
            let res = await createUserWithEmailAndPassword(auth, email, password)
            if (!res) throw new Error('Something went wrong. Please try again.!')

            // $ upload profile pic
            if (pPic) {
                const uniquePath = `/profile_pics/${res.user.uid}/${Date.now().toString() + '_' + pPic.name}`
                const url = await uploadFileToStorage(uniquePath, pPic)
                await updateProfile(res.user, { photoURL: url })
            }
            await updateProfile(res.user, { displayName })
            
            let docRef = doc(db, 'users', res.user.uid)
            await setDoc(docRef, {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: res.user.photoURL,
                created_at: serverTimestamp(),
                hasReview: false,
                saved: [],
                favorites: []
            })

            return res
        }
        catch (err) {
            console.log(err)
            switch (err.code) {
                case 'auth/email-already-in-use':
                    toast.error('This email is already taken.')
                    break
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

    return { createAccount, loading }
}

export default useSignUp