import { useParams } from "react-router-dom"
import BookList from "../components/book/BookList"
import ProfileHeader from "../components/profile/ProfileHeader"

export default function Profile() {
    const { id } = useParams()

    const query = ['uid', '==', id]

    return (
        <div className="mx-auto max-w-7xl">
            <ProfileHeader uId={id} />
            <BookList query={query} />
        </div>
    )
}

