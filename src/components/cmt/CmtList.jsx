/* eslint-disable react/prop-types */
import useFirestore from "../../hooks/useFirestore"
import { useState } from "react"
import SingleCmt from "./SingleCmt"

export default function CmtList({ bookId }) {

    // eslint-disable-next-line no-unused-vars
    const [editNote, setEditNote] = useState({})

    const { getAllDocuments, deleteDocument } = useFirestore()

    const { data: comments, error, loading } = getAllDocuments('comments', ['bookId', '==', bookId])

    const deleteComment = async (id) => {
        // console.log(id)
        await deleteDocument('comments', id)
    }

    return (
        <>
            <div className="flex items-center gap-2 my-3">
                <h6 className="text-xl font-bold text-primary">Comments</h6>
                <h5 className="px-3.5 py-1 text-sm text-center text-white rounded-full bg-primary">{comments.length}</h5>
            </div>
            {error && <h3 className="my-6 text-center text-gray-400 font-bo ld text-md">{error}</h3>}
            {loading && <h3 className="my-6 text-center">Loading...</h3>}
            {!loading && comments &&
                comments.map(cmt => (
                    <SingleCmt key={cmt.id} cmt={cmt} deleteComment={deleteComment} />
                ))
            }
        </>
    )
}
