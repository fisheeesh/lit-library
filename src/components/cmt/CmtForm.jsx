import { useEffect, useState, useCallback } from "react";
import useFirestore from "../../hooks/useFirestore";
import useTheme from "../../hooks/useTheme";

/* eslint-disable react/prop-types */
export default function CmtForm({ user, book, type = 'create', setEditCmt, editCmt }) {
    const [content, setContent] = useState('');
    const { addDocument, updateDocument } = useFirestore();
    const [loading, setLoading] = useState(false);

    const { isDark } = useTheme();

    const addComment = useCallback(async (e) => {
        e.preventDefault();
        if (content.trim() === '') return;

        setLoading(true);

        if (type === 'create') {
            const newComment = {
                uid: user?.uid,
                sender: user?.displayName,
                bookId: book.id,
                cmtContent: content,
                photoURL: user?.photoURL,
                like_count: 0,
                isEdited: false
            };

            const newNoti = {
                uid: book?.uid,
                senderPhotoURL: user?.photoURL,
                senderName: user?.displayName,
                bookId: book?.id,
                content,
                isComment: true,
            }

            await addDocument('comments', newComment);
            await addDocument('notifications', newNoti)
        } else if (type === 'update') {
            const updatedComment = { ...editCmt, cmtContent: content, isEdited: true };
            await updateDocument('comments', editCmt.id, updatedComment, false);
            setEditCmt(null); // Reset the edit comment state
        }

        setLoading(false);
        setContent('');
    }, [content, type, user, book, editCmt, addDocument, updateDocument, setEditCmt]);

    useEffect(() => {
        if (type === 'update' && editCmt) {
            setContent(editCmt.cmtContent);
        }
    }, [type, editCmt]);

    return (
        <form onSubmit={addComment}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Your notes..."
                rows={6}
                className={`py-4 px-5 border bg-gray-50 w-full transition duration-700 ease-in-out outline-none resize-none rounded-3xl ${isDark ? 'bg-slate-900 text-white border-primary' : 'border-gray-200'}`}
            />
            <div className="flex items-center gap-2">
                <button
                    type="submit"
                    className="flex items-center gap-1 px-3 py-1 md:py-2.5 mt-3 mb-3 text-white transition duration-1000 ease-out rounded-full bg-primary md:px-5 hover:bg-indigo-500"
                >
                    {loading && (
                        <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    )}
                    <span>{type === 'create' ? 'Submit' : 'Edit'}</span>
                </button>

                {type === 'update' && (
                    <button
                        onClick={() => setEditCmt(null)}
                        type="button"
                        className="hover:bg-primary hover:text-white py-1 px-3 md:py-2.5 mt-3 mb-3 transition duration-1000 ease-out border rounded-full text-primary border-primary md:px-5"
                    >
                        <span>Cancel</span>
                    </button>
                )}
            </div>
        </form>
    );
}