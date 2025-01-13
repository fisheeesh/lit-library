import { useMemo, useState } from "react";
import BookList from "../components/book/BookList";
import useTheme from "../hooks/useTheme";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import useFirestore from "../hooks/useFirestore";

export default function AllBooks() {
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const initialSearch = params.get('search') || '';
    const initialCategory = params.get('category') || 'All';

    const [search, setSearch] = useState(initialSearch);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [isOpen, setIsOpen] = useState(false);

    const { getAllDocuments } = useFirestore();
    const { data: books } = getAllDocuments('books');

    const uniqueCategories = useMemo(() => {
        const allCategories = [];
        books.forEach(book => {
            book.categories.forEach(category => allCategories.push(category));
        });
        return ['All', ...new Set(allCategories)];
    }, [books]);

    const updateURL = (search, category) => {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (category && category !== 'All') params.set('category', category);
        navigate(`/blogs?${params.toString()}`, { replace: true });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        updateURL(search, selectedCategory);
    };

    return (
        <>
            {/* Header */}
            <div className="flex flex-col items-center justify-center mt-16 mb-4 space-y-4">
                <h1 className={`md:text-5xl text-3xl sm:text-4xl font-bold text-center ${isDark ? 'text-light' : 'text-dark'} tracking-wide`}>
                    Your Daily Dose of <span className="text-secondary">Inspiration</span> and <span className="text-secondary">Knowledge</span>
                </h1>
                <h3 className={`${isDark ? 'text-light' : 'text-dark'} text-center text-md md:text-lg tracking-wide`}>
                    Transform Your Skills in the Time! It Takes to Brew Coffee.
                </h3>
            </div>

            {/* Search Bar */}
            <div className="flex items-center justify-center gap-2 px-5 mb-10">
                <input
                    value={search}
                    onKeyDown={e => e.key === 'Enter' && handleSearch(e)}
                    onChange={e => setSearch(e.target.value)}
                    type="text"
                    className="md:px-5 md:py-4 px-3 py-3 text-lg transition duration-500 ease-in-out border border-gray-500 rounded-2xl outline-none w-[300px] sm:w-[500px] md:w-[700px] border-1 focus:border-primary"
                    placeholder="Press 'Enter' to Search"
                />
                {/* Dropdown */}
                <div className="relative flex flex-col items-center rounded-lg w-[190px]">
                    <button
                        type="button"
                        onClick={() => setIsOpen(prev => !prev)}
                        className="text-sm text-light flex items-center justify-between w-full md:p-2.5 p-1.5 font-bold tracking-wider duration-300 bg-primary border-4 border-transparent rounded-2xl active:border-white active:text-white"
                    >
                        {selectedCategory.length > 15 ? selectedCategory.slice(0, 13) + '...' : selectedCategory}
                        {isOpen ? <AiOutlineCaretUp className="h-8" /> : <AiOutlineCaretDown className="h-8" />}
                    </button>
                    {isOpen && (
                        <div className="absolute z-10 flex flex-col items-start w-full px-3 py-3 bg-primary rounded-2xl top-16">
                            {uniqueCategories.map((cate, index) => (
                                <h3
                                    key={index}
                                    onClick={() => {
                                        setSelectedCategory(cate);
                                        updateURL(search, cate);
                                        setIsOpen(false);
                                    }}
                                    className="text-sm font-bold text-light flex w-full py-2.5 border-l-4 rounded-r-xl cursor-pointer hover:border-l-secondary hover:bg-blue-300 border-l-transparent"
                                >
                                    {cate}
                                </h3>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <BookList />
        </>
    );
}