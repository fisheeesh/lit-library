import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useTheme from "../hooks/useTheme"
import { doc, getDoc } from "firebase/firestore"
import { booksCollectionRef } from "../firebase/config"
import useFirestore from "../hooks/useFirestore"
import useAuth from "../hooks/useAuth"
import useStorage from "../hooks/useStorage"

export default function BookForm() {
  /**
   * @TODO: with json-server
   * $ import { useEffect } from "react"
   * $ import useFetch from "../hooks/useFetch"
   * ? const { data: newBook, setPostData, loading } = useFetch('http://localhost:3001/books', "POST")
   * ? setPostData(newBook)
   * ? useEffect(() => {
   * ?   if (newBook) {
   * ?     navigate('/')
   * ?   }
   * ? }, [newBook])    
   * ? })
   */

  const { isDark } = useTheme()
  const { user } = useAuth()

  const [isEdit, setIsEdit] = useState(false)
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)

  const navigate = useNavigate()

  const { addDocument, updateDocument } = useFirestore()

  const { uploadFileToStorage } = useStorage()

  useEffect(() => {
    if (id) {
      setIsEdit(true)
      let ref = doc(booksCollectionRef, id)
      getDoc(ref)
        .then(doc => {
          let { title, author, description, categories, cover } = doc.data()
          setTitle(title)
          setAuthor(author)
          setDescription(description)
          setCategories(categories)
          setPreview(cover)
        })
    }
    else {
      setIsEdit(false)
      setTitle('')
      setAuthor('')
      setDescription('')
      setCategories([])
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (title.trim() === '' || author.trim() === '' || description.trim() === '') {
      return
    }

    let bookCoverName = Date.now().toString() + '_' + file.name
    let uniquePath = `/covers/${user.uid}/${bookCoverName}`
    const url = await uploadFileToStorage(uniquePath, file)

    let newBook = {
      uid: user.uid,
      title: title.trim(),
      author: author.trim(),
      description: description.trim(),
      categories: categories,
      cover: url,
      bookCoverName
    }

    if (isEdit) {
      await updateDocument('books', id, newBook)
    }
    else {
      await addDocument('books', newBook)
    }
    setLoading(false)
    navigate('/')
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

  const handleImageChange = e => {
    // console.log(e.target.files[0])
    setFile(e.target.files[0])
  }

  const handleImagePreview = (file) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = () => {
      setPreview(reader.result)
    }
  }

  useEffect(() => {
    if (file) {
      handleImagePreview(file)
    }
  }, [file])


  return (
    <div className="h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-lg px-5 py-5 mx-auto rounded-md">
        <div className="flex items-center gap-2 mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 ${isDark ? 'text-white' : 'text-primary'}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>
          <h3 className="text-3xl font-bold text-primary">{isEdit ? 'Update a book.' : 'Create a book.'}</h3>
        </div>
        <div className="flex flex-wrap mb-6 -mx-3">
          <div className="w-full px-3 md:w-1/2">
            <label className={`block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase ${isDark ? 'text-white' : ''}`} htmlFor="book-title">
              Title
            </label>
            <input onKeyDown={e => e.key === 'Enter' && e.preventDefault()} onChange={e => setTitle(e.target.value)} value={title} className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" id="book-title" type="text" placeholder="Title" />
          </div>
          <div className="w-full px-3 mt-4 md:w-1/2 md:mt-0">
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
            <textarea onChange={e => setDescription(e.target.value)} value={description} rows={5} className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none resize-none focus:outline-none focus:bg-white focus:border-gray-500" id="book-des" type="text" placeholder="Description"></textarea>
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
            <div className="flex flex-wrap gap-2">
              {
                categories.map((cate, index) => (<span key={index} className={`px-3 py-2.5 border rounded-md border-primary ${isDark ? 'text-white' : ''}`}>{cate}<span className="cursor-pointer ms-3" onClick={() => deleteCategory(cate)}>&#10006;</span></span>))
              }
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mb-3 -mx-3">
          <div className="w-full px-3">
            <label className={`block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase ${isDark ? 'text-white' : ''}`} htmlFor="book-cover">
              Cover
            </label>
            <input type="file" onChange={handleImageChange} />
            {
              !!preview && <img src={preview} className="w-full mt-2 rounded-md" alt="preview_img" />
            }
          </div>
        </div>
        <div>
          {
            isEdit && (
              <button disabled={loading} type="submit" className="flex items-center justify-center w-full gap-3 p-3 text-white transition duration-1000 ease-in-out rounded-md bg-primary hover:bg-indigo-700">
                {loading && <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>}
                <span>{loading ? 'Updating...' : 'Update'}</span>
              </button>
            )
          }
          {
            !isEdit && (
              <button disabled={loading} type="submit" className="flex items-center justify-center w-full gap-3 p-3 text-white transition duration-1000 ease-in-out rounded-md bg-primary hover:bg-indigo-700">
                {loading && <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>}
                <span>{loading ? 'Creating...' : 'Create'}</span>
              </button>
            )
          }
        </div>
      </form>
    </div>
  )
}
