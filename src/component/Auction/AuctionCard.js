import React from 'react'
import Countdown from 'react-countdown'
import {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'
import "bootstrap/dist/css/bootstrap.min.css";

const renderer = ({days,hours,minutes,seconds,completed,props}) => {
    if (completed) {
        return null;
    } 

    return (
        <div className="col " >
            <div className="card shadow-sm">
                <div style={{
                        height:'200px',
                        
                        backgroundImage:`url(${props.item.imgUrl})`,
                        backgroundSize:'contain',
                        backgroundRepeat:'no-repeat',
                        backgroundPosition:'center'
                    }} 
                    className="w100"/>

                </div>
                    <div>
                        
                        <h5 className="d-flex justify-content-between align-item-center">bid price: ${props.item.bidPrice}</h5>
                        
                        <h5 className="d-flex justify-content-between align-item-center">Current Price :${props.item.currentPrice}</h5>
                        <h5 className="d-flex justify-content-between align-item-center">BIN price :${props.item.binPrice}</h5>
                        
                    </div>
                <div className="card-body">
                    <p className="lead display-6">
                        {props.item.title}
                    </p>
                    <div className="d-flex justify-content-between align-item-center">
                        <h5>
                            {days} day : { hours} hr : {minutes} min : {seconds} sec
                        </h5>
                    </div>
                    <p className='card-text'>{props.item.description}</p>
                    <div className="d-flex justify-content-between align-item-center">
                        <div className="btn-group">
                            
                            {!props.owner ?(
                                <button onClick={props.bidAuciton} className="btn btn-outline-secondary" >Bid </button>

                            ) : props.owner.email === props.item.email ? (
                                <button onClick={()=>props.endAuction(props.item.id)} className="btn btn-outline-secondary" >Cancel Auction </button>
                            
                            ) : props.owner.email===props.item.currentWinner ? (
                                <div className="btn btn-outline-secondary" >You are winning </div>
                            ) : (
                                <button onClick={()=>props.bidAuciton(props.item.id,props.item.currentPrice,props.item.bidPrice)}
                                 className="btn btn-outline-secondary" >bid </button>
                            
                            )}
                            
                           
                        </div>
                        

                    </div>
                    
            </div>
        </div>

    )
}
const AuctionCard = ({item}) => {
    let endDate = item.duration;
    const {currentUser,bidAuciton,endAuction} = useContext(AuthContext)
  return <Countdown owner = {currentUser}  bidAuciton={bidAuciton} endAuction={endAuction} date={endDate} item ={item} renderer={renderer}/>
}

export default AuctionCard
