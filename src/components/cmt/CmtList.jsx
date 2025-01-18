/* eslint-disable react/prop-types */
import { useCallback } from "react";
import useFirestore from "../../hooks/useFirestore";
import SingleCmt from "./SingleCmt";
import { BeatLoader } from "react-spinners";
import useTheme from "../../hooks/useTheme";

export default function CmtList({ bookId }) {
    const { isDark } = useTheme();
    const { getAllDocuments, deleteDocument } = useFirestore();

    const { data: comments = [], error, loading } = getAllDocuments('comments', ['bookId', '==', bookId]);

    const deleteComment = useCallback(async (id) => {
        await deleteDocument('comments', id);
    }, [deleteDocument]);

    const customColor = !isDark ? "#4555d2" : "#cc2973";

    return (
        <>
            <div className="flex items-center gap-2 my-3">
                <h6 className="font-bold text-md sm:text-lg md:text-xl text-primary">Comments</h6>
                <h5 className="md:px-3.5 md:py-1 text-xs px-2 py-0.5 md:text-sm text-center text-white rounded-full bg-primary">{comments.length}</h5>
            </div>

            {loading && (
                <div className="flex items-center justify-center my-56">
                    <BeatLoader width={"100px"} height={"5px"} color={customColor} />
                </div>
            )}

            {!loading && comments.length === 0 && (
                <h3 className="my-6 text-center text-gray-400">{error}</h3>
            )}

            {!loading && comments.length > 0 && comments.map((cmt) => (
                <SingleCmt key={cmt.id} cmt={cmt} deleteComment={deleteComment} />
            ))}
        </>
    );
}