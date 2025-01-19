import { Link, useNavigate } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import useAuth from "../../hooks/useAuth";
import useFirestore from "../../hooks/useFirestore";
import useStorage from "../../hooks/useStorage";

/* eslint-disable react/prop-types */
export default function SingleBook({ book }) {
    const { isDark } = useTheme();
    const { user } = useAuth();
    const { deleteDocument, getDocumentById, updateDocument } = useFirestore();
    const { deleteFileFromStorage } = useStorage();
    const navigate = useNavigate();

    const isOwner = user?.uid === book?.uid;
    const { data: userData } = user ? getDocumentById('users', user?.uid) : { data: null };

    const deleteBook = async (e, id) => {
        e.preventDefault();
        await deleteDocument('books', id);
        await deleteFileFromStorage(`/covers/${user.uid}/${book.bookCoverName}`);
    };

    const toggleSaved = async (bookId) => {
        const updatedSaved = userData.saved.includes(bookId)
            ? userData.saved.filter(id => id !== bookId)
            : [...userData.saved, bookId];

        await updateDocument('users', user?.uid, { saved: updatedSaved }, false);
    };

    const savedIcon = userData?.saved.includes(book.id) ? 'bookmark_added' : 'bookmark_add';

    return (
        <Link to={`/blogs/${book.id}`} className={`p-4 space-y-3 relative border rounded-md transition ease-in-out duration-700 hover:shadow-lg ${isDark ? 'border-primary hover:shadow-primary shadow' : ''}`}>
            <img src={book.cover} alt={book.title} className="w-full rounded-md h-[270px]" />
            <div className="flex items-center justify-between">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : ''}`}>
                    {book?.title?.length > 15 ? `${book?.title.slice(0, 15)}...` : book?.title}
                </h2>
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
                    <span onClick={() => toggleSaved(book.id)} className="p-1.5 transition-all duration-500 border-0 rounded-full text-[20px] hover:bg-indigo-700 material-symbols-outlined bg-primary text-light">
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