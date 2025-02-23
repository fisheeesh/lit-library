import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";
import useFirestore from "../../hooks/useFirestore";
import SingleNoti from "../noti/SingleNoti";
import { BeatLoader } from "react-spinners";

import lightIcon from "../../assets/light_mode.svg";
import darkIcon from "../../assets/dark_mode.svg";
import defaultProfile from "../../assets/default_profile.jpg";
import logo from "../../assets/favicon.png";

export default function Navbar() {
    const { isDark, changeTheme } = useTheme();
    const { user } = useAuth();
    const [isSticky, setIsSticky] = useState(false);
    const [userNoti, setUserNoti] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [hasNewNoti, setHasNewNoti] = useState(false);

    const { getAllDocuments } = useFirestore();
    const customColor = !isDark ? "#4555d2" : "#cc2973";
    const { data: notis, loading } = getAllDocuments("notifications");

    // Filter notifications for the current user
    useEffect(() => {
        if (notis && user) {
            const userNotifications = notis.filter(noti => noti.uid === user.uid);
            setUserNoti(userNotifications);

            const readNotifications = JSON.parse(localStorage.getItem(`readNoti-${user.uid}`)) || [];
            const newNotiExists = userNotifications.some(noti => !readNotifications.includes(noti.id));
            setHasNewNoti(newNotiExists);
        }
    }, [notis, user]);

    // Mark notifications as read
    const handleNotiClick = () => {
        setIsOpen(prev => !prev);
        if (!isOpen && userNoti.length > 0) {
            const readNotifications = userNoti.map(noti => noti.id);
            localStorage.setItem(`readNoti-${user.uid}`, JSON.stringify(readNotifications));
            setHasNewNoti(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="relative w-full">
            <nav className={`fixed z-50 left-0 top-0 w-full transition-all duration-500  
                ${isDark && isSticky ? 'bg-dark shadow-md' : ''}
                ${!isDark && isSticky ? 'bg-light shadow-md' : ''}
            `}>
                <div className="flex items-center justify-between max-w-screen-xl px-10 py-4 mx-auto lg:px-5">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
                        <img src={logo} alt="LitLibrary Logo" className="w-7 lg:w-8" />
                        <span className={`text-xl lg:text-2xl  font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                            LitLibrary
                        </span>
                    </Link>

                    {/* Right: User, Create Button, Theme Toggle */}
                    <div className="flex items-center gap-1">
                        {user ? (
                            <div className="flex items-center gap-1">
                                {/* Create Button */}
                                <Link
                                    to="/create"
                                    className="p-2 md:px-5 md:py-2.5 text-white rounded-full bg-primary flex items-center gap-2 transition hover:bg-indigo-700 duration-500 ease-in-out"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>

                                    <span className="hidden md:block">Create</span>
                                </Link>

                                {/* Profile Avatar */}
                                <Link to={`/profile/${user.uid}`}>
                                    <img src={user?.photoURL || defaultProfile} alt="Profile" className="w-10 h-10 rounded-full md:h-11 md:w-11" />
                                </Link>

                                {/* Notifications */}
                                <div onClick={handleNotiClick} className="relative flex items-center p-2 border rounded-full cursor-pointer">
                                    <span className={`material-symbols-outlined ${isDark ? "text-white" : "text-gray-800"}`}>
                                        notifications
                                    </span>
                                    {hasNewNoti && <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-600 rounded-full"></span>}
                                </div>
                            </div>
                        ) : (
                            <Link to="/auth" className="flex items-center justify-center p-2 text-white transition duration-500 rounded-full md:py-2 md:px-4 bg-primary hover:bg-indigo-700">
                                <span className="material-symbols-outlined md:hidden">
                                    app_registration
                                </span>
                                <span className="hidden md:block">Turn the Page</span>
                            </Link>
                        )}

                        {/* Theme Toggle */}
                        <button onClick={() => changeTheme(isDark ? "light" : "dark")} className="p-2 border rounded-full">
                            <img src={isDark ? lightIcon : darkIcon} className="w-6" alt="Theme Toggle" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Notifications Dropdown */}
            {isOpen && (
                <div className={`fixed top-20 right-10 w-[350px] h-[400px] overflow-y-scroll rounded-lg shadow-xl z-50 
                    ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
                `}>
                    <div className="flex items-center justify-between px-3 mt-3">
                        <h3 className="text-lg font-bold">Notifications</h3>
                        <span onClick={() => setIsOpen(false)} className="cursor-pointer material-symbols-outlined hover:text-red-500">
                            cancel
                        </span>
                    </div>

                    {/* Notification List */}
                    <div className="p-3">
                        {userNoti.length > 0 ? (
                            userNoti.map((noti, index) => (
                                <SingleNoti key={index} noti={noti} setIsOpen={setIsOpen} />
                            ))
                        ) : (
                            <h3 className="mt-24 text-center">You have no notifications.</h3>
                        )}

                        {/* Loading State */}
                        {loading && (
                            <div className="mt-24 text-center">
                                <BeatLoader width={"100px"} height={"5px"} color={customColor} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}