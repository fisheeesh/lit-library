import { Link, useNavigate, useParams } from "react-router-dom"
import useTheme from "../hooks/useTheme"
import { useEffect } from "react"
import useFirestore from "../hooks/useFirestore"
import ReactLinkify from "react-linkify"
import CmtForm from "../components/cmt/CmtForm"
import useAuth from "../hooks/useAuth"
import CmtList from "../components/cmt/CmtList"
import moment from "moment"

export default function BookDetail() {
    /**
     * @TODO: with json-server
     * $ import useFetch from "../hooks/useFetch"
     * ?const { data: book, error, loading } = useFetch(`http://localhost:3001/books/${params.id}`)
     */
    const { id } = useParams()

    const { isDark } = useTheme()
    const { user } = useAuth()
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

    const componentDecorator = (href, text, key) => (
        <a href={href} key={key} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {text}
        </a>
    )

    return (
        <>
            {
                error && <h3 className="my-5 text-xl font-bold text-center text-red-600">{error}</h3>
            }
            {
                loading && <h3 className={`my-5 text-xl font-bold text-center ${isDark ? 'text-white' : ''}`}>Loading...</h3>
            }
            {
                book && (
                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-3 gap-4 mt-2">
                            <div className="col-span-3 md:mb-0 md:col-span-1">
                                <img src={book.cover} alt="" className={`w-full h-[544px] rounded-lg ${error ? 'hidden' : ''}`} />
                            </div>
                            <div className="col-span-3 space-y-3 md:col-span-2">
                                <div className="flex items-center gap-3">
                                    <img src={book.userProfile} alt="" className="rounded-full h-14 w-14" />
                                    <div className="flex flex-col">
                                        <div className="flex items-start justify-between">
                                            <Link to={`/profile/${book.uid}`} className={`text-xl font-bold ${isDark ? 'text-white' : ''} cus-btn cursor-pointer`}>{book.userName}</Link>
                                        </div>
                                        <span className="text-sm text-gray-400">{moment(book.created_at.seconds * 1000).format('LLL')}</span>
                                    </div>
                                </div>
                                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : ''}`}>{book.title}</h2>
                                {/* <span className={`text-sm italic ${isDark ? 'text-white' : ''}`}>By: {book.author}</span> */}
                                <div className="flex flex-wrap gap-2">
                                    {
                                        book.categories.map(c => (
                                            <span key={c} className="px-3 py-1 text-white rounded-full bg-primary">
                                                {c}
                                            </span>
                                        ))
                                    }
                                </div>
                                <ReactLinkify componentDecorator={componentDecorator}>
                                    <p className={`${isDark ? 'text-white border-primary' : 'border-gray-200'} whitespace-pre-line border rounded-md p-3.5 h-[388px] overflow-y-scroll`}>{book.description}</p>
                                </ReactLinkify>
                            </div>
                        </div>
                        <hr className={`my-5 ${isDark ? 'border-primary' : 'border-gray-200'}`} />
                        <h1 className="mb-2 text-2xl font-bold text-secondary">Ask Me Anything</h1>
                        <div className={`pt-7 px-6 pb-5 mb-3 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`}>
                            {/* Form */}
                            {!!user && <CmtForm user={user} bookId={id} />}
                            <CmtList bookId={id} />
                        </div>
                    </div>
                )
            }
        </>
    )
}