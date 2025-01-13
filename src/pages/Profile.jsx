import { useParams } from "react-router-dom"
import BookList from "../components/book/BookList"
import ProfileHeader from "../components/profile/ProfileHeader"
import { useEffect, useState } from "react"
import useFirestore from "../hooks/useFirestore"
import SingleBook from "../components/book/SingleBook"

export default function Profile() {
    const { id } = useParams();
    const [filter, setFilter] = useState('uploaded');
    const [userFav, setUserFav] = useState([]);
    const [userSav, setUserSav] = useState([]);

    const { getDocumentById, getAllDocuments } = useFirestore();

    const { data: userData } = getDocumentById('users', id);
    const { data: books } = getAllDocuments('books');

    useEffect(() => {
        if (userData) {
            setUserFav(userData.favorites || []);
            setUserSav(userData.saved || []);
        }
    }, [userData]);

    const userFavBooks = userFav.flatMap(fav => books.filter(book => book.id === fav));

    const userSavBooks = userSav.flatMap(sav => books.filter(book => book.id === sav))

    const query = ['uid', '==', id];

    return (
        <div className="mx-auto max-w-7xl">
            <ProfileHeader uId={id} filter={filter} setFilter={setFilter} />
            {/* uploaded */}
            {filter === 'uploaded' && <BookList query={query} />}
            {/* likes */}
            {filter === 'likes' && (
                <div className="grid grid-cols-1 gap-4 px-5 mx-auto mt-3 sm:grid-cols-2 md:grid-cols-4 max-w-7xl md:px-0">
                    {
                        userFavBooks.map((book, index) => (
                            <SingleBook key={index} book={book} />
                        ))
                    }{
                        userFavBooks.length === 0 && (
                            <p className="col-span-4 my-20 text-xl font-bold text-center text-gray-500">No Favorite Blog(s)</p>
                        )
                    }
                </div>
            )}
            {/* saved */}
            {filter === 'saved' && (
                <div className="grid grid-cols-1 gap-4 px-5 mx-auto mt-3 sm:grid-cols-2 md:grid-cols-4 max-w-7xl md:px-0">
                    {
                        userSavBooks.map((book, index) => (
                            <SingleBook key={index} book={book} />
                        ))
                    }{
                        userSavBooks.length === 0 && (
                            <p className="col-span-4 my-20 text-xl font-bold text-center text-gray-500">No Saved Blog(s)</p>
                        )
                    }
                </div>
            )}
        </div>
    );
}

