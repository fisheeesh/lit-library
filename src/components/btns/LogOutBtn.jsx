/* eslint-disable react/prop-types */
export default function LogOutBtn({ userData, onLogOut }) {
    return (
        <button
            type="button"
            onClick={onLogOut}
            className={`${userData?.displayName.length > 20 ? 'logout-btn' : ''} md:px-5 md:py-2.5 mt-[32px] px-5 py-2.5  text-white transition duration-1000 ease-in-out bg-red-600 rounded-full hover:bg-red-700`}
        >
            LogOut
        </button>
    )
}
