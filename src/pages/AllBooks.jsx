import { useEffect, useMemo, useState } from "react";
import BookList from "../components/book/BookList";
import { useLocation, useNavigate } from "react-router-dom";
import useFirestore from "../hooks/useFirestore";
import useKey from "../hooks/useKey";
import ScrollTopBtn from "../components/btns/ScrollTopBtn";
import SearchBar from "../components/searchBar/SearchBar";
import DropDownBtn from "../components/btns/DropDownBtn";
import Heading from "../components/heading/Heading";

export default function AllBooks() {
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

    //? Extract unique categories from books
    const uniqueCategories = useMemo(() => {
        const allCategories = [];
        books.forEach(book => {
            book.categories.forEach(category => allCategories.push(category));
        });
        return ['All', ...new Set(allCategories)];
    }, [books]);

    //? Update the URL with the current search query and selected category
    const updateURL = (search, category) => {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (category && category !== 'All') params.set('category', category);
        navigate(`/blogs?${params.toString()}`, { replace: true });
    };

    //? Handle the search submission
    const handleSearch = (e) => {
        e.preventDefault();
        updateURL(search, selectedCategory);
    };

    //? Set the page title when mounting and reset it on unmount
    useEffect(() => {
        document.title = 'LitLibrary | Blogs';

        return () => {
            document.title = 'LitLibrary';
        };
    }, []);

    //? If user click 'Escape' key, navigate to previous page
    useKey('Escape', () => navigate(-1))

    return (
        <div className="pb-3">
            {/* Header */}
            <Heading />
            {/* Search Bar */}
            <div className="flex items-center justify-center gap-2 px-5 mb-17">
                <SearchBar search={search} setSearch={setSearch} onSearch={handleSearch} />
                {/* Dropdown Button */}
                <DropDownBtn selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} isOpen={isOpen} setIsOpen={setIsOpen} uniqueCategories={uniqueCategories} updateURL={updateURL} search={search} />
            </div>
            {/* BookList */}
            <BookList order="asc" field="title" />
            {/* Scroll to Top Button */}
            <ScrollTopBtn />
        </div>
    );
}