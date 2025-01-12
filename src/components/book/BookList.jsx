/* eslint-disable react/prop-types */
import { PropagateLoader } from "react-spinners"
import useFirestore from "../../hooks/useFirestore"
import useTheme from "../../hooks/useTheme"
import SingleBook from "./SingleBook"
import { useLocation } from "react-router-dom"

export default function BookList({ limit = null, query = null }) {

    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const searchValue = params.get('search');
    const filterValue = params.get('category');

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
            value: searchValue,
            filter: filterValue
        })
        books = data
        erroR = error
        loadinG = loading
    }

    const { isDark } = useTheme()

    const customColor = !isDark ? "#4555d2" : "#cc2973"

    return (
        <>
            {erroR && <h3 className="my-24 text-sm font-bold text-center text-gray-500 sm:text-xl md:text-2xl">{erroR}</h3>}
            {loadinG &&
                <div className={`my-40 flex items-center justify-center`}>
                    <PropagateLoader width={"100px"} height={"5px"} color={customColor} />
                </div>}
            {
                !loadinG && !!books && limit ? (
                    <div className="grid grid-cols-1 gap-4 px-5 mx-auto mt-3 sm:grid-cols-2 md:grid-cols-4 max-w-7xl md:px-0">
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
            {!loadinG && !books.length && !erroR && <h3 className="my-24 text-sm font-bold text-center md:text-2xl sm:text-xl text-primary">No Search Book(s) found.</h3>}
        </>
    )
}
