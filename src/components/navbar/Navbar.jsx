import { useState, useEffect, useRef } from "react";
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
import { useClickOutside } from "../../hooks/useClickOutside";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import emptyAnimation from '../../assets/animations/empty.lottie'

export default function Navbar() {

    const { isDark } = useTheme();
    const { user } = useAuth();
    const [isSticky, setIsSticky] = useState(false);
    const [userNoti, setUserNoti] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [hasNewNoti, setHasNewNoti] = useState(false);

    const modalRef = useRef(null)

    const { getAllDocuments } = useFirestore();
    const customColor = !isDark ? "#4555d2" : "#cc2973";
    const { data: notis, loading } = getAllDocuments("notifications");

    useClickOutside([modalRef], () => setIsOpen(false));

    //? Filter notifications specific to the current user
    useEffect(() => {
        if (notis && user) {
            //? Retrieve notifications that belong to the logged-in user
            const userNotifications = notis.filter(noti => noti.uid === user.uid || noti.isAnnouncement);
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
        //? Toggle notification dropdown
        setIsOpen(true);

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
                <div ref={modalRef} className={`fixed top-20 right-2 md:right-5 w-[375px] md:w-[500px] h-[400px] overflow-y-scroll rounded-lg z-50 
                    ${isDark ? "bg-dbg text-white shadow-custom-white" : "bg-light drop-shadow-lg text-gray-900"}
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
                        {loading && (
                            <div className="mt-24 text-center">
                                <BeatLoader width={"100px"} height={"5px"} color={customColor} />
                                Loading Notis...
                            </div>
                        )}
                        {!loading && userNoti.length > 0 && (
                            userNoti.map((noti, index) => (
                                <SingleNoti key={index} noti={noti} setIsOpen={setIsOpen} />
                            ))
                        )}
                        {!loading && userNoti.length === 0 && <div className="flex flex-col items-center justify-center mt-16">
                            <DotLottieReact
                                src={emptyAnimation}
                                loop
                                autoplay
                                style={{ width: "100px", height: "100px" }}
                            />
                            <h3 className="">You have no notifications.</h3>
                        </div>
                        }
                    </div>
                </div>
            )}
        </div>
    );
}