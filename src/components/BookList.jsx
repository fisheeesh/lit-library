
import { useEffect, useState } from "react"
import SingleBook from "./SingleBook"
import { getDocs, orderBy, query } from "firebase/firestore"
import { booksCollectionRef } from "../firebase/config"
import useTheme from "../hooks/useTheme"

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

    // @TODO : with firebase firestore
    const [books, setBooks] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { isDark } = useTheme()

    const removeBook = (id) => {
        setBooks(prevBook => prevBook.filter(book => book.id !== id))
    }

    useEffect(() => {
        setLoading(true)
        let q = query(booksCollectionRef, orderBy('date', 'desc'))
        getDocs(q)
            .then(docs => {
                // console.log(docs)
                if (docs.empty) {
                    setLoading(false)
                    setError("No book(s) found")
                    return
                }
                let results = []
                docs.forEach(doc => {
                    // console.log(doc.data())
                    let document = { ...doc.data(), id: doc.id }
                    results.push(document)
                })
                setBooks(results)
                setLoading(false)
                setError(null)
            })
    }, [])

    if (error) {
        return <h3 className="my-5 text-center text-red-600">{error}</h3>
    }

    return (
        <>
            {loading && <h3 className={`my-20 text-xl text-center ${isDark ? 'text-white' : ''}`}>Loading...</h3>}
            <div className="grid grid-cols-2 gap-2 mt-3 md:grid-cols-4">
                {
                    !loading && books.map(book => (
                        <SingleBook key={book.id} book={book} removeBook={removeBook} />
                    ))
                }
            </div>
            {!loading && books.length === 0 && <h3 className="my-16 text-3xl font-bold text-center text-primary">No book(s) found</h3>}
        </>
    )
}
