import { Link } from "react-router-dom"
import BookList from "../components/book/BookList"
import Header from "../components/header/Header"
import upArrow from '../assets/up-arrow.png'
import useTheme from "../hooks/useTheme"
import { useEffect, useState } from "react"

function App() {
  const { isDark } = useTheme()

  const [showBtn, setShowBtn] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBtn(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <Header />
      <BookList limit={4} />
      <div className="mt-8 mb-24 text-center">
        <Link
          to='/blogs'
          className="px-5 py-2.5 text-lg transition duration-500 ease-in-out border rounded-full border-secondary text-secondary btn hover:bg-secondary hover:text-white"
        >
          See More
        </Link>
      </div>
      <button
        onClick={scrollToTop}
        type="button"
        id="to-top"
        className={`${showBtn ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} w-[50px] h-[50px] hover:bg-black transition-all ease-in-out duration-1000 rounded-full border-none outline-none cursor-pointer flex fixed bottom-5 right-5 z-50 items-center justify-center to-top-btn ${isDark ? 'bg-gray-500' : 'bg-dark'}`}>
        <img className="mb-1 w-[18px]" src={upArrow} alt="back-to-top" />
      </button>
      <h3 className="mt-6 mb-3 text-sm text-center text-gray-500">Copyright © 2025 Lit-Library. All rights reserved.</h3>
    </>
  )
}

export default App
