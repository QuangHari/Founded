import React from 'react'
import Countdown from 'react-countdown'
import {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'
import "bootstrap/dist/css/bootstrap.min.css";
import { get } from 'firebase/database';
import Button from 'react-bootstrap/Button';
import 'react-bootstrap/dist/react-bootstrap.min.js';

const renderer = ({days,hours,minutes,seconds,completed,props}) => {
    if (completed) {
        return null;
    } 

    return (
        (props.item.status === 'waiting' ) ? (
 
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
                            
                        <Button onClick={()=>props.changeStateAuction('active',props.item.id)} variant="primary">Approve</Button>{' '}
          
                           
                        </div>
                        

                    </div>
                    
            </div>
        </div>) : (
            <></>
        )

    )
}
const ApproveAuctionCard = ({item}) => {
    let endDate = item.duration;
    const {currentUser,bidAuciton,endAuction,userRole,changeStateAuction} = useContext(AuthContext)
    
  return <>
   
  <Countdown changeStateAuction={changeStateAuction} owner = {currentUser} userRole={userRole} bidAuciton={bidAuciton} endAuction={endAuction} date={endDate} item ={item} renderer={renderer}/>
  </>
}

export default ApproveAuctionCard
