import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { deleteDoc, doc } from "firebase/firestore";
import { booksCollectionRef } from "../firebase/config";

/* eslint-disable react/prop-types */
export default function SingleBook({ book }) {

    const { isDark } = useTheme()

    const deleteBook = async (e, id) => {
        e.preventDefault()
        let ref = doc(booksCollectionRef, id)
        await deleteDoc(ref)
        // removeBook(id)
    }

    return (
        <Link to={`/books/${book.id}`} className={`p-4 space-y-3 border rounded-md ${isDark ? 'border-primary' : 'border-gray-200'}`}>
            <img src="../src/assets/book.png" alt="" className="rounded-md" />
            <div className="flex items-center justify-between">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : ''}`}>{book.title.length > 15 ? book.title.slice(0, 15) + '...' : book.title}</h2>
                <div className="flex items-center justify-center gap-1">
                    <span className="text-red-600 material-symbols-outlined text-md" onClick={(e) => deleteBook(e, book.id)}>
                        delete
                    </span>
                    <Link to={`/edit/${book.id}`}>
                        <span className="mt-1 text-blue-600 material-symbols-outlined text-md">
                            edit
                        </span>
                    </Link>
                </div>
            </div>
            <span className={`text-sm italic ${isDark ? 'text-white' : ''}`}>By: {book.author}</span>
            <div className="flex flex-wrap gap-2">
                {
                    book.categories.map(c => (
                        <span key={c} className="px-3 py-1 text-sm text-white rounded-full bg-primary">
                            {c}
                        </span>
                    ))
                }
            </div>
        </Link>
    )
}
