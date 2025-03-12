import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import defaultProfile from "../../assets/default_profile.jpg";
import { useRef, useState } from "react";
import useTheme from "../../hooks/useTheme";
import { useClickOutside } from "../../hooks/useClickOutside"
import ConfirmationModal from "../modal/ConfirmationModal";
import useSignOut from "../../hooks/useSignOut";

export default function Avatar() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { isDark } = useTheme()

    const [openModal, setOpenModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
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
                        className={`${isDark ? 'text-white hover:bg-black' : 'text-dark hover:bg-gray-200'} w-full px-4 py-2 text-left transition-colors duration-300 rounded-tl-xl rounded-tr-xl `}
                    >
                        Profile
                    </button>

                    {/* Logout Button */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="w-full px-4 py-2 text-left text-red-600 transition-colors duration-300 rounded-bl-xl rounded-br-xl hover:bg-red-600 hover:text-white"
                    >
                        Logout
                    </button>
                </div>
            )}
            {showModal && <ConfirmationModal title={'Are you sure you want to log out?'} setShowModal={setShowModal} onAction={onLogOut} />}
        </div>
    );
}