import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useState } from "react"
import { auth, db } from "../firebase/config"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import useStorage from "./useStorage"

const useSignUp = () => {
    const [error, setErrror] = useState(null)
    const [loading, setLoading] = useState(false)

    const { uploadFileToStorage } = useStorage()

    const createAccount = async (displayName, email, password, pPic) => {
        try {
            setErrror(null)
            setLoading(true)
            let res = await createUserWithEmailAndPassword(auth, email, password)
            if (!res) throw new Error('Something went wrong.!')

            // $ upload profile pic
            if (pPic) {
                const uniquePath = `/profile_pics/${res.user.uid}/${Date.now().toString() + '_' + pPic.name}`
                const url = await uploadFileToStorage(uniquePath, pPic)
                await updateProfile(res.user, { displayName, photoURL: url })
            }

            let docRef = doc(db, 'users', res.user.uid)
            await setDoc(docRef, {
                uid: res.user.uid,
                displayName: displayName,
                email: email,
                photoURL: res.user.photoURL,
                created_at: serverTimestamp()
            })

            setLoading(false)
            setErrror(null)
            return res
        }
        catch (err) {
            console.log(err.message)
            setLoading(false)
            setErrror(err.message)
        }
    }

    return { createAccount, error, loading }
}

export default useSignUp