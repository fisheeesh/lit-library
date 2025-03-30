import { Link } from "react-router-dom";

export default function CreateBtn() {
    return (
        <Link
            to="/create"
            className="p-[5px] hidden md:flex md:px-5 md:py-2.5 text-white rounded-full bg-primary items-center gap-2 transition hover:bg-indigo-700 duration-500 ease-in-out"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>

            <span className="">Create</span>
        </Link>
    )
}
