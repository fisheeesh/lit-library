import { useNavigate } from "react-router-dom"
import useSignOut from "../../hooks/useSignOut"
import useFirestore from "../../hooks/useFirestore"

/* eslint-disable react/prop-types */
export default function ProfileHeader({ user, isDark, books }) {
    const { logOut } = useSignOut()
    const navigate = useNavigate()

    const { getDocumentById } = useFirestore()

    const { data: userData } = getDocumentById('users', user.uid)

    const logOutUser = async () => {
        await logOut()

        // $ redirect to login page after logout
        navigate('/auth')
    }
    return (
        <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="flex justify-start col-span-3 gap-4 md:col-span-2">
                <img
                    src={user?.photoURL}
                    alt="Profile"
                    className="my-0.5 rounded-3xl w-44 h-44"
                />
                <div className="mt-2.5">
                    <h2 className="text-3xl font-bold text-primary">{user.displayName}</h2>
                    <div className="flex items-center gap-2 mt-2">
                        <span className={`material-symbols-outlined ${isDark ? 'text-white' : ''}`}>
                            mail
                        </span>
                        <h3 className={`text-md ${isDark ? 'text-white' : ''}`}>Email: {user.email}</h3>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <span className={`material-symbols-outlined ${isDark ? 'text-white' : ''}`}>
                            Schedule
                        </span>
                        <h3 className={`text-md ${isDark ? 'text-white' : ''} `}>Joined at: {userData?.created_at.toDate().toDateString()}</h3>
                    </div>

                    <button type="button" onClick={logOutUser} className="px-5 py-2.5 mt-6 text-white transition duration-1000 ease-in-out bg-red-600 rounded-full hover:bg-red-700">LogOut</button>
                </div>
            </div>

            <div className="flex flex-col col-span-3 md:justify-center md:items-center rounded-3xl md:col-span-1">
                <div className="py-10 text-center bg-secondary rounded-3xl px-7">
                    <h2 className="text-2xl text-white">{books.length}</h2>
                    <h2 className="text-2xl font-bold text-white">Books</h2>
                    <h2 className="text-2xl font-bold text-white">Uploaded</h2>
                </div>
            </div>
        </div>
    )
}
