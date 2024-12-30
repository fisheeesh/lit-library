import { signOut } from "firebase/auth"
import { auth } from "../firebase/config"

const useSignOut = () => {

    const logOut = async () => {
        try {
            await signOut(auth)
            console.log('User Logged Out Successfully!.')
        }
        catch (err) {
            console.log(err.message)
        }
    }

    return { logOut }
}

export default useSignOut