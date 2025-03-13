/* eslint-disable react-refresh/only-export-components */
import { onAuthStateChanged } from "firebase/auth"
import { createContext, useEffect, useReducer } from "react"
import { auth } from "../firebase/config"

export const AuthContext = createContext()

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload }
        case "LOGOUT":
            return { ...state, user: action.payload }
        case "AUTH_READY":
            return { ...state, authReady: action.payload }
        default:
            return state
    }
}

// eslint-disable-next-line react/prop-types
export default function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(AuthReducer, {
        user: null,
        authReady: false
    })

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log('b', user)
            dispatch({ type: "AUTH_READY", payload: true })
            if (user) {
                dispatch({ type: "LOGIN", payload: user })
            }
            else {
                dispatch({ type: "LOGOUT", payload: null })
            }
        })
    }, [])

    const DEVELOPER_UID = '1Ojc7pA10tVCpAo5bHxXVu5PHRA2';

    return (
        <AuthContext.Provider value={{ ...state, DEVELOPER_UID }}>
            {children}
        </AuthContext.Provider>
    )
}
