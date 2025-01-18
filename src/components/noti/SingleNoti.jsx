import moment from "moment"
import useTheme from "../../hooks/useTheme"
import { useNavigate } from "react-router-dom"

/* eslint-disable react/prop-types */
export default function SingleNoti({ noti, setIsOpen }) {
    const { isDark } = useTheme()
    const navigate = useNavigate()

    return (
        <div onClick={() => {
            navigate(`/blogs/${noti.bookId}`)
            setIsOpen(false)
        }} className={`relative flex items-center gap-3.5 p-3 my-2 cursor-pointer ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-200'}`}>
            <img src={noti.senderPhotoURL} alt="Profile" className='w-12 h-12 rounded-full' />
            {noti.isComment ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`absolute ${isDark ? 'text-light' : 'text-blue-500'} size-5 left-12 top-9`}>
                <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
            </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute text-red-600 size-5 left-11 top-10">
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
            }

            <h3 className={`${isDark ? 'text-light' : 'text-dark'} text-sm`}>
                <span className='font-bold text-md'>{noti.senderName}</span>
                {noti.isComment ? <span> commented &apos;{noti.content}&apos; on your blog.</span> : <span> liked your blog.</span>}
                <span className='text-xs italic text-gray-500 ms-3'>({moment(noti.created_at.seconds * 1000).fromNow()})</span>
            </h3>
        </div>
    )
}
