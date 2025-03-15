/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { Trash, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { ProfileFormFieldsSchema } from "../../utils/zSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "../../utils/cn";
import useGeoLocation from "../../hooks/useGeoLocation";
import defaultProfile from '../../assets/default_profile.jpg'
import axios from "axios";
import useAuth from '../../hooks/useAuth'
import useFirestore from "../../hooks/useFirestore";
import toast from "react-hot-toast";
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential, updateProfile } from "firebase/auth";
import useStorage from "../../hooks/useStorage";
import useTheme from "../../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function UserProfileEditModal({ setShowModal }) {
    const { user } = useAuth()
    const { isDark } = useTheme()
    const modalRef = useRef(null);
    const confirmModalRef = useRef(null);
    const navigate = useNavigate()

    useClickOutside([modalRef, confirmModalRef], () => setShowModal(false));

    const { isLoading, position: { lat, lng }, error, getPosition } = useGeoLocation()
    const { getDocumentById, updateDocument } = useFirestore()
    const { uploadFileToStorage } = useStorage()

    const { data: userData } = getDocumentById('users', user?.uid)

    const [isUpdating, setIsUpdating] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [password, setPassword] = useState('');

    //? form fields
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(ProfileFormFieldsSchema)
    })
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState('')
    const [birthday, setBirthday] = useState('')
    const [location, setLocation] = useState('')
    const [pPic, setPPic] = useState('')
    const [preview, setPreview] = useState('')

    //? geo location
    const [fetchTrigger, setFetchTrigger] = useState(0)

    const fileInputRef = useRef(null)

    useEffect(() => {
        if (userData) {
            reset({
                username: userData.displayName || '',
                fbUrl: userData.facebookURL || '',
                igUrl: userData.instagramURL || ''
            });
            setFullName(userData?.fullName)
            setRole(userData?.role)
            setBirthday(userData?.birthday)
            setLocation(userData?.location)
            setPreview(userData.photoURL)
        }
    }, [userData, reset])

    useEffect(() => {
        if (!lat && !lng) return

        const fetchDetail = async () => {
            try {
                let { data } = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
                // console.log(data.locality, data.countryName)
                setLocation(`${data.locality}, ${data.countryName}`)
            }
            catch (err) {
                console.log(err.message)
            }
        }
        fetchDetail()
    }, [lat, lng, fetchTrigger])

    const onGetCurrentLocation = () => {
        setFetchTrigger(prev => prev + 1)
        getPosition()
    }

    const onUpdateUserProfile = async (data) => {
        try {
            setIsUpdating(true)

            let pUrl;
            //? Default to existing preview (current cover)
            let url = preview;

            //? If a new file is selected, upload it
            if (pPic) {
                pUrl = Date.now().toString() + '_' + pPic.name;
                let uniquePath = `/profile_pics/${user.uid}/${Date.now().toString() + '_' + pPic.name}`
                url = await uploadFileToStorage(uniquePath, pPic);
            }

            let updatedProfile = {
                fullName: fullName || '',
                displayName: data.username,
                role,
                birthday,
                location,
                facebookURL: data.fbUrl || '',
                instagramURL: data.igUrl || '',
                photoURL: url,
                //? Retain existing name if no new file
                photoName: pUrl || null,
            }
            await updateProfile(user, { displayName: data.username, photoURL: url })
            await updateDocument('users', user?.uid, updatedProfile, false)
            console.log(updatedProfile)
            console.log(user)
            toast.success('Profile updated successfully!')
        }
        catch (err) {
            console.log(err.message)
        }
        finally {
            setIsUpdating(false)
        }
    }

    const onHandleRemove = () => {
        setPPic('')
        setPreview('')
    }

    const handleFileChange = (e) => {
        // console.log(e.target.files[0])
        setPPic(e.target.files[0])
    };

    const handleUploadClick = () => {
        fileInputRef.current.click()
    }

    const handleImagePreview = (file) => {
        // console.log('hi')
        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = () => {
            // console.log(reader.result)
            setPreview(reader.result)
        }
    }


    useEffect(() => {
        // console.log('hi')
        if (pPic) {
            handleImagePreview(pPic)
        }
    }, [pPic])

    const onHandleDeleteAccount = () => {
        if (!user) {
            toast.error("User not found. Please try again.");
            return;
        }
        setIsModalOpen(true);
        // setShowModal(false);
    };

    const confirmDeletion = async () => {
        try {
            if (!password) {
                toast.error("Please enter your password.");
                return;
            }

            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credential);

            await deleteUser(user);

            toast.success("Account deleted successfully!");
            navigate("/", { replace: true });
        } catch (error) {
            toast.error("Error deleting account. Please try again.");
            console.error("Error deleting account:", error.message);
        } finally {
            setIsModalOpen(false);
            setPassword("");
        }
    };


    return (
        <div className="fixed z-[100] inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn p-4 sm:p-8 md:p-12">
            <form onSubmit={handleSubmit(onUpdateUserProfile)} ref={modalRef} className={`${isDark ? "bg-dark text-light shadow-custom-white" : "bg-white drop-shadow-lg text-gray-900"} rounded-lg mx-1 shadow-lg w-full max-w-[600px] max-h-[90vh] overflow-y-auto animate-slideUp p-6`}>
                <h2 className="mb-4 text-xl font-semibold">Edit your profile</h2>
                <div className={`p-6  rounded-lg ${isDark ? 'bg-indigo-900' : 'bg-gray-100'}`}>
                    <div className="flex items-center gap-4">
                        {
                            !preview ?
                                <img src={defaultProfile} className="w-16 h-16 rounded-full" alt="user_profile" /> :
                                <img src={preview} className="w-16 h-16 rounded-full" alt="user_profile" />
                        }
                        <div className="flex flex-col gap-2">
                            <button type="button" onClick={handleUploadClick} className="flex items-center gap-2 px-4 py-2 transition-colors duration-300 border rounded hover:border-gray-400">
                                <Upload size={16} /> Upload photo
                            </button>
                            <button onClick={onHandleRemove} type="button" className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700">
                                <Trash size={16} /> Remove photo
                            </button>
                        </div>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />

                    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-sm font-medium">Full name</label>
                            <input value={fullName} onChange={e => setFullName(e.target.value)} type="text" className="w-full p-2 text-black transition-colors duration-300 ease-in-out border rounded focus:outline-none focus:border-primary" placeholder="name" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Username <span className="text-red-600">*</span></label>
                            <input {...register('username')} type="text" className={cn(errors.username && 'border-red-600 placeholder:text-red-500', "w-full text-black p-2 transition-colors duration-300 ease-in-out border rounded focus:outline-none focus:border-primary")} placeholder="username" />
                            {errors.username &&
                                <div className="flex items-center gap-1 mt-1">
                                    <span className="text-[16px] text-red-600 material-symbols-outlined">
                                        error
                                    </span>
                                    <span className="text-sm text-red-600">{errors.username.message}</span>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-sm font-medium">Role</label>
                            <input value={role} onChange={e => setRole(e.target.value)} type="text" className="w-full p-2 text-black transition-colors duration-300 ease-in-out border rounded focus:outline-none focus:border-primary" placeholder="role" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Birthday</label>
                            <input value={birthday} onChange={e => setBirthday(e.target.value)} type="date" className="w-full p-2 text-black transition-colors duration-300 ease-in-out border rounded focus:outline-none focus:border-primary" placeholder="" />
                            <span className="text-[8px] italic text-gray-400">Birthday persons will have special activities in the future.</span>
                        </div>
                    </div>

                    <div className="relative mt-4">
                        <label className="text-sm font-medium">Location</label>
                        <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="w-full p-2 text-black transition-colors duration-300 ease-in-out border rounded focus:outline-none focus:border-primary" placeholder="location" />
                        <button type="button" onClick={onGetCurrentLocation} className={`absolute justify-center flex items-center gap-1 px-4 py-1 text-xs border border-gray-500 rounded-full right-1 top-[33px] transition-colors t duration-500 ${isDark ? 'hover:border-black hover:bg-black hover:text-light text-dark' : 'hover:border-black hover:bg-black hover:text-light'}`}>
                            {
                                isLoading ?
                                    <svg className="w-[12px] h-[12px] animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg> :
                                    <span className="">Choose Your Location</span>
                            }
                        </button>
                        {error && <span className="text-sm text-red-600">{error}</span>}
                    </div>

                    <div className="pt-4 mt-6 border-t">
                        <h3 className="text-lg font-semibold">Social URL</h3>
                        <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
                            <div>
                                <label className="text-sm font-medium">Facebook</label>
                                <input {...register('fbUrl')} type="text" className={cn(errors.fbUrl && 'border-red-600 placeholder:text-red-500', "w-full text-black p-2 transition-colors duration-300 ease-in-out border rounded focus:outline-none focus:border-primary")} placeholder="" />
                                {errors.fbUrl &&
                                    <div className="flex items-center gap-1 mt-1">
                                        <span className="text-[16px] text-red-600 material-symbols-outlined">
                                            error
                                        </span>
                                        <span className="text-sm text-red-600">{errors.fbUrl.message}</span>
                                    </div>
                                }
                            </div>
                            <div className="relative">
                                <label className="text-sm font-medium">Instagram</label>
                                <input {...register('igUrl')} type='text' className={cn(errors.igUrl && 'border-red-600 placeholder:text-red-500', "w-full text-black p-2 transition-colors duration-300 ease-in-out border rounded focus:outline-none focus:border-primary")} placeholder="" />
                                {errors.igUrl &&
                                    <div className="flex items-center gap-1 mt-1">
                                        <span className="text-[16px] text-red-600 material-symbols-outlined">
                                            error
                                        </span>
                                        <span className="text-sm text-red-600">{errors.igUrl.message}</span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                </div>
                <div className="flex items-center justify-between gap-2 mt-4">
                    <div>
                        <button disabled={isUpdating} onClick={onHandleDeleteAccount} type="button" className={cn(isUpdating && 'cursor-not-allowed', 'px-4 py-2 text-white transition-colors duration-300 bg-red-600 rounded hover:bg-red-700')}>Delete your account</button>
                    </div>
                    <div className="flex items-center gap-2">
                        <button disabled={isUpdating} type="button" className={cn(isDark && 'text-light border-gray-400', isUpdating && 'cursor-not-allowed', 'px-4 py-2 hover:bg-black hover:text-light hover:border-black  transition-colors duration-300 border rounded')} onClick={() => setShowModal(false)}>Close</button>
                        <button disabled={isUpdating} type="submit" className={cn(isUpdating && 'cursor-not-allowed', 'flex items-center gap-2 px-4 py-2 text-base text-white transition-colors duration-300 rounded bg-primary hover:bg-indigo-700')}>
                            {
                                isUpdating ?
                                    <svg className="w-[24px] h-[24px] animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg> :
                                    <span>Save changes</span>
                            }
                        </button>
                    </div>
                </div>
            </form>
            {isModalOpen &&
                <div ref={confirmModalRef}>
                    <ConfirmDeleteModal password={password} setPassword={setPassword} onAction={confirmDeletion} setIsModalOpen={setIsModalOpen} />
                </div>
            }
        </div>
    );
}
