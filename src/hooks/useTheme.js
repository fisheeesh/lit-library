import { useContext } from "react"
import { AppContext } from "../contexts/ThemedApp"

const useTheme = () => {
    const context = useContext(AppContext)
    if (context === undefined) throw new Error('useTheme must be used within a ThemedApp')

    return context
}

export default useTheme