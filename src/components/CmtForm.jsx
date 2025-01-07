/* eslint-disable react/prop-types */
import { useState } from "react"
import useFirestore from "../hooks/useFirestore"

export default function CmtForm({ user, bookId }) {
    const [content, setContent] = useState('')
    const { addDocument } = useFirestore()

    const addComment = async (e) => {
        e.preventDefault()
        // console.log(content)
        let newComment = {
            uId: user.uid,
            sender: user.displayName,
            bookId,
            cmtContent: content,
            photoURL: user.photoURL,
            like_count: 0,
            isEdited: false
        }
        await addDocument('comments', newComment)
        setContent('')
    }

    return (
        <form onSubmit={addComment}>
            <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Your notes..." rows={6} className="w-full p-5 transition duration-700 ease-in-out border shadow-md outline-none resize-none rounded-3xl focus:border-primary bg-gray-50"></textarea>
            <button type="submit" className='mt-3 px-2 mb-3 py-2 text-white transition duration-1000 ease-out rounded-full bg-primary md:px-5 hover:bg-indigo-500 md:py-2.5'>
                <span className='hidden md:block'>Submit</span>
            </button>
        </form>
    )
}
