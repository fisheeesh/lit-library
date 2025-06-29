import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import useTheme from "../hooks/useTheme"
import { useEffect, useState } from "react"
import useFirestore from "../hooks/useFirestore"
import ReactLinkify from "react-linkify"
import CmtForm from "../components/cmt/CmtForm"
import useAuth from "../hooks/useAuth"
import CmtList from "../components/cmt/CmtList"
import moment from "moment"
import { BeatLoader } from "react-spinners"
import useKey from "../hooks/useKey"
import toast from "react-hot-toast"
import NotFound from "./error/NotFound"
import defaultProfile from '../assets/default_profile.jpg'
import { Check, Copy, ImageMinus } from "lucide-react"
import ImagePreview from "../components/book/ImagePreview"
import Modal from "../components/modal/Modal"

export default function BookDetail() {
    const location = useLocation()
    const { id } = useParams()

    const { isDark } = useTheme()
    const customColor = !isDark ? "#4555d2" : "#cc2973"
    const { user, DEVELOPER_UID } = useAuth()
    const navigate = useNavigate()

    const [copied, setCopied] = useState(false);
    const [coverLoading, setCoverLoading] = useState(true);
    const [coverError, setCoverError] = useState(false);

    const { getDocumentById, updateDocument, addDocument } = useFirestore()

    const { data: book, setData, error, loading } = getDocumentById('books', id)

    //$ If there is no user, then userData will be null. So we all fetch the data if only the user is logged in
    const { data: userData } = getDocumentById('users', user?.uid || 'default-fallback-uid');
    const { data: ownerData } = getDocumentById('users', book?.uid || "default-fallback-uid");

    //? Check if there is scrollTo as params in URL, if so then scroll to comments
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        if (params.get("scrollTo") === "comments") {
            setTimeout(() => {
                document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" })
            }, 500)
        }
    }, [location])

    useEffect(() => {
        if (error) {
            setData(null)
        }
    }, [error, setData])

    // Reset loading states when book changes
    useEffect(() => {
        if (book?.cover) {
            setCoverLoading(true);
            setCoverError(false);
        }
    }, [book?.cover]);

    const componentDecorator = (href, text, key) => (
        <a href={href} key={key} target="_blank" rel="noopener_noreferrer" className="text-blue-500 underline">
            {text}
        </a>
    )

    const handleCoverLoad = () => {
        setCoverLoading(false);
    };

    const handleCoverError = () => {
        setCoverLoading(false);
        setCoverError(true);
    };

    const renderCoverImage = () => {
        if (!book.cover || coverError) {
            return (
                <div className={`${isDark ? 'bg-indigo-900' : 'bg-gray-200'} flex items-center justify-center w-full h-full rounded-lg p-24 md:p-0`}>
                    <ImageMinus className="w-12 h-12 text-gray-400" />
                </div>
            );
        }

        return (
            <div className="relative w-full h-full">
                {/* Cover skeleton */}
                {coverLoading && (
                    <div className={`absolute inset-0 rounded-lg animate-pulse ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}>
                        <div className={`w-full h-full rounded-lg ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
                    </div>
                )}

                {/* Actual cover image */}
                <img
                    src={book.cover}
                    alt=""
                    className={`blog_cover object-fill w-full h-full rounded-lg transition-opacity duration-300 ${coverLoading ? 'opacity-0' : 'opacity-100'} ${error ? 'hidden' : ''}`}
                    onLoad={handleCoverLoad}
                    onError={handleCoverError}
                />
            </div>
        );
    };

    const renderProfileImage = () => {
        return (
            <img src={ownerData?.photoURL || defaultProfile} alt="user_profile" className="h-[52px] rounded-full w-[52px]" />
        );
    };

    const toggleFavorite = async (bookId) => {
        if (!user) {
            //$ Handle the case when user is not logged in
            navigate("/auth");
            return;
        }

        if (user.uid === book.uid) {
            toast("No matter how hard your life is. Do not try to react on your own post 😉", {
                duration: 3000,
                removeDelay: 1000,
                position: "top-center",
                style: {
                    background: "#3B82F6",
                    color: "#FFFFFF",
                },
            });
            return
        }

        if (userData.favorites.includes(bookId)) {
            book.likes_count -= 1
            await updateDocument('users', user?.uid, { favorites: userData.favorites.filter(fav => fav !== bookId) }, false)
            await updateDocument('books', bookId, { likes_count: book.likes_count }, false)
        }
        else {
            const newNoti = {
                uid: book?.uid,
                senderPhotoURL: user?.photoURL,
                senderName: user?.displayName,
                bookId: book?.id,
                isComment: false,
            }
            book.likes_count += 1
            await updateDocument('users', user?.uid, { favorites: [...userData.favorites, bookId] }, false)
            await updateDocument('books', bookId, { likes_count: book.likes_count }, false)
            await addDocument('notifications', newNoti)
        }
    }

    useEffect(() => {
        if (!book?.title) return
        document.title = `LitLibrary | ${book?.title}`

        return () => {
            document.title = 'LitLibrary'
        }
    }, [book?.title])

    useKey('Escape', () => navigate(-1))

    const minutesOfRead = Math.ceil(book?.description.split(' ')?.length / 200)

    const bookUrl = `${window.location.origin}/blogs/${id}`;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(bookUrl);
            setCopied(true);
            toast.success("Blog link copied!");
            setTimeout(() => setCopied(false), 2000);

        } catch (error) {
            toast.error("Failed to copy link");
            console.error("Error copying link:", error);
        }
    };

    return (
        <>
            {
                error && <NotFound custom={true} />
            }
            {
                loading && <div className={`my-56 flex gap-2 flex-col items-center justify-center`}>
                    <BeatLoader width={"100px"} height={"5px"} color={customColor} />
                    <span className="text-lg dark:text-slate-50">Loading blog detials...</span>
                </div>
            }
            {
                book && (
                    <div className="max-w-screen-xl mx-auto px-7">
                        <div className="grid grid-cols-3 gap-4 mt-2">
                            <Modal>
                                <Modal.Opens opens={'cover_preview'}>
                                    <div className="col-span-3 cursor-pointer md:mb-0 md:col-span-1">
                                        {/* Cover */}
                                        {renderCoverImage()}
                                    </div>
                                </Modal.Opens>
                                <Modal.Window name={'cover_preview'}>
                                    <ImagePreview image={book.cover} />
                                </Modal.Window>
                            </Modal>
                            <div className="col-span-3 space-y-3 md:col-span-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {/* Profile */}
                                        {renderProfileImage()}
                                        <div className="flex flex-col">
                                            <div className="flex items-start gap-1">
                                                {/* Username */}
                                                <Link to={`/profile/${book.uid}`} className={`md:text-xl text-lg font-bold ${isDark ? 'text-white' : ''} cus-btn cursor-pointer`}>{ownerData?.displayName || 'User'}</Link>

                                                {/* Privilege */}
                                                {book.uid === DEVELOPER_UID && <div className="relative mt-1 group">
                                                    <span className="text-[16px] cursor-pointer text-secondary material-symbols-outlined">check_circle</span>
                                                    <span className="absolute px-3 py-1 text-white transition-all rounded-md opacity-0 pointer-events-none -left-20 bg-dark top-full group-hover:opacity-100 group-hover:translate-y-2 whitespace-nowrap">
                                                        Developer of LitLibrary
                                                    </span>
                                                </div>}
                                                {book.uid === '0YqTtVfsHtZa6TIaxh8FabqkQhe2' && <div className="relative mt-1 group">
                                                    <span className="text-[16px] cursor-pointer text-secondary material-symbols-outlined">check_circle</span>
                                                    <span className="absolute px-3 py-1 text-white transition-all rounded-md opacity-0 pointer-events-none -left-20 bg-dark top-full group-hover:opacity-100 group-hover:translate-y-2 whitespace-nowrap">
                                                        The Official Account of LitLibrary
                                                    </span>
                                                </div>}

                                            </div>
                                            <span className="hidden text-sm text-gray-400 md:inline">{moment(book.created_at.seconds * 1000).format('LLL')}</span>
                                            <span className="text-sm text-gray-400 md:hidden">{moment(book.created_at.seconds * 1000).format('LL')}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button type="button" onClick={handleCopyLink} className={`${isDark ? 'text-light hover:border-gray-100 hover:text-gray-100' : 'hover:border-black hover:text-black'} flex items-center gap-2 py-1.5 px-2.5 md:py-2 md:px-3 border-gray-400 transition-colors duration-300 border rounded-lg `}>
                                            {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                                            <span className="hidden md:block">{copied ? 'Copied' : 'CopyLink'}</span>
                                        </button>
                                        {/* Like Button */}
                                        <button
                                            onClick={() => toggleFavorite(book.id)}
                                            type="button"
                                            className={`px-2.5 py-1 md:px-3 md:py-2 border ${userData?.favorites?.includes(book.id) ? 'border-red-600' : 'border-gray-400'} text-sm rounded-full cursor-pointer flex items-center space-x-2`}
                                        >
                                            {userData?.favorites?.includes(book.id) ?
                                                (<svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                </svg>) :
                                                (<svg xmlns="http://www.w3.org/2000/svg" fill={isDark ? 'white' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                </svg>)
                                            }
                                            <span className={`text-[16px] hidden md:inline-block ${isDark ? 'text-white' : ''}`}>{book.likes_count}</span>
                                        </button>
                                    </div>
                                </div>
                                {/* Title */}
                                <h2 className={`text-lg md:text-xl font-bold ${isDark ? 'text-white' : ''}`}>{book.title} <span className={`text-xs md:text-sm mb-1 font-normal italic text-gray-500`}>({minutesOfRead}-minute{minutesOfRead !== 1 && 's'} read)</span></h2>
                                {/* Categoreis */}
                                <div className="flex flex-wrap gap-2">
                                    {
                                        book.categories.map(c => (
                                            <span key={c} className="px-3 py-1 mb-1 text-white rounded-full bg-primary">
                                                {c}
                                            </span>
                                        ))
                                    }
                                </div>
                                {/* Description */}
                                <ReactLinkify componentDecorator={componentDecorator} >
                                    <p className={`${isDark ? 'text-white border-primary' : 'border-gray-200'} whitespace-pre-line border rounded-md p-3.5 h-[400px] book-des overflow-y-scroll`}>{book.description}</p>
                                </ReactLinkify>
                            </div>
                        </div>
                        {/* Horizontal Line */}
                        <hr className={`my-5 ${isDark ? 'border-primary' : 'border-gray-200'}`} />
                        {/* Heading */}
                        <h1 className="mb-2 text-lg font-bold sm:text-xl md:text-2xl text-secondary">Say something...</h1>
                        {/* Cmt List/Form */}
                        <div id="comments" className={`pt-7 px-6 pb-5 mb-3 rounded-3xl drop-shadow-lg ${isDark ? 'bg-dbg shadow-custom-white' : 'bg-light'}`}>
                            {user ? <CmtForm user={user} book={book} /> : <h3 className={`${isDark ? 'text-light' : 'text-dark'} text-center my-5 text-sm md:text-lg`}>If you want to say something, please <span onClick={() => navigate('/auth')} className="font-bold cursor-pointer text-primary cus-btn">Join</span> us to contribute 📣 ✨</h3>}
                            <CmtList bookId={id} />
                        </div>
                    </div>
                )
            }
        </>
    )
}