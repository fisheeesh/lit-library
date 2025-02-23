/* eslint-disable react/prop-types */
import { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import CmtForm from "./CmtForm";
import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";

export default function SingleCmt({ cmt, deleteComment }) {
    const { isDark } = useTheme();
    const { user, DEVELOPER_UID } = useAuth();

    const [editCmt, setEditCmt] = useState(null);

    const handleEditClick = () => setEditCmt(cmt);
    const handleDeleteClick = () => deleteComment(cmt.id);

    const renderEditDelete = () => {
        if (cmt.uid === user?.uid) {
            return (
                <div className="flex items-center gap-2">
                    <span onClick={handleEditClick} className="text-[16px] md:text-xl text-blue-600 cursor-pointer material-symbols-outlined">
                        edit
                    </span>
                    <span onClick={handleDeleteClick} className="text-red-600 text-[16px] md:text-xl cursor-pointer material-symbols-outlined">
                        delete
                    </span>
                </div>
            );
        }
    };

    return (
        <div className={`md:px-6 px-4 py-4 md:py-5 my-1.5 shadow-md rounded-3xl ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
            <div className="flex space-x-2">
                <img src={cmt?.photoURL} className="rounded-full w-11 h-11 md:w-12 md:h-12" alt="" />
                <div className="flex items-center justify-between w-full">
                    <div>
                        <div className="flex items-center gap-1">
                            <Link to={`/profile/${cmt.uid}`} className={`md:text-lg text-sm font-bold ${isDark ? 'text-white' : ''} cus-btn`}>
                                {cmt.sender}
                            </Link>
                            {cmt.uid === DEVELOPER_UID && (
                                <div className="relative group">
                                    <span className="text-xs md:mt-1.5 md:text-[14px] cursor-pointer text-secondary material-symbols-outlined">
                                        check_circle
                                    </span>
                                    <span className="absolute px-3 py-1 text-xs text-white transition-all rounded-md opacity-0 pointer-events-none md:text-base -left-20 bg-dark top-full group-hover:opacity-100 group-hover:translate-y-2 whitespace-nowrap">
                                        Developer of LitLibrary
                                    </span>
                                </div>
                            )}
                        </div>
                        <h5 className="text-[10px] text-gray-400 md:text-sm">{moment(cmt.created_at.seconds * 1000).fromNow()}</h5>
                    </div>
                    {renderEditDelete()}
                </div>
            </div>
            <div className="mt-3">
                {editCmt?.id !== cmt.id ? (
                    <div className={`${isDark ? 'text-white' : ''} md:text-lg flex gap-3 items-center`}>
                        <span className="text-sm md:text-lg">{cmt.cmtContent}</span>
                        {cmt.isEdited && <span className="text-sm italic text-blue-500">(Edited)</span>}
                    </div>
                ) : (
                    <CmtForm type="update" setEditCmt={setEditCmt} editCmt={editCmt} />
                )}
            </div>
        </div>
    );
}