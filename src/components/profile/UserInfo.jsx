/* eslint-disable react/prop-types */
// import { PenBoxIcon } from 'lucide-react'
import defaultProfile from '../../assets/default_profile.jpg'
import useAuth from '../../hooks/useAuth'
import useTheme from '../../hooks/useTheme'
// import { useState } from 'react'
// import UserProfileEditModal from '../modal/UserProfileEditModal'
// import Modal from '../modal/Modal'

export default function UserInfo({ userData, currnetUser }) {
    const { isDark } = useTheme()
    const { DEVELOPER_UID } = useAuth()

    // const [showEditForm, setShowEditForm] = useState(false)

    return (
        <div className="flex justify-start col-span-3 gap-4 md:col-span-2">
            <img
                src={userData?.photoURL || defaultProfile}
                alt="Profile"
                className={`my-0.5 rounded-3xl w-40 h-40 md:w-44 md:h-44 ${isDark ? 'border border-primary' : 'border border-gray-300'}`}
            />
            <div className="mt-1 md:mt-0">
                <div className="flex items-center gap-1">
                    {/* User name */}
                    <h2 className="text-lg font-bold md:text-2xl text-primary user-name">{userData?.displayName || 'User'}</h2>
                    {/* Show developer badge if the user is the developer */}
                    {userData?.uid === DEVELOPER_UID && (
                        <div className="relative mt-1 md:mt-2 group">
                            <span className="text-xs md:text-[16px] cursor-pointer text-secondary material-symbols-outlined">check_circle</span>
                            <span className="absolute px-3 py-1 text-white transition-all rounded-md opacity-0 pointer-events-none -left-20 bg-dark top-full group-hover:opacity-100 group-hover:translate-y-2 whitespace-nowrap">
                                Developer of LitLibrary
                            </span>
                        </div>
                    )}
                    {/* {currnetUser && <PenBoxIcon onClick={() => setShowEditForm(true)} className='cursor-pointer' color='#4555d2' />} */}
                </div>
                {/* Email */}
                {currnetUser && <div className="flex items-center gap-2 mt-1">
                    <span className={`material-symbols-outlined md:text-xl text-[18px] ${isDark ? 'text-white' : ''}`}>mail</span>
                    <div className={`md:text-base flex items-center gap-1 text-xs ${isDark ? 'text-white' : ''}`}>
                        <span className="display_text">Email: </span>
                        <span>{userData?.email || 'name@gmail.com'}</span>
                    </div>
                </div>}
                {/* Joined date */}
                <div className="flex items-center gap-2 mt-1">
                    <span className={`material-symbols-outlined md:text-xl text-[18px] ${isDark ? 'text-white' : ''}`}>Schedule</span>
                    <div className={`flex items-center gap-1 md:text-base text-xs ${isDark ? 'text-white' : ''}`}>
                        <span className="display_text">Joined at: </span>
                        <span>{userData?.created_at?.toDate()?.toDateString() || 'N/A'}</span>
                    </div>
                </div>
            </div>
            {/* {showEditForm && <UserProfileEditModal setShowModal={setShowEditForm} />} */}
            {/* {showEditForm && <Modal setShowModal={setShowEditForm} />} */}
        </div>
    )
}
