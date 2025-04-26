/* eslint-disable react/prop-types */
import { BeatLoader } from "react-spinners";
import useFirestore from "../../hooks/useFirestore";
import useTheme from "../../hooks/useTheme";
import SingleBook from "./SingleBook";
import { useLocation } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import oopsAnimation from '../../assets/animations/oops.lottie'

export default function BookList({ limit = null, query = null, field = 'created_at', order = 'desc' }) {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const searchValue = params.get('search');
    const filterValue = params.get('category');

    const { getAllDocuments } = useFirestore();

    // Fetch data
    const { data: books, error: erroR, loading: loadinG } = getAllDocuments(
        'books',
        query,
        query ? null : {
            field: 'title',
            value: searchValue,
            filter: filterValue
        },
        field,
        order
    );

    const { isDark } = useTheme();
    const customColor = !isDark ? "#4555d2" : "#cc2973";
    const loaderClasses = "my-40 flex items-center justify-center";

    // Handle loading, error, and no data cases
    if (erroR) {
        return <h3 className="my-24 text-xl font-bold text-center text-gray-500">{erroR}</h3>;
    }

    if (loadinG) {
        return (
            <div className={loaderClasses}>
                <BeatLoader width={"100px"} height={"5px"} color={customColor} />
            </div>
        );
    }

    if (!books?.length) {
        return (
            <div className="flex flex-col items-center justify-center mt-16">
                <DotLottieReact
                    src={oopsAnimation}
                    loop
                    autoplay
                    style={{ width: "200px", height: "200px" }}
                />
                <h3 className="text-xl font-bold text-center text-gray-500">Oops. No Blog(s) Found.</h3>
            </div>
        )
    }

    // Determine books to display
    const displayedBooks = limit ? books.slice(0, limit) : books;

    return (
        <div className={`max-w-screen-xl mx-auto mt-5 ${query ? '' : 'px-7'}`}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {displayedBooks.map((book) => (
                    <SingleBook key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
}