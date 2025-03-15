import useTheme from "../../hooks/useTheme";
import lightIcon from "../../assets/light_mode.svg";
import darkIcon from "../../assets/dark_mode.svg";

export default function ToggleTheme() {
    const { isDark, changeTheme } = useTheme();
    return (
        <button onClick={() => changeTheme(isDark ? "light" : "dark")} className="border rounded-full p-[5px] md:p-2">
            <img src={isDark ? lightIcon : darkIcon} className="w-6" alt="Theme Toggle" />
        </button>
    )
}
