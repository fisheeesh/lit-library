/* eslint-disable react/prop-types */
import useTheme from "../../hooks/useTheme"

export default function NotiBtn({ onNotiClick, hasNewNoti }) {
    const { isDark } = useTheme()
    return (
        <div onClick={onNotiClick} className="relative flex items-center p-2 border rounded-full cursor-pointer">
            <span className={`material-symbols-outlined ${isDark ? "text-white" : "text-gray-800"}`}>
                notifications
            </span>
            {hasNewNoti && <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-600 rounded-full"></span>}
        </div>
    )
}
