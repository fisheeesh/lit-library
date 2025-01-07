import BookList from "../components/book/BookList"
import Header from "../components/header/Header"
import useFirestore from "../hooks/useFirestore"

function App() {
  const { getAllDocuments } = useFirestore()
  const { data: books, error, loading } = getAllDocuments('books')

  return (
    <>
      <Header />
      <BookList books={books} error={error} loading={loading} />
    </>
  )
}

export default App
