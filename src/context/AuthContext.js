import { createContext, useEffect, useRef } from 'react';
import { authApp } from '../config/firebase';
import { useState } from 'react';
import { fireStoreApp } from '../config/firebase';
export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [globalMsg, setGlobalMsg] = useState('');

    const login = (email,password)=> { 
        return authApp.signInWithEmailAndPassword(email,password);
     }
    const register = (email,password)=> { 
        return authApp.createUserWithEmailAndPassword(email,password);
     }
    const logout = ()=> { 
        console.log("logout are pressed")
        return authApp.signOut();
     }

     const bidAuciton =(auctionId,price,bidPrice) => {
        if (!currentUser){
            
            return setGlobalMsg('Please login to bid');
        }
        console.log("bid are pressed")
        let newPrice = parseInt(price) + parseInt(bidPrice)
        const db = fireStoreApp.collection('auctions')
        return db.doc(auctionId).update({
            currentPrice : newPrice,
            currentWinner : currentUser.email
        })
     }
     const endAuction = (auctionId) => {
        const db = fireStoreApp.collection('auctions')
        return db.doc(auctionId).delete()
     }

    useEffect (() => {
        const subscribe = authApp.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return subscribe;
    })

    useEffect(()=>{
        const interval =setTimeout(()=>{
            setGlobalMsg('')
        },5000)
        return ()=>clearTimeout(interval)
    },[globalMsg])

    return (
        <AuthContext.Provider value ={{currentUser,register,login,logout,bidAuciton,endAuction,globalMsg}}>
        {!loading && children}
        </AuthContext.Provider>
    )
}