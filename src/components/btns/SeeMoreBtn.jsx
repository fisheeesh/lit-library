import { Link } from "react-router-dom";

export default function SeeMoreBtn() {
    return (
        <div className="mt-8 mb-24 text-center">
            <Link
                to='/blogs'
                className="px-5 py-2.5 text-lg transition duration-500 ease-in-out border rounded-full border-secondary text-secondary btn hover:bg-secondary hover:text-white"
            >
                See More
            </Link>
        </div>
    )
}
