import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useState } from "react"
import { auth } from "../firebase/config"

const useSignUp = () => {
    const [error, setErrror] = useState(null)
    const [loading, setLoading] = useState(false)

    const createAccount = async (displayName, email, password) => {
        try {
            setErrror(null)
            setLoading(true)
            let res = await createUserWithEmailAndPassword(auth, email, password)
            if (!res) throw new Error('Something went wrong.!')
            updateProfile(res.user, { displayName })
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