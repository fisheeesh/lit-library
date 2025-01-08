import BookList from "../components/book/BookList";
import useTheme from "../hooks/useTheme";

export default function AllBooks() {
    const { isDark } = useTheme()
    return (
        <>
            {/* Header */}
            <div className="flex flex-col items-center justify-center mt-16 mb-4 space-y-4">
                <h1 className={`text-5xl font-bold text-center ${isDark ? 'text-light' : 'text-dark'}`}>Your Daily Dose of <span className="text-secondary">Inspiration</span> and <span className="text-secondary">Knowledge</span></h1>
                <h3 className={`${isDark ? 'text-light' : 'text-dark'} text-lg`}>Transform Your Skills in the Time It Takes to Brew Coffee.</h3>
            </div>
            {/* Search Bar */}
            <div className="mb-12 text-center">
                <input type="text" className="w-full max-w-md px-5 py-3 text-lg transition duration-500 ease-in-out border border-gray-500 outline-none rounded-s-full border-1 focus:border-primary" placeholder="Search..." />
                <button className="px-5 py-3 text-lg text-center text-white border border-primary bg-primary rounded-e-full">Dropdown</button>
            </div>
            <BookList />
        </>
    )
}
