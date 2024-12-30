/* eslint-disable react-hooks/rules-of-hooks */
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase/config"

const useFirestore = () => {

    const getAllDocuments = (collectionName) => {
        const [data, setData] = useState([])
        const [error, setError] = useState(null)
        const [loading, setLoading] = useState(false)

        useEffect(() => {
            setLoading(true)
            let ref = collection(db, collectionName)
            let q = query(ref, orderBy('date', 'desc'))

            const unsubscribe = onSnapshot(q, (snapShot) => {
                if (snapShot.empty) {
                    setLoading(false)
                    setError("No book(s) found")
                    return
                }
                let result = []
                snapShot.forEach(doc => {
                    let document = { ...doc.data(), id: doc.id }
                    result.push(document)
                })
                setData(result)
                setLoading(false)
                setError(null)
            })

            return () => unsubscribe()
        }, [collectionName])

        return { data, error, loading }
    }

    const getDocumentById = (collectionName, id) => {
        const [data, setData] = useState(null)
        const [error, setError] = useState(null)
        const [loading, setLoading] = useState(false)

        useEffect(() => {
            setLoading(true)
            let ref = doc(db, collectionName, id)
            const unsubscribe = onSnapshot(ref, (doc) => {
                if (doc.exists()) {
                    setData(doc.data())
                    setLoading(false)
                    setError(null)
                }
                else {
                    setLoading(false)
                    setError("Something went wrong.!")
                }
            })

            return () => unsubscribe()
        }, [collectionName, id])

        return { data, setData, error, loading }
    }

    const addDocument = (collectionName, data) => {
        let ref = collection(db, collectionName)
        return addDoc(ref, data)
    }

    const updateDocument = (collectionName, id, data) => {
        let ref = doc(db, collectionName, id)
        return updateDoc(ref, data)
    }

    const deleteDocument = async (collectionName, id) => {
        let ref = doc(db, collectionName, id)
        await deleteDoc(ref)
    }

    return { getAllDocuments, getDocumentById, addDocument, updateDocument, deleteDocument }
}

export default useFirestore