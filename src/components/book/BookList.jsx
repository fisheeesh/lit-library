/* eslint-disable react/prop-types */
import useFirestore from "../../hooks/useFirestore"
import useTheme from "../../hooks/useTheme"
import SingleBook from "./SingleBook"
import { useLocation } from "react-router-dom"

export default function BookList({ limit = null, query = null }) {

    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const search = params.get('search') || '';
    const filterValue = params.get('category') || 'All';

    const { getAllDocuments } = useFirestore()
    let books;
    let erroR;
    let loadinG;

    if (query) {
        const { data, error, loading } = getAllDocuments('books', query, null)
        books = data
        erroR = error
        loadinG = loading
    }
    else {
        const { data, error, loading } = getAllDocuments('books', null, {
            field: 'title',
            value: search,
            filter: filterValue !== 'All' ? filterValue : null,
        })
        books = data
        erroR = error
        loadinG = loading
    }


    const { isDark } = useTheme()

    return (
        <>
            {erroR && <h3 className="my-24 text-2xl font-bold text-center text-gray-500">{erroR}</h3>}
            {loadinG && <h3 className={`my-20 text-xl text-center ${isDark ? 'text-white' : ''}`}>Loading...</h3>}
            {
                !loadinG && !!books && limit ? (
                    <div className="grid grid-cols-1 gap-4 mx-auto mt-3 sm:grid-cols-2 md:grid-cols-4 max-w-7xl">
                        {
                            books.slice(0, limit).map(book => <SingleBook key={book.id} book={book} />)
                        }
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 px-5 mx-auto mt-3 sm:grid-cols-2 md:grid-cols-4 max-w-7xl md:px-0">
                        {
                            books.map(book => <SingleBook key={book.id} book={book} />)
                        }
                    </div>
                )
            }
        </>
    )
}
