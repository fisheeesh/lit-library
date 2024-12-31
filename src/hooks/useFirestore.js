/* eslint-disable react-hooks/rules-of-hooks */
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { db } from "../firebase/config"

export default function useFirestore() {

    const getAllDocuments = (collectionName, _q) => {
        const [data, setData] = useState([])
        const [error, setError] = useState(null)
        const [loading, setLoading] = useState(false)

        const qRef = useRef(_q).current

        useEffect(() => {
            setLoading(true)
            let ref = collection(db, collectionName)
            let queries = []

            if (qRef) {
                queries.push(where(...qRef))
            }
            queries.push(orderBy('date', 'desc'))
            let q = query(ref, ...queries)

            const unsubscribe = onSnapshot(q, (snapShot) => {
                if (snapShot.empty) {
                    setData([])
                    setLoading(false)
                    setError("No book(s) found")
                    return
                }
                let collectionDatas = []
                snapShot.forEach(doc => {
                    let document = { ...doc.data(), id: doc.id }
                    collectionDatas.push(document)
                })
                setData(collectionDatas)
                setLoading(false)
                setError(null)
            }, (error) => {
                setLoading(false)
                setError(error.message)
            })

            return () => unsubscribe()
        }, [collectionName, qRef])

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
                    setData(null)
                    setLoading(false)
                    setError("Something went wrong.!")
                }
            }, (error) => {
                setLoading(false)
                setError(error.message)
            })

            return () => unsubscribe()
        }, [collectionName, id])

        return { data, setData, error, loading }
    }

    const addDocument = (collectionName, data) => {
        data.date = serverTimestamp()
        let ref = collection(db, collectionName)
        return addDoc(ref, data)
    }

    const updateDocument = (collectionName, id, data) => {
        data.date = serverTimestamp()
        let ref = doc(db, collectionName, id)
        return updateDoc(ref, data)
    }

    const deleteDocument = async (collectionName, id) => {
        let ref = doc(db, collectionName, id)
        await deleteDoc(ref)
    }

    return { getAllDocuments, getDocumentById, addDocument, updateDocument, deleteDocument }
}