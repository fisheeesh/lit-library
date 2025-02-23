import { useEffect } from "react"

const useKey = (KEY, action) => {
    useEffect(() => {
        const handleKey = (e) => {
            if (e.code.toLowerCase() === KEY.toLowerCase()) action()
        }
        document.addEventListener('keydown', handleKey)

        return () => document.removeEventListener('keydown', handleKey)
    }, [KEY, action])
}

export default useKey