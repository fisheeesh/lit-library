import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";
import useFirestore from "../../hooks/useFirestore";
import SingleNoti from "../noti/SingleNoti";
import { BeatLoader } from "react-spinners";
import Logo from "./Logo";
import CreateBtn from "../btns/CreateBtn";
import Avatar from "./Avatar";
import NotiBtn from "../btns/NotiBtn";
import GetStarted from "./GetStarted";
import ToggleTheme from "./ToggleTheme";

export default function Navbar() {
    const { isDark } = useTheme();
    const { user } = useAuth();
    const [isSticky, setIsSticky] = useState(false);
    const [userNoti, setUserNoti] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [hasNewNoti, setHasNewNoti] = useState(false);

    const { getAllDocuments } = useFirestore();
    const customColor = !isDark ? "#4555d2" : "#cc2973";
    const { data: notis, loading } = getAllDocuments("notifications");

    //? Filter notifications specific to the current user
    useEffect(() => {
        if (notis && user) {
            //? Retrieve notifications that belong to the logged-in user
            const userNotifications = notis.filter(noti => noti.uid === user.uid);
            setUserNoti(userNotifications);

            //? Retrieve read notifications from local storage
            const readNotifications = JSON.parse(localStorage.getItem(`readNoti-${user.uid}`)) || [];

            //? Check if there are any new (unread) notifications
            const newNotiExists = userNotifications.some(noti => !readNotifications.includes(noti.id));
            setHasNewNoti(newNotiExists);
        }
    }, [notis, user]);

    //? Handle notification click event
    const handleNotiClick = () => {
        // Toggle notification dropdown?
        setIsOpen(prev => !prev);

        //? If notifications are opened and there are unread notifications, mark them as read
        if (!isOpen && userNoti.length > 0) {
            const readNotifications = userNoti.map(noti => noti.id);
            //? Save read notifications
            localStorage.setItem(`readNoti-${user.uid}`, JSON.stringify(readNotifications));
            //? Remove new notification indicator
            setHasNewNoti(false);
        }
    };

    //? Add a scroll event listener to track the page scroll position
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
                <div className="flex items-center justify-between max-w-screen-xl py-4 mx-auto px-7">

                    {/* Logo */}
                    <Logo />

                    {/* Profile, Create Button, Theme Toggle */}
                    <div className="flex items-center gap-1">
                        {user ? (
                            <div className="flex items-center gap-1">
                                {/* Create Button */}
                                <CreateBtn />

                                {/* Profile Avatar */}
                                <Avatar />

                                {/* Notifications */}
                                <NotiBtn hasNewNoti={hasNewNoti} onNotiClick={handleNotiClick} />
                            </div>
                        ) : (
                            <GetStarted />
                        )}

                        {/* Theme Toggle */}
                        <ToggleTheme />
                    </div>
                </div>
            </nav>

            {/* Notifications Dropdown */}
            {isOpen && (
                <div className={`fixed top-20 right-5 w-[350px] h-[400px] overflow-y-scroll rounded-lg shadow-xl z-50 
                    ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
                `}>
                    <div className="flex items-center justify-between px-3 mt-3">
                        <h3 className="text-lg font-bold">Notifications</h3>
                        {/* Cancel Btn */}
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