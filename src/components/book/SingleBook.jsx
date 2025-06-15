import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useTheme from "../../hooks/useTheme";
import useAuth from "../../hooks/useAuth";
import useFirestore from "../../hooks/useFirestore";
import useStorage from "../../hooks/useStorage";
import toast from "react-hot-toast";
import { ImageMinus } from "lucide-react";

/* eslint-disable react/prop-types */
export default function SingleBook({ book }) {
    const { isDark } = useTheme();
    const { user } = useAuth();
    const { deleteDocument, getDocumentById, updateDocument } = useFirestore();
    const { deleteFileFromStorage } = useStorage();
    const navigate = useNavigate();
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    const isOwner = user?.uid === book?.uid;
    const { data: userData } = user ? getDocumentById('users', user?.uid) : { data: null };

    const deleteBook = async (e, id) => {
        e.preventDefault();

        await deleteDocument('books', id);
        toast.success("Success! Your action was completed.");
        if (book.bookCoverName) {
            await deleteFileFromStorage(`/covers/${user.uid}/${book.bookCoverName}`);
        }
    };

    const toggleSaved = async (e, bookId) => {
        e.preventDefault()
        const updatedSaved = userData.saved.includes(bookId)
            ? userData.saved.filter(id => id !== bookId)
            : [...userData.saved, bookId];

        await updateDocument('users', user?.uid, { saved: updatedSaved }, false);
    };

    const savedIcon = userData?.saved.includes(book.id) ? 'bookmark_added' : 'bookmark_add';

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    const handleImageError = () => {
        setImageLoading(false);
        setImageError(true);
    };

    const renderImage = () => {
        if (!book.cover || imageError) {
            return (
                <div className={`${isDark ? 'bg-indigo-900' : 'bg-gray-200'} flex items-center justify-center h-[270px] rounded-md p-24 md:p-0`}>
                    <ImageMinus className="w-12 h-12 text-gray-400" />
                </div>
            );
        }

        return (
            <div className="relative">
                {/* Skeleton loader */}
                {imageLoading && (
                    <div className={`absolute inset-0 h-[270px] rounded-md animate-pulse ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}>
                        <div className={`w-full h-full rounded-md ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
                    </div>
                )}

                {/* Actual image */}
                <img
                    src={book.cover}
                    alt={book.title}
                    className={`w-full rounded-md h-[270px] object-cover transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
            </div>
        );
    };

    return (
        <Link to={`/blogs/${book.id}`} className={`p-4 space-y-3 relative border rounded-md transition ease-in-out duration-700 hover:shadow-lg ${isDark ? 'border-primary hover:shadow-primary shadow' : ''}`}>
            {renderImage()}

            <div className="flex items-center justify-between">
                <div className="relative transition-all duration-500 w-[300px] group">
                    <h2 className={`text-xl font-bold truncate ${isDark ? 'text-white' : ''}`}>
                        {book?.title?.length > 15 ? `${book?.title.slice(0, 15)}...` : book?.title}
                    </h2>
                    <span className="absolute left-0 z-10 hidden p-1 px-2 mt-1 transition-all duration-500 rounded-lg w-fit top-full group-hover:block bg-slate-200 dark:bg-slate-700 dark:text-slate-50">
                        {book.title}
                    </span>
                </div>
                {isOwner && (
                    <div className="flex items-center justify-center gap-1">
                        <span className="text-red-600 material-symbols-outlined text-md" onClick={(e) => deleteBook(e, book.id)}>
                            delete
                        </span>
                        <span
                            onClick={(e) => {
                                e.preventDefault()
                                navigate(`/edit/${book.id}`)
                            }
                            }
                            className="text-blue-600 material-symbols-outlined text-md">
                            edit
                        </span>
                    </div>
                )}
                {user && !isOwner && (
                    <span onClick={(e) => toggleSaved(e, book.id)} className="p-1.5 transition-all duration-500 border-0 rounded-full text-[20px] hover:bg-indigo-700 material-symbols-outlined bg-primary text-light">
                        {savedIcon}
                    </span>
                )}
            </div>
            <span className={`text-sm italic ${isDark ? 'text-white' : ''}`}>Author: {book.author || 'Unknown'}</span>
            <div className="flex flex-wrap gap-2">
                {book?.categories?.map(c => (
                    <span key={c} className="px-3 py-1 text-sm text-white rounded-full bg-primary">
                        {c}
                    </span>
                ))}
            </div>
        </Link>
    );
}