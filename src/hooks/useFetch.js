import { useEffect, useState } from "react"

const useFetch = (url, method = "GET") => {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        let options = {
            signal,
            method
        }

        setLoading(true)
        const fetchData = () => {
            fetch(url, options)
                .then(res => {
                    if (!res.ok) throw new Error("Network response was not ok.")
                    return res.json()
                })
                .then(data => {
                    setData(data)
                    setLoading(false)
                    setError(null)
                })
                .catch(err => {
                    setLoading(false)
                    setError(err.message)
                })
        }

        if (method == 'GET') fetchData()

        return () => {
            // console.log('cleanup')
            abortController.abort()
        }
    }, [url, method])

    return { data, error, loading }

}

export default useFetch