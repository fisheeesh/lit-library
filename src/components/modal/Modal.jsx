/* eslint-disable react/prop-types */
import { X, Copy, Settings, Trash } from "lucide-react";
import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

export default function Modal({ setShowModal }) {
    const modalRef = useRef(null);
    useClickOutside([modalRef], () => setShowModal(false));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div ref={modalRef} className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <button className="absolute text-gray-500 top-4 right-4 hover:text-gray-700" onClick={() => setShowModal(false)}>
                    <X size={20} />
                </button>

                {/* Profile Header */}
                <div className="flex flex-col items-center text-center">
                    <div className="relative">
                        <img src="/profile.jpg" alt="User" className="w-16 h-16 rounded-full" />
                        <span className="absolute bottom-0 right-0 p-1 text-xs text-white bg-blue-500 rounded-full">✔</span>
                    </div>
                    <h2 className="mt-2 text-lg font-semibold">Amélie Laurent</h2>
                    <p className="text-sm text-gray-500">amelie@untitledui.com</p>
                    <div className="flex gap-2 mt-2">
                        <button className="flex items-center gap-1 px-3 py-1 text-sm border rounded">
                            <Copy size={14} /> Copy link
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1 text-sm border rounded">
                            View profile
                        </button>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">Name</label>
                            <input type="text" className="w-full p-2 border rounded" placeholder="Amélie" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Surname</label>
                            <input type="text" className="w-full p-2 border rounded" placeholder="Laurent" />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Email address</label>
                        <div className="relative">
                            <input type="email" className="w-full p-2 pl-8 border rounded" placeholder="amelie@untitledui.com" />
                            <span className="absolute left-2 top-2.5 text-gray-500">📧</span>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Username</label>
                        <div className="flex items-center overflow-hidden border rounded">
                            <span className="px-3 py-2 bg-gray-100">untitledui.com/</span>
                            <input type="text" className="w-full p-2 border-l" placeholder="amelie" />
                            <button className="px-2 text-gray-500 hover:text-gray-700">
                                <Settings size={16} />
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Profile photo</label>
                        <button className="w-full p-2 text-gray-500 border rounded hover:text-gray-700">Click to replace</button>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 mt-6 border-t">
                    <button className="flex items-center gap-2 text-red-500">
                        <Trash size={16} /> Delete user
                    </button>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border rounded" onClick={() => setShowModal(false)}>Cancel</button>
                        <button className="px-4 py-2 text-white bg-black rounded">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}