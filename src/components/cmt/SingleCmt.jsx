/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import CmtForm from "./CmtForm";
import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";
import useFirestore from "../../hooks/useFirestore";
import defaultProfile from '../../assets/default_profile.jpg'
import { ArrowUpCircleIcon as ArrowUpCircleOutline } from '@heroicons/react/24/outline';
import { ArrowUpCircleIcon as ArrowUpCircleSolid } from '@heroicons/react/24/solid';
import { arrayRemove, arrayUnion } from "firebase/firestore";
import toast from "react-hot-toast";

export default function SingleCmt({ cmt, deleteComment }) {
    const { isDark } = useTheme();
    const { id } = useParams()
    const navigate = useNavigate()
    const { user, DEVELOPER_UID } = useAuth();

    const { getDocumentById, updateDocument, addDocument } = useFirestore()

    const [editCmt, setEditCmt] = useState(null);
    const textRef = useRef(null);
    const [textWidth, setTextWidth] = useState("auto");

    const { data: ownerData } = getDocumentById('users', cmt?.uid || "default-fallback-uid");
    const { data: userData } = getDocumentById('users', user?.uid || "default-fallback-uid");

    useEffect(() => {
        if (textRef.current) {
            setTextWidth(`${textRef.current.offsetWidth}px`);
        }
    }, [editCmt]);

    const handleEditClick = () => setEditCmt(cmt);
    const handleDeleteClick = () => deleteComment(cmt.id);

    const renderEditDelete = () => {
        if (cmt.uid === user?.uid) {
            return (
                <div className="items-center hidden gap-1 md:flex">
                    <span onClick={handleEditClick} className="text-[14px] md:text-lg text-blue-600 cursor-pointer material-symbols-outlined">
                        edit
                    </span>
                    <span onClick={handleDeleteClick} className="text-red-600 text-[14px] md:text-lg cursor-pointer material-symbols-outlined">
                        delete
                    </span>
                </div>
            );
        }
    };

    const handleUpvote = async () => {
        if (!user) {
            navigate("/auth");
            return;
        }

        if (cmt?.uid === userData?.uid) {
            toast("C'mon! You can't upvote your own comment 😉", {
                duration: 3000,
                removeDelay: 1000,
                position: "top-center",
                style: {
                    background: "#3B82F6",
                    color: "#FFFFFF",
                },
            });
            return
        }
        if (userData?.upvotedCmts?.includes(cmt?.id)) {
            cmt.like_count -= 1
            await updateDocument('users', user?.uid, { upvotedCmts: arrayRemove(cmt.id) }, false)
            await updateDocument('comments', cmt?.id, { like_count: cmt.like_count }, false)
        }
        else {
            const newNoti = {
                uid: cmt?.uid,
                senderPhotoURL: user?.photoURL,
                senderName: user?.displayName,
                bookId: id,
                upVote: true
            }
            cmt.like_count += 1
            await updateDocument('users', user?.uid, { upvotedCmts: arrayUnion(cmt.id) }, false)
            await updateDocument('comments', cmt?.id, { like_count: cmt.like_count }, false)
            await addDocument('notifications', newNoti)
        }
    }

    return (
        <div className="flex flex-col my-5 space-y-1">
            <div className="flex space-x-2">
                <div className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12">
                    <img
                        src={ownerData?.photoURL || defaultProfile}
                        className="object-fill w-full h-full rounded-full"
                        alt="profile_img"
                    />
                </div>
                <div className={`${isDark ? 'bg-slate-900' : 'bg-[#eceef2]'} flex flex-col items-start justify-center p-4 w-fit rounded-2xl`}>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center">
                            <Link to={`/profile/${cmt.uid}`} className={`md:text-lg text-[16px] font-bold ${isDark ? 'text-white' : ''} cus-btn`}>
                                {ownerData?.displayName || 'User'}
                            </Link>

                            {cmt.uid === DEVELOPER_UID && (
                                <div className="flex items-center gap-1 ml-1">
                                    <div className="relative group">
                                        <span className="text-xs md:mt-1.5 md:text-[14px] cursor-pointer text-secondary material-symbols-outlined">
                                            check_circle
                                        </span>
                                        <span className="absolute px-3 py-1 text-xs text-white transition-all rounded-md opacity-0 pointer-events-none md:text-base -left-20 bg-dark top-full group-hover:opacity-100 group-hover:translate-y-2 whitespace-nowrap">
                                            Developer of LitLibrary
                                        </span>
                                    </div>
                                </div>
                            )}
                            {cmt.uid === '0YqTtVfsHtZa6TIaxh8FabqkQhe2' && (
                                <div className="flex items-center gap-1 ml-1">
                                    <div className="relative group">
                                        <span className="text-xs md:mt-1.5 md:text-[14px] cursor-pointer text-secondary material-symbols-outlined">
                                            check_circle
                                        </span>
                                        <span className="absolute px-3 py-1 text-xs text-white transition-all rounded-md opacity-0 pointer-events-none md:text-base -left-20 bg-dark top-full group-hover:opacity-100 group-hover:translate-y-2 whitespace-nowrap">
                                            The Official Account of LitLibrary
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="items-center hidden gap-3 md:flex">
                            <h5 className="text-[10px] text-gray-400 md:text-sm ">{moment(cmt.created_at.seconds * 1000).fromNow()}</h5>
                            {renderEditDelete()}
                        </div>
                    </div>
                    <div className="w-full mt-2">
                        {editCmt?.id !== cmt.id ? (
                            <div ref={textRef} className={`${isDark ? 'text-white' : ''} gap-3`}>
                                <span className="text-sm md:text-base">{cmt.cmtContent}</span>
                                {cmt.isEdited && <span className="text-xs italic text-blue-500 md:text-sm"> (Edited)</span>}
                            </div>
                        ) : (
                            <CmtForm type="update" setEditCmt={setEditCmt} editCmt={editCmt} width={textWidth} />
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-1">
                    {userData?.upvotedCmts?.includes(cmt.id) ?
                        <ArrowUpCircleSolid type="button" onClick={handleUpvote} className="w-6 h-6 cursor-pointer text-primary dark:text-secondary" /> :
                        <ArrowUpCircleOutline type="button" onClick={handleUpvote} className="w-6 h-6 cursor-pointer dark:text-slate-100" />
                    }
                    <span className="dark:text-slate-50">{cmt?.like_count ?? 0}</span>
                </div>
            </div>
            <div className="flex items-center gap-3 ml-12 md:hidden">
                <h5 className="text-[10px] text-gray-400 md:text-sm ">{moment(cmt.created_at.seconds * 1000).fromNow()}</h5>
            </div>
        </div>
    );
}