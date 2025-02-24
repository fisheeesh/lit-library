import BookList from "../components/book/BookList"
import Header from "../components/header/Header"
import ScrollTopBtn from "../components/btns/ScrollTopBtn"
import SeeMoreBtn from "../components/btns/SeeMoreBtn"
import CopyRight from "../components/copyright/CopyRight"

function App() {

  return (
    <>
      <Header />
      <BookList limit={4} />
      <SeeMoreBtn />
      <ScrollTopBtn />
      <CopyRight />
    </>
  )
}

export default App
