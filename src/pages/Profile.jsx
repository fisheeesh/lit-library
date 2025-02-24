import { useParams } from "react-router-dom";
import BookList from "../components/book/BookList";
import ProfileHeader from "../components/profile/ProfileHeader";
import { useEffect, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import BookCollection from "../components/book/BookCollection";

export default function Profile() {
    const { id } = useParams();
    const [filter, setFilter] = useState("uploaded");
    const [userFav, setUserFav] = useState([]);
    const [userSav, setUserSav] = useState([]);

    const { getDocumentById, getAllDocuments } = useFirestore();
    const { data: userData } = getDocumentById("users", id);
    const { data: books } = getAllDocuments("books");

    //? Update the document title based on the selected filter
    useEffect(() => {
        if (filter === 'uploaded') document.title = 'Profile | Uploaded'
        if (filter === 'likes') document.title = 'Profile | Likes'
        if (filter === 'saved') document.title = 'Profile | Saved'

        return () => document.title = 'LitLibrary'
    }, [filter])

    //? Update user's favorite and saved books when user data changes
    useEffect(() => {
        if (userData) {
            setUserFav(userData.favorites || []);
            setUserSav(userData.saved || []);
        }
    }, [userData]);

    //? Filter books to match user's favorite book IDs
    const userFavBooks = userFav.flatMap((fav) => books.filter((book) => book.id === fav));

    //? Filter books to match user's saved book IDs
    const userSavBooks = userSav.flatMap((sav) => books.filter((book) => book.id === sav));

    //$ Query to get books uploaded by the user
    const query = ["uid", "==", id];

    return (
        <div className="max-w-screen-xl mx-auto mt-2 overflow-x-hidden px-7">
            {/* Profile Header */}
            <ProfileHeader uId={id} filter={filter} setFilter={setFilter} />

            {/* Uploaded Books Section */}
            {filter === "uploaded" && <BookList query={query} />}

            {/* Favorite Books Section */}
            {filter === "likes" && (
                <BookCollection books={userFavBooks} emptyMessage={'No Favorite Blog(s)'} />
            )}

            {/* Saved Books Section */}
            {filter === "saved" && (
                <BookCollection books={userSavBooks} emptyMessage={'No Saved Blog(s)'} />
            )}
        </div>
    );
}