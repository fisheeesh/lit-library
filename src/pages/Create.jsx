import { useEffect, useState } from "react"
import useFetch from "../hooks/useFetch"
import { useNavigate } from "react-router-dom"
import useTheme from "../hooks/useTheme"

export default function Create() {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [categories, setCategories] = useState([])

  const { data: newBook, setPostData, loading } = useFetch('http://localhost:3001/books', "POST")

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    if (title.trim() === '' || author.trim() === '' || description.trim() === '') {
      return
    }

    let newBook = {
      title: title.trim(),
      author: author.trim(),
      description: description.trim(),
      categories: categories
    }

    setPostData(newBook)
    // console.log(newBook)
  }

  const addCategory = () => {
    if (categories.includes(newCategory) || newCategory === '') {
      setNewCategory('')
      return
    }

    setCategories(prevCate => [...prevCate, newCategory])
    setNewCategory('')
  }

  const deleteCategory = (category) => {
    setCategories(prevCate => prevCate.filter(c => c !== category))
  }

  useEffect(() => {
    if (newBook) {
      navigate('/')
    }
  }, [newBook, navigate])

  const { isDark } = useTheme()

  return (
    <div className="h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-lg px-5 py-5 mx-auto mt-3 rounded-md">
        <div className="flex items-center gap-2 mt-1 mb-7">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 ${isDark ? 'text-white' : 'text-primary'}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>
          <h3 className="text-3xl font-bold text-primary">Create a book.</h3>
        </div>
        <div className="flex flex-wrap mb-6 -mx-3">
          <div className="w-full px-3 md:w-1/2">
            <label className={`block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase ${isDark ? 'text-white' : ''}`} htmlFor="book-title">
              Title
            </label>
            <input onKeyDown={e => e.key === 'Enter' && e.preventDefault()} onChange={e => setTitle(e.target.value)} value={title} className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" id="book-title" type="text" placeholder="Title" />
          </div>
          <div className="w-full px-3 md:w-1/2">
            <label className={`block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase ${isDark ? 'text-white' : ''}`} htmlFor="book-author">
              Author
            </label>
            <input onKeyDown={e => e.key === 'Enter' && e.preventDefault()} onChange={e => setAuthor(e.target.value)} value={author} className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" id="book-author" type="text" placeholder="Author" />
          </div>
        </div>
        <div className="flex flex-wrap mb-3 -mx-3">
          <div className="w-full px-3">
            <label className={`block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase ${isDark ? 'text-white' : ''}`} htmlFor="book-des">
              Description
            </label>
            <textarea onKeyDown={e => e.key === 'Enter' && e.preventDefault()} onChange={e => setDescription(e.target.value)} value={description} rows={5} className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none resize-none focus:outline-none focus:bg-white focus:border-gray-500" id="book-des" type="text" placeholder="Description"></textarea>
          </div>
        </div>
        <div className="flex flex-wrap mb-3 -mx-3">
          <div className="w-full px-3">
            <label className={`block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase ${isDark ? 'text-white' : ''}`} htmlFor="book-cate">
              Categories
            </label>
            <div className="flex items-center gap-3">
              <input onKeyDown={e => e.key === 'Enter' && e.preventDefault()} onChange={e => setNewCategory(e.target.value)} value={newCategory} className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" id="book-cate" type="text" placeholder="classic" />
              <button onClick={addCategory} type="button" className="p-1 mb-3 rounded-full bg-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-white size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
            </div>
            <div className="mt-1 mb-3 space-x-2 flex-flex-wrap">
              {
                categories.map((cate, index) => (<span key={index} className={`px-3 py-2.5 border rounded-md border-primary ${isDark ? 'text-white' : ''}`}>{cate}<span className="cursor-pointer ms-3" onClick={() => deleteCategory(cate)}>&#10006;</span></span>))
              }
            </div>
          </div>
        </div>
        <div>
          <button disabled={loading} type="submit" className="w-full p-3 text-white transition duration-1000 ease-in-out rounded-md bg-primary hover:bg-indigo-700">
            {loading ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}
