/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import useSignOut from "../../hooks/useSignOut"
import useFirestore from "../../hooks/useFirestore"
import useTheme from "../../hooks/useTheme"
import useAuth from "../../hooks/useAuth"
import defaultProfile from '../../assets/default_profile.jpg'
import { FilterButtons } from "../buttons/FilterButtons"
import Disclaimer from "../disclaimer/Disclaimer"

export default function ProfileHeader({ uId, filter, setFilter }) {
    const navigate = useNavigate()

    const { logOut } = useSignOut()
    const { getDocumentById, getAllDocuments } = useFirestore()

    const { user, DEVELOPER_UID } = useAuth()
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
                <div className="flex justify-start col-span-3 gap-4 md:col-span-2">
                    <img
                        src={userData?.photoURL || defaultProfile}
                        alt="Profile"
                        className={`my-0.5 rounded-3xl w-40 h-40 md:w-44 md:h-44 ${isDark ? 'border border-primary' : 'border border-gray-300'}`}
                    />
                    <div className="mt-1 md:mt-0">
                        <div className="flex items-center gap-1">
                            <h2 className="text-xl font-bold md:text-3xl text-primary user-name">{userData?.displayName || 'User'}</h2>
                            {/* Show developer badge if the user is the developer */}
                            {userData?.uid === DEVELOPER_UID && (
                                <div className="relative mt-1 md:mt-2 group">
                                    <span className="text-xs md:text-[16px] cursor-pointer text-secondary material-symbols-outlined">check_circle</span>
                                    <span className="absolute px-3 py-1 text-white transition-all rounded-md opacity-0 pointer-events-none -left-20 bg-dark top-full group-hover:opacity-100 group-hover:translate-y-2 whitespace-nowrap">
                                        Developer of LitLibrary
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`material-symbols-outlined md:text-xl text-[18px] ${isDark ? 'text-white' : ''}`}>mail</span>
                            <div className={`md:text-base flex items-center gap-1 text-sm ${isDark ? 'text-white' : ''}`}>
                                <span className="display_text">Email: </span>
                                <span>{userData?.email || 'name@gmail.com'}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`material-symbols-outlined md:text-xl text-[18px] ${isDark ? 'text-white' : ''}`}>Schedule</span>
                            <div className={`flex items-center gap-1 md:text-base text-sm ${isDark ? 'text-white' : ''}`}>
                                <span className="display_text">Joined at: </span>
                                <span>{userData?.created_at?.toDate()?.toDateString() || 'N/A'}</span>
                            </div>
                        </div>

                        {/* Logout button for the current user */}
                        {currnetUser &&
                            (<button
                                type="button"
                                onClick={logOutUser}
                                className={`${userData?.displayName.length > 20 ? 'logout-btn' : ''} md:px-5 md:py-2.5 mt-[32px] px-5 py-2.5  text-white transition duration-1000 ease-in-out bg-red-600 rounded-full hover:bg-red-700`}
                            >
                                LogOut
                            </button>)
                        }
                    </div>
                </div>

                {/* User's uploaded books count */}
                <div className="flex flex-col col-span-3 md:justify-center md:items-center rounded-3xl md:col-span-1">
                    <div className="py-6 text-center md:py-10 bg-secondary rounded-3xl px-7">
                        <h2 className="text-xl text-white md:text-2xl">{books ? books.length : 0}</h2>
                        <h2 className="text-xl font-bold text-white md:text-2xl">Blogs</h2>
                        <h2 className="text-xl font-bold text-white md:text-2xl">Uploaded</h2>
                    </div>
                </div>
            </div>

            {/* Disclaimer for the developer account */}
            {userData?.uid === 'Uz5ZUht55mcYnLC64sRYfvuY9ab2' && (
                <Disclaimer />
            )}

            <div className="flex items-center justify-between mt-5 mb-3">
                {/* Display library title based on the user */}
                <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${isDark ? 'text-light' : 'text-dark'}`}>
                    {currnetUser ? 'My ' : `${userData?.displayName || 'User'}'s `}<span className="text-primary">Library</span>
                </h1>
                {currnetUser && <FilterButtons filter={filter} setFilter={setFilter} isDark={isDark} />}
            </div>

            <hr className={`${isDark ? 'border-primary' : 'border-gray-200'}`} />
        </div>
    );
}
