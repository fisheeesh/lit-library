import { useNavigate, useParams } from "react-router-dom"
import bookImage from '../assets/book.png'
import useTheme from "../hooks/useTheme"
import { useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { booksCollectionRef } from "../firebase/config"

export default function BookDetail() {
    /**
     * @TODO: with json-server
     * $ import useFetch from "../hooks/useFetch"
     * ?const { data: book, error, loading } = useFetch(`http://localhost:3001/books/${params.id}`)
     */
    const { id } = useParams()
    const [book, setBook] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { isDark } = useTheme()
    const navigate = useNavigate()

    // @TODO : with firebase firestore
    useEffect(() => {
        setLoading(true)
        let ref = doc(booksCollectionRef, id)

        // @TODO: normal listener
        // getDoc(ref)
        //     .then(doc => {
        //         if (doc.exists()) {
        //             // console.log(doc.data())
        //             setBook(doc.data())
        //             setLoading(false)
        //             setError(null)
        //         }
        //         else{
        //             setLoading(false)
        //             setError("Something went wrong.!")
        //         }
        //     })

        // @TODO: real-time listener
        onSnapshot(ref, (doc) => {
            if (doc.exists()) {
                setBook(doc.data())
                setLoading(false)
                setError(null)
            }
            else {
                setLoading(false)
                setError("Something went wrong.!")
            }
        })
    }, [id])

    useEffect(() => {
        if (error) {
            setBook(null)
            setTimeout(() => {
                navigate('/')
            }, 2000)
        }
    }, [error, navigate])

    return (
        <div className="h-screen">
            {
                error && <h3 className="my-5 text-xl font-bold text-center text-red-600">{error}</h3>
            }
            {
                loading && <h3 className={`my-5 text-xl font-bold text-center ${isDark ? 'text-white' : ''}`}>Loading...</h3>
            }
            {
                book && (
                    <div className="grid grid-cols-2">
                        <img src={bookImage} alt="" className={`w-[80%] ${error ? 'hidden' : ''}`} />
                        <div className="space-y-3">
                            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : ''}`}>{book.title}</h2>
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
                            <p className={`${isDark ? 'text-white' : ''}`}>{book.description}</p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}