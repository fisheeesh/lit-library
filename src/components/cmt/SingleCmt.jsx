import moment from "moment"
import useAuth from "../../hooks/useAuth"
import useTheme from "../../hooks/useTheme"
import { useState } from "react"
import CmtForm from "./CmtForm"

/* eslint-disable react/prop-types */
export default function SingleCmt({ cmt, deleteComment }) {
    const { isDark } = useTheme()
    const { user } = useAuth()

    const [editCmt, setEditCmt] = useState(null)
    return (
        <div className={`px-6 py-8 my-3  shadow-md rounded-3xl ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
            <div className="flex space-x-3">
                <img
                    src={cmt.photoURL}
                    className="w-12 h-12 rounded-full"
                    alt=""
                />
                <div className="flex items-center justify-between w-full">
                    <div>
                        <h3 className={`text-lg font-bold ${isDark ? 'text-white' : ''}`}>{cmt.sender}</h3>
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
