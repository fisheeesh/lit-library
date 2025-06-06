import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const useGoogle = () => {
    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)

            const user = result.user;

            const docRef = doc(db, 'users', user.uid)
            const userDoc = await getDoc(docRef)

            if (userDoc.exists()) {
                return user
            }

            setDoc(docRef, {
                uid: user.uid,
                displayName: user.displayName,
                fullName: '',
                role: '',
                email: user.email,
                photoURL: user.photoURL,
                created_at: serverTimestamp(),
                hasReview: false,
                birthday: '',
                location: '',
                facebookURL: '',
                instagramURL: '',
                saved: [],
                favorites: [],
                upvotedCmts: [],
                photoName: ''
            }, { merge: true })

            return user

        } catch (err) {
            console.log(err)
            switch (err.code) {
                case 'auth/popup-closed-by-user':
                    toast.error('Sign-in was canceled. Please try again.')
                    break
                case 'auth/cancelled-popup-request':
                    toast.error('Sign-in request was canceled. Please try again.')
                    break
                case 'auth/popup-blocked':
                    toast.error('Your browser blocked the sign-in popup. Enable popups and try again.')
                    break
                case 'auth/account-exists-with-different-credential':
                    toast.error('This email is already linked to another sign-in method.')
                    break
                case 'auth/credential-already-in-use':
                    toast.error('This Google account is already linked to another user.')
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
                case 'auth/timeout':
                    toast.error('The sign-in request took too long. Try again later.')
                    break
                default:
                    toast.error('Something went wrong. Please try again.!')
            }
        }
    }

    return { signInWithGoogle }
}

export default useGoogle