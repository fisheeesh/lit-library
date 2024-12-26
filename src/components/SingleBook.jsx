import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function SingleBook({ book }) {
    return (
        <Link to={`/books/${book.id}`} className="p-4 space-y-3 border rounded-md border-1">
            <img src="../src/assets/book.png" alt="" />
            <h2 className="text-2xl font-bold">{book.title}</h2>
            <span className="text-sm italic">By: {book.author}</span>
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
