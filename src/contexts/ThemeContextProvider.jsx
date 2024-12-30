/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer } from "react"

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

    const [state, dispatch] = useReducer(ThemeReducer, {
        theme: 'light'
    })

    const changeTheme = (theme) => {
        dispatch({
            type: "CHANGE_THEME",
            payload: theme
        })
    }

    const isDark = state.theme === 'dark'

    return (
        <ThemeContext.Provider value={{ ...state, changeTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    )
}
