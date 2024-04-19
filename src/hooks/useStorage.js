import { progress } from "framer-motion";
import { useState } from "react";
import { fireStoreApp, storageApp, timeStamp } from "../config/firebase";

const useStorage = (data) => {
    const [progress, setProgress] = useState(0);
    const [isCompleted, setIsCompleted] = useState(null);

    useState(() => {
        const storageRef = storageApp.ref(data.itemImage.name);
        const collectionRef = fireStoreApp.collection('auctions');
        storageRef.put(data.itemImage).on('state_changed', (snap) => {
                let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                setProgress(percentage);
            },(err)=> {
                console.log(err)
            
            }, async () => {
                const imgUrl = await storageRef.getDownloadURL();
                const createAt = timeStamp();
                delete data.itemImage;
                await collectionRef.add({ ...data, imgUrl, createAt});
                setIsCompleted(true);
            }
        )
    
    

    },[data]);

    return [progress, isCompleted];
};
export default useStorage;