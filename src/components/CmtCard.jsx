/* eslint-disable react/prop-types */
import moment from "moment"
import useFirestore from "../hooks/useFirestore"
import useAuth from "../hooks/useAuth"

export default function CmtCard({ bookId }) {
    const { user } = useAuth()

    const { getAllDocuments } = useFirestore()

    const { data: comments, error, loading } = getAllDocuments('comments', ['bookId', '==', bookId])

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
                    <div key={cmt.id}>
                        <div className="p-6 my-3 bg-white shadow-md rounded-3xl">
                            <div className="flex space-x-3">
                                <img
                                    src={cmt.photoURL}
                                    className="w-12 h-12 rounded-full"
                                    alt=""
                                />
                                <div className="flex items-center justify-between w-full">
                                    <div>
                                        <h3 className="text-lg font-bold">{cmt.sender}</h3>
                                        <h5 className="text-sm text-gray-400">{moment(cmt.created_at.seconds * 1000).fromNow()}</h5>
                                    </div>
                                    <button
                                        type="button"
                                        className={`px-3.5 py-1.5 border-red-500 border text-sm rounded-full flex items-center space-x-2`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="red"
                                            className="size-5"
                                        >
                                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                        </svg>
                                        <span>{cmt.like_count}</span>
                                    </button>
                                </div>
                            </div>
                            <div className="mt-3">
                                <p>{cmt.cmtContent}</p>
                                {(cmt.uId === user?.uid) &&
                                    <div className="flex items-center justify-end mt-4 space-x-2">
                                        <button
                                            type="button"
                                            className="px-3.5 py-1.5 text-sm rounded-full text-white bg-red-600"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            type="button"
                                            className="px-3.5 py-1.5 text-sm rounded-full text-white bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
