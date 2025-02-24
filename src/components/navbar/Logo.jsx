import { Link } from "react-router-dom";
import logo from "../../assets/favicon.png";
import useTheme from "../../hooks/useTheme";

export default function Logo() {
    const { isDark } = useTheme()
    return (
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <img src={logo} alt="LitLibrary Logo" className="w-7 lg:w-8" />
            <span className={`text-xl lg:text-2xl  font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                LitLibrary
            </span>
        </Link>
    )
}
