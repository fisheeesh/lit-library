import { Link, useNavigate, useParams } from "react-router-dom"
import useTheme from "../hooks/useTheme"
import { useEffect, useState } from "react"
import useFirestore from "../hooks/useFirestore"
import ReactLinkify from "react-linkify"
import CmtForm from "../components/cmt/CmtForm"
import useAuth from "../hooks/useAuth"
import CmtList from "../components/cmt/CmtList"
import moment from "moment"
import { PropagateLoader } from "react-spinners"

export default function BookDetail() {
    const { id } = useParams()

    const { isDark } = useTheme()
    const { user } = useAuth() // Check user status
    const navigate = useNavigate()

    const [isFavorite, setIsFavorite] = useState({})
    const [favorites, setFavorites] = useState([])

    const { getDocumentById, updateDocument } = useFirestore()

    const { data: book, setData, error, loading } = getDocumentById('books', id)

    //$ If the user is not logged in, don't try to fetch the user data
    const { data: userData } = user ? getDocumentById('users', user?.uid) : { data: null }

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

    const customColor = !isDark ? "#4555d2" : "#cc2973"

    const toggleFavorite = async (bookId) => {
        if (!user) {
            //$ Handle the case when user is not logged in
            navigate("/auth");
            return;
        }

        setIsFavorite(prevFav => ({
            ...prevFav,
            [bookId]: !prevFav[bookId]
        }))

        if (!isFavorite[bookId]) {
            setFavorites(prevFav => [...prevFav, bookId])
            await updateDocument('users', user?.uid, { favorites: [...favorites, bookId] }, false)
        }
        else {
            setFavorites(prevFav => prevFav.filter(fav => fav !== bookId))
            await updateDocument('users', user?.uid, { favorites: favorites.filter(fav => fav !== bookId) }, false)
        }
    }

    return (
        <>
            {
                error && <h3 className="my-5 text-xl font-bold text-center text-red-600">{error}</h3>
            }
            {
                loading && <div className={`my-56 flex items-center justify-center`}>
                    <PropagateLoader width={"150px"} height={"5px"} color={customColor} />
                </div>
            }
            {
                book && (
                    <div className="px-5 mx-auto max-w-7xl md:px-0">
                        <div className="grid grid-cols-3 gap-4 mt-2">
                            <div className="col-span-3 md:mb-0 md:col-span-1">
                                <img src={book.cover} alt="" className={`w-full h-[544px] rounded-lg ${error ? 'hidden' : ''}`} />
                            </div>
                            <div className="col-span-3 space-y-3 md:col-span-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img src={book.userProfile} alt="" className="rounded-full h-14 w-14" />
                                        <div className="flex flex-col">
                                            <div className="flex items-start justify-between">
                                                <Link to={`/profile/${book.uid}`} className={`text-xl font-bold ${isDark ? 'text-white' : ''} cus-btn cursor-pointer`}>{book.userName}</Link>
                                            </div>
                                            <span className="text-sm text-gray-400">{moment(book.created_at.seconds * 1000).format('LLL')}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleFavorite(id)}
                                        type="button"
                                        className={`px-3.5 py-2 border ${userData?.favorites?.includes(id) ? 'border-red-600' : 'border-gray-400'} text-sm rounded-full cursor-pointer flex items-center space-x-2`}
                                    >
                                        {userData?.favorites?.includes(id) ?
                                            (<svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                            </svg>) :
                                            (<svg xmlns="http://www.w3.org/2000/svg" fill={isDark ? 'white' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                            </svg>)
                                        }
                                        <span className={`text-[16px] ${isDark ? 'text-white' : ''}`}>100</span>
                                    </button>
                                </div>
                                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : ''}`}>{book.title}</h2>
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
                        <h1 className="mb-2 text-2xl font-bold text-secondary">Say something...</h1>
                        <div className={`pt-7 px-6 pb-5 mb-3 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`}>
                            {user ? <CmtForm user={user} bookId={id} /> : <h3 className={`${isDark ? 'text-light' : 'text-dark'} text-center my-5 text-sm md:text-lg`}>If you want to say something, please <span onClick={() => navigate('/auth')} className="font-bold cursor-pointer text-primary cus-btn">Join</span> us to contribute 📣 ✨</h3>}
                            <CmtList bookId={id} />
                        </div>
                    </div>
                )
            }
        </>
    )
}