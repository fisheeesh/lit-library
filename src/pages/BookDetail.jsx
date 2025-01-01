import { useNavigate, useParams } from "react-router-dom"
import useTheme from "../hooks/useTheme"
import { useEffect } from "react"
import useFirestore from "../hooks/useFirestore"

export default function BookDetail() {
    /**
     * @TODO: with json-server
     * $ import useFetch from "../hooks/useFetch"
     * ?const { data: book, error, loading } = useFetch(`http://localhost:3001/books/${params.id}`)
     */
    const { id } = useParams()

    const { isDark } = useTheme()
    const navigate = useNavigate()

    const { getDocumentById } = useFirestore()

    const { data: book, setData, error, loading } = getDocumentById('books', id)

    useEffect(() => {
        if (error) {
            setData(null)
            setTimeout(() => {
                navigate('/')
            }, 2000)
        }
    }, [error, navigate, setData])

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
                    <>
                        <div className="grid grid-cols-2">
                            <div className="col-span-2 mb-3 md:px-16 md:col-span-1 md:mb-0">
                                <img src={book.cover} alt="" className={`w-full h-[430px] ${error ? 'hidden' : ''}`} />
                            </div>
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
                        <hr className={`my-3 ${isDark ? 'border-primary' : 'border-gray-200'}`} />
                        <div>
                            
                        </div>
                    </>
                )
            }
        </div>
    )
}