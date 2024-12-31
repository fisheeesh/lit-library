import BookList from "../components/BookList"
import HeroSection from "../components/HeroSection"
import useFirestore from "../hooks/useFirestore"

function App() {
  const { getAllDocuments } = useFirestore()
  const { data: books, error, loading } = getAllDocuments('books')

  return (
    <>
      <HeroSection />
      <BookList books={books} error={error} loading={loading} />
    </>
  )
}

export default App
