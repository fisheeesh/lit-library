import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContextProvider"

const useTheme = () => {
    const context = useContext(ThemeContext)
    if (context === undefined) throw new Error('useTheme must be used within a ThemedApp')

    return context
}

export default useTheme