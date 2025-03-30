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
import { GrAnnounce, GrDocumentUpload } from "react-icons/gr";
import ConfirmDeleteModal from "../modal/ConfirmDeleteModal";
import useFirestore from "../../hooks/useFirestore";
import toast from "react-hot-toast";

export default function Avatar() {
    const navigate = useNavigate();
    const { user, DEVELOPER_UID } = useAuth();
    const { isDark } = useTheme()

    const [openModal, setOpenModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false)
    const [announceModal, setAnnounceModal] = useState(false)
    const [announcement, setAnnouncement] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const modalRef = useRef(null)

    useClickOutside([modalRef], () => setOpenModal(false));
    const { addDocument } = useFirestore()

    const { logOut } = useSignOut()

    const onLogOut = async () => {
        await logOut();
        navigate('/auth', { replace: true });
    };

    const badges = {
        [DEVELOPER_UID]: "Developer of LitLibrary",
        "0YqTtVfsHtZa6TIaxh8FabqkQhe2": "The Official Account of LitLibrary"
    };

    const badgeText = badges[user?.uid];

    const onHandleAnnouncement = async () => {
        try {
            setIsLoading(true)
            const newNoti = {
                uid: user?.uid,
                senderPhotoURL: user?.photoURL,
                senderName: user?.displayName,
                content: announcement,
                bookId: 'newAnnouncement',
                isComment: false,
                isAnnouncement: true,
            };
            await addDocument('notifications', newNoti)
            toast.success("Annoucement made successfully!");
        }
        catch (err) {
            console.log(err.message)
            toast.error('Something went wrong. Please try again.')
        }
        finally {
            setIsLoading(false)
            setAnnounceModal(false)
            setAnnouncement('')
        }
    }

    return (
        <div className="relative">
            {/* Profile Picture (Click to Open Modal) */}
            <img
                src={user?.photoURL || defaultProfile}
                alt="Profile"
                className="w-[36px] h-[36px] rounded-full cursor-pointer md:h-11 md:w-11"
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

                    {/* Create Button */}
                    <button
                        onClick={() => {
                            navigate(`/create`);
                            setOpenModal(false);
                        }}
                        className={`${isDark ? 'text-white hover:bg-black' : 'text-dark hover:bg-gray-200'} w-full flex md:hidden items-center px-4 py-2 text-left transition-colors duration-300 `}
                    >
                        <GrDocumentUpload className="mr-2 size-5" /> <span>Create</span>
                    </button>

                    {/* Anncouncement Button */}
                    {badgeText && <button
                        onClick={() => setAnnounceModal(true)}
                        className={`${isDark ? 'text-white hover:bg-black' : 'text-dark hover:bg-gray-200'} w-full flex items-center px-4 py-2 text-left transition-colors duration-300 `}
                    >
                        <GrAnnounce className="mr-2 size-5" /> <span>Announcement</span>
                    </button>}

                    <button
                        onClick={() => setShowEditForm(true)}
                        type="button"
                        className={`${isDark ? 'text-white hover:bg-black' : 'text-dark hover:bg-gray-200'} flex items-center w-full px-4 py-2 text-left transition-colors duration-300`}
                    >
                        <Settings className="mr-2" /> Edit Profile
                    </button>

                    {/* Logout Button */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center w-full px-4 py-2 text-left text-red-600 transition-colors duration-300 rounded-bl-xl rounded-br-xl hover:bg-red-600 hover:text-white"
                    >
                        <LogOut className="mr-2" /> Logout
                    </button>
                </div>
            )}
            {showModal && <ConfirmationModal title={'Are you sure you want to log out?'} setShowModal={setShowModal} onAction={onLogOut} />}
            {showEditForm && <UserProfileEditModal setShowModal={setShowEditForm} />}
            {announceModal && <ConfirmDeleteModal isLoading={isLoading} title={'Announcement to all members of LitLibrary 🥳'} subTitle="Once you confirmed it, this will be sent to all the members of LiLibray as notification." placeholder="What's is on your mind?" state={announcement} setState={setAnnouncement} onAction={onHandleAnnouncement} setIsModalOpen={setAnnounceModal} />}
        </div>
    );
}