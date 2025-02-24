/* eslint-disable react/prop-types */
import SingleBook from "./SingleBook";

export default function BookCollection({ books, emptyMessage }) {
    return (
        <div className="grid grid-cols-1 gap-6 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {books.length > 0 ? (
                books.map((book, index) => <SingleBook key={index} book={book} />)
            ) : (
                <p className="col-span-4 my-20 text-xl font-bold text-center text-gray-500">
                    {emptyMessage}
                </p>
            )}
        </div>
    )
}
