import { Link, useNavigate } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import useAuth from "../../hooks/useAuth";
import useFirestore from "../../hooks/useFirestore";
import useStorage from "../../hooks/useStorage";

/* eslint-disable react/prop-types */
export default function SingleBook({ book }) {

    const { isDark } = useTheme()
    const { user } = useAuth()
    const { deleteDocument } = useFirestore()
    const { deleteFileFromStorage } = useStorage()
    const navigate = useNavigate()

    const deleteBook = async (e, id) => {
        e.preventDefault()
        await deleteDocument('books', id)
        await deleteFileFromStorage(`/covers/${user.uid}/${book.bookCoverName}`)
    }

    return (
        <Link to={`/books/${book.id}`} className={`p-4 space-y-3 border rounded-md transition ease-in-out duration-700 hover:scale-105 ${isDark ? 'border-primary' : 'border-gray-200'}`}>
            <img src={book.cover} alt="" className="w-full rounded-md h-[270px]" />
            <div className="flex items-center justify-between">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : ''}`}>{book.title.length > 15 ? book.title.slice(0, 15) + '...' : book.title}</h2>
                {(user?.uid === book?.uid) &&
                    <div className="flex items-center justify-center gap-1">
                        <span className="text-red-600 material-symbols-outlined text-md" onClick={(e) => deleteBook(e, book.id)}>
                            delete
                        </span>
                        <span
                            onClick={(e) => {
                                e.preventDefault()
                                navigate(`/edit/${book.id}`)
                            }}
                            className="text-blue-600 material-symbols-outlined text-md">
                            edit
                        </span>
                    </div>
                }
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
