/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import useSignOut from "../../hooks/useSignOut"
import useFirestore from "../../hooks/useFirestore"
import useTheme from "../../hooks/useTheme"
import useAuth from "../../hooks/useAuth"
import Disclaimer from "../disclaimer/Disclaimer"
import UserInfo from "./UserInfo"
import UserActivity from "./UserActivity"
import Title from "./Title"

export default function ProfileHeader({ uId, filter, setFilter }) {
    const navigate = useNavigate()

    const { logOut } = useSignOut()
    const { getDocumentById, getAllDocuments } = useFirestore()

    const { user } = useAuth()
    const { isDark } = useTheme()

    const { data: userData } = getDocumentById('users', uId)
    const { data: books } = getAllDocuments('books', ['uid', '==', uId])
    const currnetUser = user?.uid === userData?.uid

    const logOutUser = async () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");

        if (confirmLogout) {
            await logOut();
            navigate('/auth');
        } else {
            return;
        }
    };

    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-3 gap-4">
                {/* User profile information */}
                <UserInfo currnetUser={currnetUser} userData={userData} onLogOut={logOutUser} />

                {/* User's uploaded books count */}
                <UserActivity books={books} />
            </div>

            {/* Disclaimer for the developer account */}
            {userData?.uid === 'Uz5ZUht55mcYnLC64sRYfvuY9ab2' && (
                <Disclaimer />
            )}

            {/* Display library title based on the user */}
            <Title currnetUser={currnetUser} filter={filter} setFilter={setFilter} userData={userData} />

            <hr className={`${isDark ? 'border-primary' : 'border-gray-200'}`} />
        </div>
    );
}
