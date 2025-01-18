import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import lightIcon from '../../assets/light_mode.svg';
import darkIcon from '../../assets/dark_mode.svg';
import defaultProfile from '../../assets/default_profile.jpg';
import logo from '../../assets/favicon.png';
import useFirestore from '../../hooks/useFirestore';
import SingleNoti from '../noti/SingleNoti';
import { BeatLoader } from 'react-spinners';

export default function Navbar() {
    const { isDark, changeTheme } = useTheme();
    const { user } = useAuth();
    const [isSticky, setIsSticky] = useState(false);
    const [userNoti, setUserNoti] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [hasNewNoti, setHasNewNoti] = useState(false);

    const { getAllDocuments } = useFirestore();

    const customColor = !isDark ? "#4555d2" : "#cc2973";

    const { data: notis, loading } = getAllDocuments('notifications');

    //$ Filter notifications and determine if there are new ones
    useEffect(() => {
        if (notis && user) {
            const userNotifications = notis.filter(noti => noti.uid === user.uid);
            setUserNoti(userNotifications);

            //$ Check localStorage for previously read notifications
            const readNotifications = JSON.parse(localStorage.getItem(`readNoti-${user.uid}`)) || [];
            const newNotiExists = userNotifications.some(noti => !readNotifications.includes(noti.id));

            setHasNewNoti(newNotiExists);
        }
    }, [notis, user]);

    //$ Handle notification button click
    const handleNotiClick = () => {
        setIsOpen(prevState => !prevState);

        //$ Mark notifications as read when opening
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
        <div className="relative">
            <nav
                className={`fixed z-50 left-0 top-0 w-full flex items-center justify-between 
                px-5 py-4 md:px-20 transition-all duration-500 ease-in-out 
                ${isDark && isSticky ? 'bg-dark shadow-md' : ''}
                ${!isDark && isSticky ? 'bg-light shadow-md' : ''}
                `}
            >
                {/* Center: Logo */}
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
                    <img src={logo} alt="Logo.png" className="w-7 md:w-8" />
                    <span className={`${isDark ? 'text-light' : 'text-dark'} text-xl md:text-2xl tracking-wide`}>
                        LitLibrary
                    </span>
                </Link>

                {/* Right: Create button and profile logo */}
                <div className="flex items-center gap-2">
                    {!!user && (
                        <div className="flex items-center gap-2">
                            <Link
                                to="/create"
                                className="p-1.5 md:px-5 md:py-2.5 text-white rounded-full bg-primary flex items-center gap-2 transition hover:bg-indigo-700 duration-500 ease-in-out"
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
                            <Link to={`/profile/${user.uid}`}>
                                <img
                                    src={user?.photoURL || defaultProfile}
                                    alt="Profile"
                                    className="rounded-full h-11 w-11"
                                />
                            </Link>
                            <div
                                onClick={handleNotiClick}
                                className={`cursor-pointer relative flex items-center p-2 border rounded-full ${isDark ? 'border-primary' : 'border-dark'}`}
                            >
                                <span className={`${isDark ? 'text-light' : 'text-dark'} material-symbols-outlined`}>
                                    notifications
                                </span>
                                {hasNewNoti && (
                                    <span className="absolute p-1 bg-red-600 rounded-full right-2.5 top-2.5"></span>
                                )}
                            </div>
                        </div>
                    )}
                    {!user && (
                        <Link
                            to={'/auth'}
                            className="flex items-center gap-1 p-2 md:px-5 md:py-2.5 text-white bg-primary rounded-full hover:bg-indigo-700 transition duration-500 ease-in-out"
                        >
                            <span className="block md:hidden material-symbols-outlined">
                                app_registration
                            </span>
                            <span className="hidden md:block"> Turn the Page</span>
                        </Link>
                    )}
                    <div
                        className={`p-2 border border-1 rounded-full flex items-center cursor-pointer ${isDark ? 'border-primary' : 'border-gray-600'}`}
                    >
                        {isDark && (
                            <img
                                src={lightIcon}
                                className="w-6 text-primary"
                                alt="lightIcon.png"
                                onClick={() => changeTheme('light')}
                            />
                        )}
                        {!isDark && (
                            <img
                                src={darkIcon}
                                className="w-6 text-primary"
                                alt="darkIcon.png"
                                onClick={() => changeTheme('dark')}
                            />
                        )}
                    </div>
                </div>
            </nav>
            {isOpen && (
                <div
                    className={`overflow-y-scroll fixed top-20 right-12 w-[350px] h-[400px] rounded-lg z-50 ${isDark ? 'bg-dark shadow-xl' : ' bg-gray-100 shadow-md'
                        }`}
                >
                    <div>
                        <div className="flex items-center justify-between px-3 mt-3">
                            <h3 className={`text-lg font-bold ${isDark ? 'text-light' : 'text-dark'}`}>
                                Notifications
                            </h3>
                        </div>
                        {!!userNoti &&
                            userNoti.map((noti, index) => (
                                <SingleNoti key={index} noti={noti} setIsOpen={setIsOpen} />
                            ))}
                        {!loading && userNoti.length === 0 && (
                            <h3
                                className={`text-md text-center mt-36 ${isDark ? 'text-light' : 'text-dark'
                                    }`}
                            >
                                You have no notification(s).
                            </h3>
                        )}
                        {loading && (
                            <div className="text-center mt-36">
                                <BeatLoader width={'100px'} height={'5px'} color={customColor} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}