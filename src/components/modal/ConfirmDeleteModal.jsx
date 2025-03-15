/* eslint-disable react/prop-types */
export default function ConfirmDeleteModal({ password, setPassword, onAction, setIsModalOpen }) {
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 mx-4 bg-white rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold text-gray-800">Confirm Account Deletion: This action CANNOT be undone. 😰</h2>
                <p className="mt-2 text-gray-600">Please enter your password to confirm deletion:</p>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mt-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                    placeholder="Enter your password"
                />
                <div className="flex justify-end mt-4 space-x-2">
                    <button
                        onClick={onAction}
                        className="px-4 py-2 text-white transition bg-red-600 rounded-md hover:bg-red-700"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 text-gray-800 transition bg-gray-300 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
