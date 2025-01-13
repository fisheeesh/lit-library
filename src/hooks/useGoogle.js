import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import useFirestore from './useFirestore'

const useGoogle = () => {

    const { getAllDocuments } = useFirestore()

    const { data: users } = getAllDocuments('users')

    const [error, setError] = useState(null)
    const signInWithGoogle = async () => {
        try {
            setError(null)
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)

            const user = result.user;

            if (users.find(u => u.uid === user.uid)) {
                return user
            }

            let docRef = doc(db, 'users', user.uid)
            setDoc(docRef, {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                created_at: serverTimestamp(),
                saved: [],
                favorites: []
            })

            setError(null)
            return user

        } catch (error) {
            setError(error.message)
            console.error('Error signing in with Google:', error.message);
        }
    }

    return { signInWithGoogle, error }
}

export default useGoogle