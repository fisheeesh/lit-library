import moment from "moment"
import useAuth from "../../hooks/useAuth"
import useTheme from "../../hooks/useTheme"

/* eslint-disable react/prop-types */
export default function SingleCmt({ cmt,deleteComment }) {
    const { isDark } = useTheme()
    const { user } = useAuth()

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
                    <button
                        type="button"
                        className={`px-3.5 py-1.5 border text-sm rounded-full flex items-center space-x-2`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill={`${isDark ? 'white' : 'none'}`} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>

                        <span className={`${isDark ? 'text-white' : ''}`}>{cmt.like_count}</span>
                    </button>
                </div>
            </div>
            <div className="mt-3">
                <p className={`${isDark ? 'text-white' : ''} text-lg`}>{cmt.cmtContent}</p>
                {(cmt.uId === user?.uid) &&
                    <div className="flex items-center justify-end mt-4 space-x-2">
                        <button
                            onClick={() => deleteComment(cmt.id)}
                            type="button"
                            className="px-3.5 py-1.5 text-sm rounded-full text-white bg-red-600"
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            className="px-3.5 py-1.5 text-sm rounded-full text-white bg-blue-600"
                        >
                            Edit
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}
