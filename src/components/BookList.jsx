import SingleBook from "./SingleBook"
import useTheme from "../hooks/useTheme"
import useFirestore from "../hooks/useFirestore"

export default function BookList() {

    /**
     *  @TODO: with json-server
     * $ import useFetch from "../hooks/useFetch"
     * $ import { useLocation } from "react-router-dom"
     * ? const location = useLocation()
     * ? const params = new URLSearchParams(location.search)
     * ? const search = params.get('search')
     * ? const { data: books, error, loading } = useFetch(`http://localhost:3001/books${search ? `?q=${search}` : ''}`)
     */

    const { isDark } = useTheme()

    const { getAllDocuments } = useFirestore()
    const { data: books, error, loading } = getAllDocuments('books')


    if (error) {
        return <h3 className="my-5 text-center text-red-600">{error}</h3>
    }

    return (
        <>
            {loading && <h3 className={`my-20 text-xl text-center ${isDark ? 'text-white' : ''}`}>Loading...</h3>}
            <div className="grid grid-cols-2 gap-2 mt-3 md:grid-cols-4">
                {
                    !loading && books.map(book => (
                        <SingleBook key={book.id} book={book} />
                    ))
                }
            </div>
            {!loading && books.length === 0 && <h3 className="my-16 text-3xl font-bold text-center text-primary">No book(s) found</h3>}
        </>
    )
}
