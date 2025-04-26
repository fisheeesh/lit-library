import { useEffect, useRef } from "react"

const useOutsideClick = (handler, listenCapturing = true) => {
    const ref = useRef(null)

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) handler()
        }

        document.addEventListener('click', handleClick, listenCapturing)

        return () => document.removeEventListener('click', handleClick, listenCapturing)

    }, [handler, listenCapturing])

    return ref
}

export default useOutsideClick