import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import defaultProfile from "../../assets/default_profile.jpg";

export default function Avatar() {
    const { user } = useAuth()

    return (
        <Link to={`/profile/${user.uid}`}>
            <img src={user?.photoURL || defaultProfile} alt="Profile" className="w-[42px] h-[42px] rounded-full md:h-11 md:w-11" />
        </Link>
    )
}
