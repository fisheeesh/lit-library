import { useParams } from "react-router-dom";
import BookList from "../components/book/BookList";
import ProfileHeader from "../components/profile/ProfileHeader";
import { useEffect, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import SingleBook from "../components/book/SingleBook";

export default function Profile() {
    const { id } = useParams();
    const [filter, setFilter] = useState("uploaded");
    const [userFav, setUserFav] = useState([]);
    const [userSav, setUserSav] = useState([]);

    const { getDocumentById, getAllDocuments } = useFirestore();
    const { data: userData } = getDocumentById("users", id);
    const { data: books } = getAllDocuments("books");

    useEffect(() => {
        document.title = 'Profile'
        return () => document.title = 'LitLibrary'
    }, [filter])

    useEffect(() => {
        if (userData) {
            setUserFav(userData.favorites || []);
            setUserSav(userData.saved || []);
        }
    }, [userData]);

    const userFavBooks = userFav.flatMap((fav) => books.filter((book) => book.id === fav));
    const userSavBooks = userSav.flatMap((sav) => books.filter((book) => book.id === sav));

    const query = ["uid", "==", id];

    return (
        <div className="max-w-screen-xl mx-auto mt-2 overflow-x-hidden px-7">
            {/* Profile Header */}
            <ProfileHeader uId={id} filter={filter} setFilter={setFilter} />
            {/* Uploaded Books Section */}
            {filter === "uploaded" && <BookList query={query} />}

            {/* Favorite Books Section */}
            {filter === "likes" && (
                <div className="grid grid-cols-1 gap-6 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {userFavBooks.length > 0 ? (
                        userFavBooks.map((book, index) => <SingleBook key={index} book={book} />)
                    ) : (
                        <p className="col-span-4 my-20 text-xl font-bold text-center text-gray-500">
                            No Favorite Blog(s)
                        </p>
                    )}
                </div>
            )}

            {/* Saved Books Section */}
            {filter === "saved" && (
                <div className="grid grid-cols-1 gap-6 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {userSavBooks.length > 0 ? (
                        userSavBooks.map((book, index) => <SingleBook key={index} book={book} />)
                    ) : (
                        <p className="col-span-4 my-20 text-xl font-bold text-center text-gray-500">
                            No Saved Blog(s)
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}