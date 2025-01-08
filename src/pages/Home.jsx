import { Link } from "react-router-dom"
import BookList from "../components/book/BookList"
import Header from "../components/header/Header"

function App() {

  return (
    <>
      <Header />
      <BookList limit={4} />
      <div className="mt-8 mb-24 text-center">
        <Link
          to='/books'
          className="px-5 py-2.5 text-lg transition duration-500 ease-in-out border rounded-full border-secondary text-secondary btn hover:bg-secondary hover:text-white"
        >
          See More
        </Link>
      </div>
    </>
  )
}

export default App
