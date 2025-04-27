import useTheme from "../../hooks/useTheme"

/* eslint-disable react/prop-types */
export default function ConfirmDeleteModal({ title, subTitle = '', isPassword = false, placeholder, state, setState, onAction, setIsModalOpen, isLoading }) {
    const { isDark } = useTheme()

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`${isDark ? 'bg-indigo-900 text-light' : 'bg-gray-100 text-black'} p-6 mx-5  rounded-lg shadow-lg w-[580px] animate-slideUp`}>
                <h2 className="text-lg font-semibold ">{title}</h2>
                <p className={`${isDark ? 'text-light' : 'text-gray-500'} mt-2`}>{subTitle}</p>
                <input
                    disabled={isLoading}
                    type={isPassword ? 'password' : 'text'}
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full p-2 mt-3 text-black border border-gray-300 rounded-md disabled:cursor-not-allowed focus:outline-none focus:border-primary"
                    placeholder={placeholder}
                />
                <div className="flex justify-end mt-4 space-x-2">
                    <button
                        disabled={isLoading}
                        onClick={onAction}
                        className={`${isPassword ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-indigo-700'} px-4 py-2 text-white transition disabled:cursor-not-allowed rounded-md`}
                    >
                        {isLoading ? <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg> : 'Confirm'}
                    </button>
                    <button
                        disabled={isLoading}
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 text-gray-800 transition bg-gray-300 rounded-md disabled:cursor-not-allowed hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
