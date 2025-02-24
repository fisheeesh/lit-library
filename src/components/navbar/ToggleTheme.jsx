import useTheme from "../../hooks/useTheme";
import lightIcon from "../../assets/light_mode.svg";
import darkIcon from "../../assets/dark_mode.svg";

export default function ToggleTheme() {
    const { isDark, changeTheme } = useTheme();
    return (
        <button onClick={() => changeTheme(isDark ? "light" : "dark")} className="p-2 border rounded-full">
            <img src={isDark ? lightIcon : darkIcon} className="w-6" alt="Theme Toggle" />
        </button>
    )
}
