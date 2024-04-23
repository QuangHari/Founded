import { createContext, useEffect, useRef } from 'react';
import { authApp } from '../config/firebase';
import { useState } from 'react';
import { fireStoreApp } from '../config/firebase';
import useFirestore from '../hooks/useFirestore';

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [isSearch, setIsSearch] = useState(false);
    const [loading, setLoading] = useState(true);
    const [globalMsg, setGlobalMsg] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    
    const login = (email,password)=> { 
        return authApp.signInWithEmailAndPassword(email,password);
     }
    const register = async (email,password)=> { 
        try {
            const userCredential = await authApp.createUserWithEmailAndPassword(email, password);
            const userId = userCredential.user.uid; // Get the newly created user ID
        
            // Create a document in userRoles collection with the default role
            await fireStoreApp.collection('userRoles').doc(userId).set({
              role: 'user'
            });
        
            return userCredential; // Return the userCredential for further actions
          } catch (error) {
            console.error('Registration error:', error);
            throw error; // Re-throw the error for handling in the component
          }
     }

    const registerAdmin = async (email, password) => {
        try {
          const userCredential = await authApp.createUserWithEmailAndPassword(email, password);
          const userId = userCredential.user.uid; // Get the newly created user ID
      
          // Create a document in userRoles collection with the default role
          await fireStoreApp.collection('userRoles').doc(userId).set({
            role: 'admin'
          });
      
          return userCredential; // Return the userCredential for further actions
        } catch (error) {
          console.error('Registration error:', error);
          throw error; // Re-throw the error for handling in the component
        }
      };
    const logout = ()=> { 
        
        return authApp.signOut();
     }
     const changeStateAuction = (newStatus,auctionId)=> {
        const db = fireStoreApp.collection('auctions')
        return db.doc(auctionId).update({
          status : newStatus
      })
     }
     const bidAuciton =(auctionId,price,bidPrice) => {
        if (!currentUser){
            
            return setGlobalMsg('Please login to bid');
        }
        
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
     
     useEffect(() => {
      const subscribe = authApp.onAuthStateChanged(async (user) => {
          setCurrentUser(user);
          setLoading(false);
          if (user) {
              try {
                  const userRoleDoc = await fireStoreApp.collection('userRoles').doc(user.uid).get();
                  if (userRoleDoc.exists) {
                      setUserRole(userRoleDoc.data().role);
                  }
              } catch (error) {
                  console.error('Error fetching user role:', error);
              }
          } else {
              setUserRole(null); // Clear role when user logs out
          }
      });
      return subscribe;
  }, []);
  
  
    const searchAuction = async (searchTerm) => {
        if (searchTerm === '')  {
            const results = useFirestore('auctions');
            setSearchResults(results)
            return;
        } else {
            try {
                const db = fireStoreApp.collection('auctions');
                const snapshot = await db.where('title', '>=', searchTerm)
                                        .get();
                
                const results = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data.title.includes(searchTerm) || data.description.includes(searchTerm)) {
                        // Kiểm tra xem dữ liệu đã tồn tại trong kết quả chưa để tránh trùng lặp
                        // const existingItem = results.find(item => item.id === data.id);
                        
                        results.push(data);
                        
                    }
                });
                setSearchResults(results); // Update search results state
                setIsSearch(true); // Set search flag to true
                return results; // Optionally return results for immediate use
            } catch (error) {
                console.error('Error searching auctions:', error);
                throw error;
            }
        }
    };
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
        <AuthContext.Provider value ={{isSearch,searchResults,searchAuction,changeStateAuction,currentUser,register,login,logout,bidAuciton,endAuction,globalMsg,registerAdmin,userRole}}>
        {!loading && children}
        </AuthContext.Provider>
    )
}