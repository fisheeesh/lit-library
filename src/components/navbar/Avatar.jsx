import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import defaultProfile from "../../assets/default_profile.jpg";
import { useRef, useState } from "react";
import useTheme from "../../hooks/useTheme";
import { useClickOutside } from "../../hooks/useClickOutside"
import ConfirmationModal from "../modal/ConfirmationModal";
import useSignOut from "../../hooks/useSignOut";
import UserProfileEditModal from "../modal/UserProfileEditModal";
import { LogOut, Settings, UserCircle } from "lucide-react";

export default function Avatar() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { isDark } = useTheme()

    const [openModal, setOpenModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false)
    const modalRef = useRef(null)

    useClickOutside([modalRef], () => setOpenModal(false));

    const { logOut } = useSignOut()

    const onLogOut = async () => {
        await logOut();
        navigate('/auth', { replace: true });
    };

    return (
        <div className="relative">
            {/* Profile Picture (Click to Open Modal) */}
            <img
                src={user?.photoURL || defaultProfile}
                alt="Profile"
                className="w-[42px] h-[42px] rounded-full cursor-pointer md:h-11 md:w-11"
                onClick={() => setOpenModal((prev) => !prev)}
            />

            {/* Dropdown Modal */}
            {openModal && (
                <div
                    ref={modalRef}
                    className={`${isDark ? 'bg-dbg shadow-custom-white' : 'bg-light border-gray-200 text-dark'} absolute right-0 w-48 mt-2 drop-shadow-lg rounded-xl `}
                >
                    {/* Profile Button */}
                    <button
                        onClick={() => {
                            navigate(`/profile/${user.uid}`);
                            setOpenModal(false);
                        }}
                        className={`${isDark ? 'text-white hover:bg-black' : 'text-dark hover:bg-gray-200'} w-full flex items-center px-4 py-2 text-left transition-colors duration-300 rounded-tl-xl rounded-tr-xl `}
                    >
                        <UserCircle className="mr-2" /> <span>Profile</span>
                    </button>

                    <button
                        onClick={() => setShowEditForm(true)}
                        type="button"
                        className={`${isDark ? 'text-white hover:bg-black' : 'text-dark hover:bg-gray-200'} flex items-center w-full px-4 py-2 text-left transition-colors duration-300`}
                    >
                        <Settings className="mr-2"/> Edit Profile
                    </button>

                    {/* Logout Button */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center w-full px-4 py-2 text-left text-red-600 transition-colors duration-300 rounded-bl-xl rounded-br-xl hover:bg-red-600 hover:text-white"
                    >
                        <LogOut className="mr-2"/> Logout
                    </button>
                </div>
            )}
            {showModal && <ConfirmationModal title={'Are you sure you want to log out?'} setShowModal={setShowModal} onAction={onLogOut} />}
            {showEditForm && <UserProfileEditModal setShowModal={setShowEditForm} />}
        </div>
    );
}