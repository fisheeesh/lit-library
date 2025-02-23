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

  const maxCate = 5
  const { isDark } = useTheme()
  const { user } = useAuth()

  const [isEdit, setIsEdit] = useState(false)
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [likes_count, setLikesCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const [bookOwner, setBookOwner] = useState(null)

  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)

  const navigate = useNavigate()

  const { addDocument, updateDocument } = useFirestore()

  const { uploadFileToStorage } = useStorage()

  useEffect(() => {
    if (id) document.title = "Edit Book"
    else document.title = "Create Book"

    return () => document.title = "LitLibrary"
  }, [id])

  useEffect(() => {
    if (id) {
      setIsEdit(true)
      let ref = doc(booksCollectionRef, id)
      getDoc(ref)
        .then(doc => {
          let { uid, title, author, description, categories, cover, likes_count } = doc.data()
          setBookOwner(uid)
          setTitle(title)
          setAuthor(author)
          setDescription(description)
          setCategories(categories)
          setPreview(cover)
          setLikesCount(likes_count)
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
    e.preventDefault();
    setLoading(true);

    //$ Validate required fields
    if (title.trim() === '' || author.trim() === '' || description.trim() === '') {
      alert("Please fill in all the required fields.");
      setLoading(false);
      return;
    }

    let bookCoverName;
    let url = preview; //? Default to existing preview (current cover)

    //? If a new file is selected, upload it
    if (file) {
      bookCoverName = Date.now().toString() + '_' + file.name;
      let uniquePath = `/covers/${user.uid}/${bookCoverName}`;
      url = await uploadFileToStorage(uniquePath, file);
    }

    //? Construct the book data
    let updatedBook = {
      uid: user.uid,
      title: title.trim(),
      author: author.trim(),
      description: description.trim(),
      categories: categories,
      cover: url,
      bookCoverName: bookCoverName || null, //? Retain existing name if no new file
      userProfile: user.photoURL,
      userName: user.displayName,
      likes_count
    };

    //$ Update or add the document
    try {
      if (isEdit) {
        if (bookOwner === user.uid) {
          await updateDocument('books', id, updatedBook);
        }
        else {
          alert('You are not authorized to edit this book.')
          navigate('/')
        }
      } else {
        await addDocument('books', updatedBook);
      }
      navigate('/');
    } catch (error) {
      console.error("Error saving book:", error);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="">
      <form onSubmit={handleSubmit} className={`w-full mt-4 max-w-lg px-5 py-5 mx-auto rounded-md ${isDark ? 'bg-slate-900 shadow-md' : 'bg-white shadow-lg'}`}>
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
              <input onKeyDown={e => e.key === 'Enter' && e.preventDefault()} onChange={e => setNewCategory(e.target.value)} value={newCategory} className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500 placeholder:italic" id="book-cate" type="text" placeholder="5 categoires per blog." />
              <button disabled={categories.length >= maxCate} onClick={addCategory} type="button" className={`p-1 mb-3 rounded-full bg-primary ${categories.length >= maxCate ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
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
            <label
              className={`block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase ${isDark ? 'text-white' : ''}`}
              htmlFor="book-cover"
            >
              Cover
            </label>
            <div className="relative">
              {/* Hidden File Input */}
              <input
                type="file"
                id="book-cover"
                onChange={handleImageChange}
                className="hidden"
              />

              {/* Custom Display for File Input */}
              <label
                htmlFor="book-cover"
                className="flex items-center justify-between px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded cursor-pointer hover:bg-gray-300 focus:outline-none"
              >
                {file?.name || (preview ? "Current cover image used" : "Choose a file")}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16V4m0 0H3.5a1.5 1.5 0 00-1.5 1.5v15a1.5 1.5 0 001.5 1.5H7m0 0h14.5a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0021.5 4H7z"
                  />
                </svg>
              </label>
            </div>

            {/* Image Preview */}
            {preview && <img src={preview} className="w-full mt-2 rounded-md" alt="preview_img" />}
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
