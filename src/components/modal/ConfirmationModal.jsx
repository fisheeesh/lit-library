/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

export default function ConfirmationModal({ title, setShowModal, onAction }) {
    const modalRef = useRef(null);

    useClickOutside([modalRef], () => setShowModal(false));

    return (
        <div className="fixed z-[100] inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-xs animate-fadeIn">
            <div ref={modalRef} className="p-6 bg-white rounded-lg shadow-lg dark:bg-indigo-900 w-96 animate-slideUp">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-light">{title}</h2>
                <div className="flex justify-end gap-3 mt-4">
                    <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 text-gray-600 transition-all duration-200 bg-gray-200 rounded-md hover:bg-gray-300">
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onAction}
                        className="px-4 py-2 text-white transition-all duration-200 bg-red-600 rounded-md hover:bg-red-700">
                        Yes
                    </button>
                </div>
            </div>
        </div>
    )
}
