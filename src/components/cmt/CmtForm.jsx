/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import useFirestore from "../../hooks/useFirestore"
import useTheme from "../../hooks/useTheme"

export default function CmtForm({ user, bookId, type = 'create', setEditCmt, editCmt }) {
    const [content, setContent] = useState('')
    const { addDocument, updateDocument } = useFirestore()
    const [loading, setLoading] = useState(false)

    const { isDark } = useTheme()

    const addComment = async (e) => {
        e.preventDefault()
        // console.log(content)
        if (content.trim() === '') return
        setLoading(true)
        if (type === 'create') {
            let newComment = {
                uid: user?.uid,
                sender: user?.displayName,
                bookId,
                cmtContent: content,
                photoURL: user?.photoURL,
                like_count: 0,
                isEdited: false
            }
            await addDocument('comments', newComment)

        }
        else {
            // alert('edit')
            editCmt.cmtContent = content
            editCmt.isEdited = true
            // console.log(editCmt)
            await updateDocument('comments', editCmt.id, editCmt, false)
            setEditCmt(null)
        }
        setLoading(false)
        setContent('')
    }

    useEffect(() => {
        if (type === 'update') {
            setContent(editCmt.cmtContent)
        }
    }, [type, editCmt])

    return (
        <form onSubmit={addComment}>
            <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Your notes..." rows={6} className={`py-4 px-5 border bg-gray-50 w-full transition duration-700 ease-in-out outline-none resize-none rounded-3xl ${isDark ? 'bg-slate-900 text-white border-primary' : 'border-gray-200'}`}></textarea>
            <div className="flex items-center gap-2">
                <button type="submit" className='flex items-center gap-2 px-3 py-2 mt-3 mb-3 text-white transition duration-1000 ease-out rounded-full bg-primary md:px-5 hover:bg-indigo-500'>
                    {loading && <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>}
                    <span>{type === 'create' ? 'Submit' : 'Edit'}</span>
                </button>
                {type === 'update' && <button onClick={() => setEditCmt(null)} type="button" className='px-3 py-2 mt-3 mb-3 transition duration-1000 ease-out border rounded-full text-primary border-primary md:px-5'>
                    <span>Cancel</span>
                </button>}
            </div>
        </form>
    )
}
