/* eslint-disable react-hooks/rules-of-hooks */
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { db } from "../firebase/config"

export default function useFirestore() {

    const getAllDocuments = (collectionName, _q, search) => {
        const [data, setData] = useState([]);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(false);

        const qRef = useRef(_q).current;

        useEffect(() => {
            setLoading(true);
            let ref = collection(db, collectionName);
            let queries = [];

            if (qRef) {
                queries.push(where(...qRef));
            }
            queries.push(orderBy('created_at', 'desc'));
            let q = query(ref, ...queries);

            const unsubscribe = onSnapshot(
                q,
                (snapShot) => {
                    if (snapShot.empty) {
                        setData([]);
                        setLoading(false);
                        if (collectionName === 'books') setError("No book(s) found");
                        if (collectionName === 'comments') setError("No Comment(s) Found. Be the first to comment.");
                        return;
                    }

                    let collectionDatas = [];
                    snapShot.forEach((doc) => {
                        let document = { ...doc.data(), id: doc.id };
                        doc.data().created_at && collectionDatas.push(document);
                    });

                    //$ Apply search filter
                    let filteredData = collectionDatas;
                    if (search?.field && search?.value) {
                        filteredData = filteredData.filter((doc) =>
                            doc[search.field].toLowerCase().includes(search.value.toLowerCase())
                        );
                    }

                    // Apply category filter
                    if (search?.filter && search.filter !== 'All') {
                        // console.log("Filtering with:", search.filter);
                        filteredData = filteredData.filter((doc) => doc.categories.includes(search.filter));
                    }

                    setData(filteredData);
                    setLoading(false);
                    setError(null);
                },
                (error) => {
                    setLoading(false);
                    setError(error.message);
                }
            );

            return () => unsubscribe();
        }, [collectionName, qRef, search?.field, search?.value, search?.filter]);

        return { data, error, loading };
    };

    const getDocumentById = (collectionName, id) => {
        const [data, setData] = useState(null)
        const [error, setError] = useState(null)
        const [loading, setLoading] = useState(false)

        useEffect(() => {
            setLoading(true)
            let ref = doc(db, collectionName, id)
            const unsubscribe = onSnapshot(ref, (doc) => {
                if (doc.exists()) {
                    let document = { ...doc.data(), id: doc.id }
                    setData(document)
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
        data.created_at = serverTimestamp()
        let ref = collection(db, collectionName)
        return addDoc(ref, data)
    }

    const updateDocument = (collectionName, id, data, updateDate = true) => {
        if (updateDate) data.created_at = serverTimestamp()
        let ref = doc(db, collectionName, id)
        return updateDoc(ref, data)
    }

    const deleteDocument = async (collectionName, id) => {
        let ref = doc(db, collectionName, id)
        await deleteDoc(ref)
    }

    return { getAllDocuments, getDocumentById, addDocument, updateDocument, deleteDocument }
}