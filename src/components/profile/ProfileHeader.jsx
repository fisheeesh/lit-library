/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import useSignOut from "../../hooks/useSignOut"
import useFirestore from "../../hooks/useFirestore"
import useTheme from "../../hooks/useTheme"
import useAuth from "../../hooks/useAuth"
import defaultProfile from '../../assets/default_profile.jpg'

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
        await logOut()

        // $ redirect to login page after logout
        navigate('/auth')
    }

    const followUser = (e) => {
        e.preventDefault()

        if (user) {
            alert('Will implemete soom!')
        }
        else {
            navigate('/auth')
        }
    }

    return (
        <div className="px-5 mb-4 md:px-0">
            <div className="grid grid-cols-3 gap-4 mt-6 ">
                <div className="flex justify-start col-span-3 gap-4 md:col-span-2">
                    <img
                        src={userData?.photoURL || defaultProfile}
                        alt="Profile"
                        className={`my-0.5 rounded-3xl w-44 h-44 ${isDark ? 'border border-primary' : ''}`}
                    />
                    <div className="mt-2.5">
                        <div className="flex items-center gap-1">
                            <h2 className="text-3xl font-bold text-primary">{userData?.displayName || 'User'}</h2>
                            {userData?.uid === '1Ojc7pA10tVCpAo5bHxXVu5PHRA2' && <div className="relative mt-2 group">
                                <span className="cursor-pointer text-secondary material-symbols-outlined">
                                    check_circle
                                </span>
                                <span className="absolute px-3 py-1 text-white transition-all rounded-md opacity-0 pointer-events-none -left-20 bg-dark top-full group-hover:opacity-100 group-hover:translate-y-2 whitespace-nowrap">
                                    Developer of LitLibrary
                                </span>
                            </div>}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <span className={`material-symbols-outlined ${isDark ? 'text-white' : ''}`}>
                                mail
                            </span>
                            <h3 className={`text-md ${isDark ? 'text-white' : ''}`}>Email: {userData?.email || 'name@gmail.com'} </h3>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <span className={`material-symbols-outlined ${isDark ? 'text-white' : ''}`}>
                                Schedule
                            </span>
                            <h3 className={`text-md ${isDark ? 'text-white' : ''} `}>Joined at: {userData?.created_at.toDate().toDateString() || 'N/A'}</h3>
                        </div>

                        {currnetUser ?
                            (<button type="button" onClick={logOutUser} className="px-5 py-2.5 mt-6 text-white transition duration-1000 ease-in-out bg-red-600 rounded-full hover:bg-red-700">
                                LogOut
                            </button>) :
                            (
                                <button type="button" onClick={followUser} className="px-5 py-2.5 mt-6 text-white transition duration-1000 ease-in-out bg-primary rounded-full hover:bg-indigo-700">
                                    Follow
                                </button>
                            )
                        }
                    </div>
                </div>

                <div className="flex flex-col col-span-3 md:justify-center md:items-center rounded-3xl md:col-span-1">
                    <div className="py-10 text-center bg-secondary rounded-3xl px-7">
                        <h2 className="text-2xl text-white">{books.length}</h2>
                        <h2 className="text-2xl font-bold text-white">Blogs</h2>
                        <h2 className="text-2xl font-bold text-white">Uploaded</h2>
                    </div>
                </div>
            </div>
            {userData?.uid === 'Uz5ZUht55mcYnLC64sRYfvuY9ab2' && <div className={`flex border-2 flex-col justify-center w-full p-4 mt-5 text-center rounded-lg ${isDark ? ' text-light border-primary' : ' text-dark border-dark'}`}>
                <h1 className="mb-2 text-3xl font-bold tracking-wide text-red-500">Disclaimer</h1>
                <p className="mb-4 text-lg leading-relaxed tracking-wide">
                    We do not own the content posted by this account, and this is not the official Creative Coder Myanmar account. The blogs shared here are for informational purposes only.
                </p>
                <p className="text-lg leading-relaxed tracking-wide">
                    We encourage you to explore and enjoy their fantastic blogs and tricks directly on their official platform <a target="_blank" href="https://creativecodermm.com/" className="text-blue-400 underline">here</a>.
                </p>
            </div>}
            <div className="flex items-center justify-between mt-5 mb-3">
                <h1 className={` text-3xl font-bold ${isDark ? 'text-light' : 'text-dark'}`}>{currnetUser ? 'My ' : `${userData?.displayName}` + '\'s ' || 'User' + '\'s '}<span className="text-primary">Collection</span> 📚</h1>
                {currnetUser && <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setFilter('uploaded')} className={`${filter === 'uploaded' ? 'bg-primary text-light' : ''} ${isDark ? 'text-light' : 'text-dark'} px-3 py-2 rounded-lg`}>Uploaded</button>
                    <button type="button" onClick={() => setFilter('likes')} className={`${filter === 'likes' ? 'bg-primary text-light' : ''} ${isDark ? 'text-light' : 'text-dark'} px-3 py-2 rounded-lg`}>Likes</button>
                    <button type="button" onClick={() => setFilter('saved')} className={`${filter === 'saved' ? 'bg-primary text-light' : ''} ${isDark ? 'text-light' : 'text-dark'} px-3 py-2 rounded-lg`}>Saved</button>
                </div>}
            </div>
            <hr className={`${isDark ? 'border-primary' : 'border-gray-200'}`} />
        </div>
    )
}
