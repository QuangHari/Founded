import React from 'react'
import { useContext ,useState} from 'react'
import { AuthContext } from '../../context/AuthContext'
import AddAuction from './AddAuction'
import ProgressBar from './Progress'
import useFirestore from '../../hooks/useFirestore'
import AuctionCard from './AuctionCard'
import { Alert } from 'react-bootstrap'

export  const AuctionBody = () => {
  const {currentUser,globalMsg} = useContext(AuthContext)
  const [auction, setAuction] = useState(null)
  const {docs} = useFirestore('auctions')

  return (
    <div className="py-5">  
      <div className="container">
          {auction && <ProgressBar auction = {auction} setAuction={setAuction}/>}
          {globalMsg && <Alert variant ='info' >{globalMsg} </Alert>}
        
          {currentUser && <AddAuction setAuction={setAuction} />}

          {docs && (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md3 g-3">
              {docs.map((doc) => {
                return <AuctionCard item ={doc} key={doc.id}/>
              }
                
              )}
              </div>
          )}
      </div>


    </div>
  )
  
}


