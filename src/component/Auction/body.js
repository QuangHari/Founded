import React, { useEffect } from 'react'
import { useContext ,useState} from 'react'
import { AuthContext } from '../../context/AuthContext'
import AddAuction from './AddAuction'
import ProgressBar from './Progress'
import useFirestore from '../../hooks/useFirestore'
import AuctionCard from './AuctionCard'
import { Alert } from 'react-bootstrap'
import ApproveAuctionCard from './ApproveAuction'
import "./body.css"
import "bootstrap/dist/css/bootstrap.min.css";
import banner from '../../assets/banner.webp'
// import banner from '../../assets/banner3.jpeg'
import { Box} from '@mui/material';


export  const AuctionBody = () => {
  const {currentUser,globalMsg,userRole,searchResults,isSearch} = useContext(AuthContext)
  const [auction, setAuction] = useState(null)
  const {docs} = useFirestore('auctions')
  const [listing, setListing] = useState(null)
  useEffect(() => {
    if(isSearch){
      setListing(searchResults)
    }else{
      setListing(docs)
    }
  })

  return (

    
    !currentUser ? (
      <>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '1px',
        }}
      ></Box>
       <img
          src={banner}
          alt="banner"
          style={{
            width: '90%',
            height: '60%',
            objectFit: 'cover',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
      </>
    ) :( 
    (currentUser && userRole === 'user') ? (
      
      <>

      <div className="py-5" style={{color: 'dark'}}>  
          <div className="container">
              {/* {auction && <ProgressBar auction = {auction} setAuction={setAuction}/>} */}
              {globalMsg && <Alert variant ='info' >{globalMsg} </Alert>}
            
              {/* {currentUser && <AddAuction setAuction={setAuction} />} */}

              {listing && (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md3 g-3">
               
                  {listing.map((listing) => {
                    return <AuctionCard item ={listing} key={listing.id}/>
                  }
                    
                  )}
                  </div>
              )}
          </div>



        </div>

      
      </>
    ) : (
      <>
        
        <div className="py-5" style={{backgroundColor: 'dark'}}>
          <div className="container">
            
          {docs && (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md3 g-3">
                  {/* {console.log(searchResults,"searchResults")}
                  {console.log(docs[0])} */}
                  {docs.map((doc) => {
                  
                    return <ApproveAuctionCard item ={doc} key={doc.id}/>
                  }
                    
                  )}
                  </div>
              )}
           </div>
      </div>
      </>
      ))


  )
  
}


