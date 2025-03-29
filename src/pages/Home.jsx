import BookList from "../components/book/BookList"
import Header from "../components/landing/Header"
import SeeMoreBtn from "../components/btns/SeeMoreBtn"
import TestimonialSection from "../components/landing/Testimonials"
import Footer from "../components/landing/Footer"
import FeebackBox from "../components/landing/FeebackBox"
import useAuth from "../hooks/useAuth"
import FutureUpdates from "../components/landing/FutureUpdates"

function App() {
  const { user } = useAuth()

  return (
    <>
      <Header />
      <BookList limit={4} />
      <SeeMoreBtn />
      <FutureUpdates />
      <TestimonialSection />
      {user && <FeebackBox />}
      <Footer />
    </>
  )
}

export default App
