import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";

/* eslint-disable react/prop-types */
export default function SingleBook({ book }) {

    const { isDark } = useTheme()

    return (
        <Link to={`/books/${book.id}`} className={`p-4 space-y-3 border rounded-md ${isDark ? 'border-primary' : 'border-gray-200'}`}>
            <img src="../src/assets/book.png" alt="" className="rounded-md"/>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : ''}`}>{book.title.length > 22 ? book.title.slice(0, 20) + '...' : book.title}</h2>
            <span className={`text-sm italic ${isDark ? 'text-white' : ''}`}>By: {book.author}</span>
            <div className="flex flex-wrap gap-2">
                {
                    book.categories.map(c => (
                        <span key={c} className="px-3 py-1 text-white rounded-full bg-primary">
                            {c}
                        </span>
                    ))
                }
            </div>
        </Link>
    )
}
