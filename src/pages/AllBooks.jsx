import { useState } from "react";
import BookList from "../components/book/BookList";
import useTheme from "../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import useFirestore from "../hooks/useFirestore";

export default function AllBooks() {
    const { isDark } = useTheme()

    const params = new URLSearchParams(location.search)
    const searchValue = params.get('search') || '';
    const filterValue = params.get('category') || 'All';

    const [search, setSearch] = useState(searchValue)
    const [selectedCategory, setSelectedCategory] = useState(filterValue)
    const [isOpen, setIsOpen] = useState(false)
    const { getAllDocuments } = useFirestore()

    const { data: books } = getAllDocuments('books')

    const allCategories = []

    books.forEach(book => {
        // console.log(book.categories)
        book.categories.forEach(category => {
            // console.log(category)
            allCategories.push(category)
        })
    })

    let uniqueCategories = allCategories.filter((category, index, array) => {
        return array.indexOf(category) === index
    })
    uniqueCategories.unshift('All')

    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()

        const filteredValue = selectedCategory !== 'All' ? selectedCategory : ''
        navigate(`/books/?search=${search}${filteredValue ? `&category=${filteredValue}` : ''}`)
    }

    return (
        <>
            {/* Header */}
            <div className="flex flex-col items-center justify-center mt-16 mb-4 space-y-4">
                <h1 className={`text-5xl font-bold text-center ${isDark ? 'text-light' : 'text-dark'}`}>Your Daily Dose of <span className="text-secondary">Inspiration</span> and <span className="text-secondary">Knowledge</span></h1>
                <h3 className={`${isDark ? 'text-light' : 'text-dark'} text-lg`}>Transform Your Skills in the Time It Takes to Brew Coffee.</h3>
            </div>
            {/* Search Bar */}
            <div className="flex items-center justify-center gap-2 px-5 mb-12">
                <input onKeyDown={e => e.key === 'Enter' && handleSearch(e)} value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="px-5 py-4 text-lg transition duration-500 ease-in-out border border-gray-500 rounded-2xl outline-none w-[300px] sm:w-[500px] md:w-[700px] border-1 focus:border-primary" placeholder="Press 'Enter' to Search" />
                {/* DropDown */}
                <div className="relative flex flex-col items-center rounded-lg w-[190px]">
                    <button type="button" onClick={() => setIsOpen(prevState => !prevState)} className="text-sm text-light flex items-center justify-between w-full p-2.5 font-bold tracking-wider duration-300 bg-primary border-4 border-transparent rounded-2xl active:border-white active:text-white">
                        {selectedCategory.length > 15 ? selectedCategory.slice(0, 13) + '...' : selectedCategory}
                        {
                            !isOpen ?
                                (
                                    <AiOutlineCaretDown className="h-8" />
                                )
                                :
                                (
                                    <AiOutlineCaretUp className="h-8" />
                                )
                        }
                    </button>
                    {
                        isOpen && (
                            <div className="absolute z-10 flex flex-col items-start w-full px-3 py-3 bg-primary rounded-2xl top-16">
                                {
                                    uniqueCategories.map((cate, index) => (
                                        <h3
                                            onClick={() => {
                                                setSelectedCategory(cate);
                                                const updatedSearch = search ? `search=${search}&` : '';
                                                navigate(`/books/?${updatedSearch}category=${cate !== 'All' ? cate : 'All'}`); // Use 'filter' as key
                                                setIsOpen(false);
                                            }}
                                            key={index}
                                            className="text-sm font-bold text-light flex w-full py-2.5 border-l-4 rounded-r-xl cursor-pointer hover:border-l-secondary hover:bg-blue-300 border-l-transparent"
                                        >
                                            {cate}
                                        </h3>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
            <BookList />
        </>
    )
}
