import React, { useEffect ,useState} from 'react'
import { fireStoreApp } from '../config/firebase';

const useFirestore = (collection) => {

const [docs, setDocs] = useState([]);
useEffect(() => {
    const subscribe = fireStoreApp.collection(collection).onSnapshot((snap) => {
        let documents = [];
        snap.forEach(doc => {
            documents.push({...doc.data(), id: doc.id})
        })
        setDocs(documents);
    })
    
    return () => subscribe();
}, [collection])
  return {docs}
}

export default useFirestore
