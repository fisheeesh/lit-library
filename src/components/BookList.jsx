import { useLocation } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import SingleBook from "./SingleBook"

export default function BookList() {

    const location = useLocation()

    const params = new URLSearchParams(location.search)

    const search = params.get('search')

    const { data: books, error, loading } = useFetch(`http://localhost:3001/books${search ? `?q=${search}` : ''}`)

    if (error) {
        return <h3 className="my-5 text-center text-red-600">{error}</h3>
    }

    return (
        <>
            {loading && <h3 className="my-5 text-center">Loading...</h3>}
            <div className="grid grid-cols-2 gap-2 mt-3 md:grid-cols-4">
                {
                    books && books.map(book => (
                        <SingleBook key={book.id} book={book} />
                    ))
                }
            </div>
            {books && books.length === 0 && <h3 className="my-16 text-3xl text-center text-primary">No book(s) found</h3>}
        </>
    )
}
