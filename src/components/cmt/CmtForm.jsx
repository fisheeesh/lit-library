/* eslint-disable react/prop-types */
import { useState } from "react"
import useFirestore from "../../hooks/useFirestore"
import useTheme from "../../hooks/useTheme"

export default function CmtForm({ user, bookId }) {
    const [content, setContent] = useState('')
    const { addDocument } = useFirestore()

    const { isDark } = useTheme()

    const addComment = async (e) => {
        e.preventDefault()
        // console.log(content)
        if (content.trim() === '') return
        let newComment = {
            uId: user.uid,
            sender: user.displayName,
            bookId,
            cmtContent: content,
            photoURL: user.photoURL,
            like_count: 0,
            isEdited: false
        }
        setContent('')
        await addDocument('comments', newComment)
    }

    return (
        <form onSubmit={addComment}>
            <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Your notes..." rows={6} className={`w-full p-5 transition duration-700 ease-in-out shadow-md focus:border-none outline-none resize-none rounded-3xl appearance-none ${isDark ? 'bg-slate-900 text-white' : 'border-gray-200'}`}></textarea>
            <button type="submit" className='px-3 py-2 mt-3 mb-3 text-white transition duration-1000 ease-out rounded-full bg-primary md:px-5 hover:bg-indigo-500'>
                <span>Submit</span>
            </button>
        </form>
    )
}
