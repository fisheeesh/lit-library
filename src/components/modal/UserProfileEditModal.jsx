/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { Eye, EyeOff, Trash, Upload } from "lucide-react";

export default function UserProfileEditModal({ setShowModal }) {
    const modalRef = useRef(null);
    useClickOutside([modalRef], () => setShowModal(false));

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="fixed z-[100] inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn p-4 sm:p-8 md:p-12">
            <div ref={modalRef} className="bg-white rounded-lg mx-1 shadow-lg w-full max-w-[600px] max-h-[90vh] overflow-y-auto animate-slideUp p-6">
                <h2 className="mb-4 text-xl font-semibold">Edit your profile</h2>
                <div className="p-6 bg-gray-100 rounded-lg">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-16 h-16 text-gray-700 bg-gray-300 rounded-full">
                            <span>SH</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 border rounded">
                                <Upload size={16} /> Upload photo
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 text-red-500">
                                <Trash size={16} /> Remove photo
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-sm font-medium">Full name</label>
                            <input type="text" className="w-full p-2 border rounded" placeholder="Stijn Hendrikse" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <input type="email" className="w-full p-2 border rounded" placeholder="stijn@kalungi.com" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-sm font-medium">Company</label>
                            <input type="text" className="w-full p-2 border rounded" placeholder="Kalungi" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Position</label>
                            <input type="text" className="w-full p-2 border rounded" placeholder="CMO" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="text-sm font-medium">Time zone</label>
                        <select className="w-full p-2 border rounded">
                            <option>(UTC+08:00) Kuala Lumpur, Singapore</option>
                        </select>
                    </div>

                    <h3 className="mt-6 text-lg font-semibold">Account details</h3>
                    <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
                        <div>
                            <label className="text-sm font-medium">Log in email address</label>
                            <input type="email" className="w-full p-2 border rounded" placeholder="stijn@kalungi.com" />
                        </div>
                        <div className="relative">
                            <label className="text-sm font-medium">Password</label>
                            <input type={showPassword ? "text" : "password"} className="w-full p-2 pr-10 border rounded" placeholder="••••••••" />
                            <button type="button" className="absolute right-3 top-9" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="pt-4 mt-6 border-t">
                        <h3 className="text-lg font-semibold text-red-600">Delete your account?</h3>
                        <p className="text-sm text-gray-500">Deleting your account will remove all your access. This action cannot be undone.</p>
                        <button className="px-4 py-2 mt-2 text-white bg-red-500 rounded">Delete your account</button>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <button className="px-4 py-2 border rounded" onClick={() => setShowModal(false)}>Close</button>
                    <button className="px-4 py-2 text-white bg-blue-500 rounded">Save changes</button>
                </div>
            </div>
        </div>
    );
}
