import { useCallback, useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, startAfter, limit } from "firebase/firestore";
import { db } from "../firebase/config";
import { BeatLoader } from "react-spinners";
import SingleBook from "../components/book/SingleBook";
import useTheme from "../hooks/useTheme";

const booksCollectionRef = collection(db, "books");
const maxPerPage = 8;

export default function BookList() {
    const { customColor, isDark } = useTheme()
    const [books, setBooks] = useState([]);
    const [pendingReq, setPendingReq] = useState(false);
    const [noMoreBooks, setNoMoreBooks] = useState(false);
    const [lastDoc, setLastDoc] = useState(null);
    const [firstLoad, setFirstLoad] = useState(false);

    const getBooks = useCallback(async () => {
        if (pendingReq || noMoreBooks) return;

        setPendingReq(true);

        let bookQuery;

        if (lastDoc) {
            bookQuery = query(
                booksCollectionRef,
                orderBy("title"),
                startAfter(lastDoc),
                limit(maxPerPage)
            );
        } else {
            bookQuery = query(
                booksCollectionRef,
                orderBy("title"),
                limit(maxPerPage)
            );
        }

        const snapshots = await getDocs(bookQuery);

        if (snapshots.empty) {
            setNoMoreBooks(true);
        } else {
            const newBooks = snapshots.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setBooks(prev => [...prev, ...newBooks]);
            setLastDoc(snapshots.docs[snapshots.docs.length - 1]);
        }

        if (snapshots.size < maxPerPage) {
            setNoMoreBooks(true);
        }

        setPendingReq(false);
    }, [lastDoc, noMoreBooks, pendingReq]);

    const handleScroll = useCallback(() => {
        if (noMoreBooks || pendingReq) return;

        const { scrollTop, offsetHeight } = document.documentElement;
        const { innerHeight } = window;
        const bottomOfWindow = Math.round(scrollTop) + innerHeight >= offsetHeight - 100;

        if (bottomOfWindow) {
            console.log("Bottom of window reached, fetching more books...");
            getBooks();
        }
    }, [noMoreBooks, pendingReq, getBooks]);

    useEffect(() => {
        if (!firstLoad) {
            getBooks();
            setFirstLoad(true);
        }
    }, [getBooks, firstLoad]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <div>
            <h2>Book List</h2>
            <div className="max-w-screen-xl mx-auto mt-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {books.map((book) => (
                        <SingleBook key={book.id} book={book} />
                    ))}
                </div>
            </div>
            {pendingReq && <div className={`my-7 flex items-center justify-center`}>
                <BeatLoader width={"100px"} height={"5px"} color={customColor} />
            </div>}
            {noMoreBooks && <div className={`flex items-center justify-center font-semibold space-x-1 ${isDark ? 'text-white' : ''}`}>
                <span>You are all caught up. </span>
                <span className={`my-3 text-green-600 text-md material-symbols-outlined`}>
                    check_circle
                </span>
            </div>}
        </div>
    );
}