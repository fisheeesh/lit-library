import BookList from "../components/BookList"
import ProfileHeader from "../components/ProfileHeader"
import useAuth from "../hooks/useAuth"
import useFirestore from "../hooks/useFirestore"
import useTheme from "../hooks/useTheme"

export default function Profile() {
    const { getAllDocuments } = useFirestore()
    const { user } = useAuth()
    const { isDark } = useTheme()

    const { data: books, error, loading } = getAllDocuments('books', ['uid', '==', user.uid])

    return (
        <>
            <ProfileHeader user={user} isDark={isDark} books={books} />
            <h1 className="mt-8 mb-3 text-3xl font-bold text-primary">My Library 📚</h1>
            <hr />
            <BookList books={books} error={error} loading={loading} />
        </>
    )
}

