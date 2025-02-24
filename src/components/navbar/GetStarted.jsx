import { Link } from "react-router-dom";

export default function GetStarted() {
    return (
        <Link to="/auth" className="flex items-center justify-center p-2 text-white transition duration-500 rounded-full md:py-2 md:px-4 bg-primary hover:bg-indigo-700">
            <span className="material-symbols-outlined md:hidden">
                app_registration
            </span>
            <span className="hidden md:block">Turn the Page</span>
        </Link>
    )
}
