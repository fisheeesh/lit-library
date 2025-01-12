import moment from "moment"
import useAuth from "../../hooks/useAuth"
import useTheme from "../../hooks/useTheme"
import { useState } from "react"
import CmtForm from "./CmtForm"
import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
export default function SingleCmt({ cmt, deleteComment }) {
    const { isDark } = useTheme()
    const { user } = useAuth()

    const [editCmt, setEditCmt] = useState(null)
    return (
        <div className={`px-6 py-8 my-1.5 shadow-md rounded-3xl ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
            <div className="flex space-x-3">
                <img
                    src={cmt.photoURL}
                    className="w-12 h-12 rounded-full"
                    alt=""
                />
                <div className="flex items-center justify-between w-full">
                    <div>
                        {cmt.uid !== '1Ojc7pA10tVCpAo5bHxXVu5PHRA2' ? (
                            <Link to={`/profile/${cmt.uid}`} className={`text-lg font-bold ${isDark ? 'text-white' : ''} cus-btn`}>{cmt.sender}</Link>
                        ) : (
                            <div className="flex items-center gap-1 text-center">
                                <Link to={`/profile/${cmt.uid}`} className={`text-lg font-bold ${isDark ? 'text-white' : ''} cus-btn`}>{cmt.sender}</Link>
                                <div className="relative mt-1 group">
                                    <span className="text-[16px] cursor-pointer text-secondary material-symbols-outlined">
                                        check_circle
                                    </span>
                                    <span className="absolute px-3 py-1 text-white transition-all rounded-md opacity-0 pointer-events-none -left-20 bg-dark top-full group-hover:opacity-100 group-hover:translate-y-2 whitespace-nowrap">
                                        Developer of LitLibrary
                                    </span>
                                </div>
                            </div>
                        )}
                        <h5 className="text-sm text-gray-400">{moment(cmt.created_at.seconds * 1000).fromNow()}</h5>
                    </div>
                    <div className="flex items-center gap-2">
                        {cmt.uid === user?.uid && <div className="flex items-center gap-2">
                            <span onClick={() => setEditCmt(cmt)} className="text-blue-600 cursor-pointer material-symbols-outlined">
                                edit
                            </span>
                            <span onClick={() => deleteComment(cmt.id)} className="text-red-600 cursor-pointer material-symbols-outlined">
                                delete
                            </span>
                        </div>}

                    </div>
                </div>
            </div>
            <div className="mt-3">
                {editCmt?.id !== cmt.id ? (
                    <div className={`${isDark ? 'text-white' : ''} text-lg flex gap-3 items-center`}>
                        <span>{cmt.cmtContent}</span> {cmt.isEdited && <span className="text-sm italic text-blue-500">(Edited)</span>}
                    </div>
                ) : (
                    <CmtForm type="update" setEditCmt={setEditCmt} editCmt={editCmt} />
                )}
            </div>
        </div>
    )
}
