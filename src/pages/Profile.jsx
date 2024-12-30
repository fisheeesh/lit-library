import SingleBook from "../components/SingleBook"
import useAuth from "../hooks/useAuth"
import useFirestore from "../hooks/useFirestore"
import useTheme from "../hooks/useTheme"

export default function Profile() {
    const { user } = useAuth()
    const { isDark } = useTheme()

    const { getAllDocuments } = useFirestore()

    const { data: books, error, loading } = getAllDocuments('books', ['uid', '==', user.uid])

    if (error) {
        return <h3 className='my-6 text-3xl font-bold text-center text-red-600'>{error}</h3>
    }

    return (
        <>
            <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="flex justify-start col-span-3 gap-4 md:col-span-2">
                    <img
                        src="https://avatars.githubusercontent.com/u/137766427?v=4"
                        alt="Profile"
                        className="mt-0.5 rounded-3xl w-44 h-44"
                    />
                    <div className="mt-3">
                        <h2 className="text-3xl font-bold text-primary">{user.displayName}</h2>
                        <div className="flex items-center gap-2">
                            <span className={`material-symbols-outlined ${isDark ? 'text-white' : ''}`}>
                                mail
                            </span>
                            <h3 className={`text-md ${isDark ? 'text-white' : ''}`}>Email: {user.email}</h3>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col col-span-3 md:justify-center md:items-center rounded-3xl md:col-span-1">
                    <div className="text-center bg-secondary rounded-3xl py-9 px-7">
                        <h2 className="text-3xl text-white">{books.length}</h2>
                        <h2 className="text-3xl font-bold text-white">Books</h2>
                        <h2 className="text-3xl font-bold text-white">Uploaded</h2>
                    </div>
                </div>
            </div>

            <h1 className="mt-8 mb-3 text-3xl font-bold text-primary">My Library 📚</h1>
            {loading && <h3 className='my-6 text-center'>Loading...</h3>}
            {
                !loading && !!books && (
                    <div className="grid grid-cols-2 gap-4 my-3 md:grid-cols-4">
                        {books.map(book => (
                            <SingleBook book={book} key={book.id} />
                        ))}
                    </div>
                )
            }
            {
                !loading && !books.length && (
                    <h3 className='my-6 text-3xl font-bold text-center text-gray-500'>No Books Found.</h3>
                )
            }
        </>
    )
}

