/* eslint-disable react/prop-types */
import SingleBook from "./SingleBook"
import useTheme from "../hooks/useTheme"

export default function BookList({ books, error, loading }) {

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

    return (
        <>
            {error && <h3 className="my-24 text-2xl font-bold text-center text-gray-500">{error}</h3>}
            {loading && <h3 className={`my-20 text-xl text-center ${isDark ? 'text-white' : ''}`}>Loading...</h3>}
            {
                !loading && !!books && (
                    <div className="grid grid-cols-2 gap-2 mt-3 md:grid-cols-4">
                        {
                            books.map(book => <SingleBook key={book.id} book={book} />)
                        }
                    </div>
                )
            }
        </>
    )
}
