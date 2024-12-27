import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import bookImage from '../assets/book.png'
import useTheme from "../hooks/useTheme"

export default function BookDetail() {
    const params = useParams()
    const { data: book, error, loading } = useFetch(`http://localhost:3001/books/${params.id}`)

    const { isDark } = useTheme()

    if (error) {
        return <h3 className="my-5 text-center text-red-600">{error}</h3>
    }

    return (
        <div className="h-screen">
            {
                loading && <h3 className="my-5 text-center">Loading...</h3>
            }
            {
                book && (
                    <div className="grid grid-cols-2">
                        <img src={bookImage} alt="" className="w-[80%]" />
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