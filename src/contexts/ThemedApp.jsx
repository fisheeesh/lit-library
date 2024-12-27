/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer } from "react"
import {
    RouterProvider,
} from "react-router-dom";
import router from '../router/index'

export const AppContext = createContext()

const ThemeReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_THEME":
            return { ...state, theme: action.payload }
        default:
            return state
    }
}

export default function ThemedApp() {

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
        <AppContext.Provider value={{ ...state, changeTheme, isDark }}>
            <RouterProvider router={router} />
        </AppContext.Provider>
    )
}
