import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

/* eslint-disable react/prop-types */
export default function LogoutModal({ setShowModal, onHandleLogout }) {
    const modalRef = useRef(null);

    useClickOutside([modalRef], () => setShowModal(false));
    return (
        <div className="fixed z-[100] inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-xs animate-fadeIn">
            <div ref={modalRef} className="p-6 bg-white rounded-lg shadow-lg w-96 animate-slideUp">
                <h2 className="text-lg font-semibold text-gray-900">Are you sure you want to log out?</h2>
                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 text-gray-600 transition-all duration-200 bg-gray-200 rounded-md hover:bg-gray-300">
                        Cancel
                    </button>
                    <button
                        onClick={onHandleLogout}
                        className="px-4 py-2 text-white transition-all duration-200 bg-red-600 rounded-md hover:bg-red-700">
                        Yes
                    </button>
                </div>
            </div>
        </div>
    )
}
