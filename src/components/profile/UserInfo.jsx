/* eslint-disable react/prop-types */
import defaultProfile from '../../assets/default_profile.jpg'
import useAuth from '../../hooks/useAuth'
import useTheme from '../../hooks/useTheme'
import { cn } from '../../utils/cn'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import moment from 'moment'

export default function UserInfo({ userData, currnetUser }) {
    const { isDark } = useTheme()
    const { DEVELOPER_UID } = useAuth()

    const badges = {
        [DEVELOPER_UID]: "Developer of LitLibrary",
        "0YqTtVfsHtZa6TIaxh8FabqkQhe2": "The Official Account of LitLibrary"
    };

    const badgeText = badges[userData?.uid];

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
                    <h2 className="flex items-center gap-1 text-lg font-bold md:text-2xl text-primary user-name">{userData?.displayName || 'User'}{userData?.role && <span className='hidden text-sm italic font-normal text-gray-400 md:inline'>({userData?.role || ''})</span>}</h2>
                    {/* Show developer badge if the user is the developer */}
                    {badgeText ? (
                        <div className="relative mt-1 md:mt-2 group">
                            <span className="text-xs md:text-[16px] cursor-pointer text-secondary material-symbols-outlined">check_circle</span>
                            <span className="absolute px-3 py-1 text-xs md:text-base text-white transition-all rounded-md opacity-0 pointer-events-none -left-[120px] md:-left-20 bg-dark top-full group-hover:opacity-100 group-hover:translate-y-2 whitespace-nowrap">
                                {badgeText}
                            </span>
                        </div>
                    ) : null}
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
                {!currnetUser && <div className="flex items-center gap-2 mt-1">
                    <span className={`material-symbols-outlined md:text-xl text-[18px] ${isDark ? 'text-white' : ''}`}>Schedule</span>
                    <div className={`flex items-center gap-1 md:text-base text-xs ${isDark ? 'text-white' : ''}`}>
                        <span className="display_text">Joined at: </span>
                        <span>{userData?.created_at?.toDate()?.toDateString() || 'N/A'}</span>
                    </div>
                </div>}
                <div className="flex items-center gap-2 mt-1">
                    <span className={`material-symbols-outlined md:text-xl text-[18px] ${isDark ? 'text-white' : ''}`}>location_on</span>
                    <div className={`flex items-center gap-1 md:text-base text-xs ${isDark ? 'text-white' : ''}`}>
                        <span className="display_text">From: </span>
                        <span>{userData?.location || 'N/A'}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <span className={`material-symbols-outlined md:text-xl text-[18px] ${isDark ? 'text-white' : ''}`}>cake</span>
                    <div className={`flex items-center gap-1 md:text-base text-xs ${isDark ? 'text-white' : ''}`}>
                        <span className="display_text">Born on: </span>
                        <span>{moment(new Date(userData?.birthday)).format('LL') || 'N/A'}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    {userData?.facebookURL && <a target="_blank" className={cn('flex items-center justify-center w-8 h-8 hover:text-white  rounded-full ',
                        isDark ? 'hover:bg-blue-600 bg-slate-500' : 'bg-gray-200 hover:bg-blue-600'
                    )} href={userData?.facebookURL}><FaFacebookF className="size-4" /></a>}
                    {userData?.instagramURL && <a target="_blank" className={cn('flex items-center justify-center w-8 h-8 hover:text-white  rounded-full ',
                        isDark ? 'hover:bg-pink-500 bg-slate-500' : 'bg-gray-200 hover:bg-pink-500'
                    )} href={userData?.instagramURL}><FaInstagram className="size-4" /></a>}
                </div>
            </div>
        </div>
    )
}
