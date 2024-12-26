import { useEffect, useState } from "react"

const useFetch = (url, method = "GET") => {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [postData, setPostData] = useState(null)

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        let options = {
            signal,
            method
        }

        const fetchData = () => {
            setLoading(true)
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

        if (method === "POST" && postData) {
            options = {
                ...options,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postData)
            }
            fetchData()
        }

        return () => {
            // console.log('cleanup')
            abortController.abort()
        }
    }, [url, method, postData])

    return { data, setPostData, error, loading }

}

export default useFetch