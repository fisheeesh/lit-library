/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useReducer } from "react"

export const ThemeContext = createContext()

const ThemeReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_THEME":
            return { ...state, theme: action.payload }
        default:
            return state
    }
}

// eslint-disable-next-line react/prop-types
export default function ThemedContextProvider({ children }) {
    //$ Retrieve initial theme from localStorage or default to 'light'
    const storedTheme = localStorage.getItem("theme") || "light";

    const [state, dispatch] = useReducer(ThemeReducer, {
        theme: storedTheme
    })

    //$ Update localStorage whenever theme changes
    useEffect(() => {
        localStorage.setItem("theme", state.theme);
    }, [state.theme]);

    const changeTheme = (theme) => {
        dispatch({
            type: "CHANGE_THEME",
            payload: theme
        })
    }

    const isDark = state.theme === 'dark'

    const customColor = state.theme === 'light' ? "#4555d2" : "#cc2973";

    return (
        <ThemeContext.Provider value={{ ...state, changeTheme, isDark, customColor }}>
            {children}
        </ThemeContext.Provider>
    )
}
