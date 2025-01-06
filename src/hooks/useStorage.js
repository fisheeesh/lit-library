import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../firebase/config"

export default function useStorage() {
    const uploadFileToStorage = async (path, file) => {
        let storageRef = ref(storage, path)
        await uploadBytes(storageRef, file)
        return getDownloadURL(storageRef)
    }
    const deleteFileFromStorage = async (path) => {
        let storageRef = ref(storage, path)
        await deleteObject(storageRef)
    }

    return { uploadFileToStorage, deleteFileFromStorage }
}