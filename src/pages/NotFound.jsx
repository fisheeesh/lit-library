import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function NotFound() {

    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 1000)
    }, [navigate])
    return (
        <>
            <h1 className="my-24 text-4xl font-bold text-center text-red-600">404 Not Found</h1>
        </>
    )
}
