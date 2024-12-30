import { useState } from "react"
import { auth } from "../firebase/config"
import { signInWithEmailAndPassword } from "firebase/auth"

const useSignIn = () => {
    const [error, setErrror] = useState(null)
    const [loading, setLoading] = useState(false)

    const logInAccount = async (email, password) => {
        try {
            setErrror(null)
            setLoading(true)
            let res = await signInWithEmailAndPassword(auth, email, password)
            if (!res) throw new Error('Something went wrong.!')
            setLoading(false)
            setErrror(null)
            return res
        }
        catch (err) {
            console.log(err.message)
            setErrror(err.message)
            setLoading(false)
        }
    }

    return { logInAccount, error, loading }
}

export default useSignIn