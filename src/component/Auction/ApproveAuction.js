
import Countdown from 'react-countdown'
import {useContext ,useEffect} from 'react'
import { AuthContext } from '../../context/AuthContext'
import "bootstrap/dist/css/bootstrap.min.css";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import imgItem from '../../assets/item2.jpeg'
import { Button } from 'react-bootstrap';

import ".//auctioncard.css"
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
const renderer = ({days,hours,minutes,seconds,completed,props}) => {
    
    return (
        
        (props.item.status === 'waiting' ) ? (
         
        <div className="col " sx={{maxWidth:400}}>
            <Card sx={{
            maxWidth: 400,
            borderRadius: '20px',
            backgroundColor: '#36454F',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden', // Prevent content overflow
            }}>
  <CardMedia
    component="img"
    height="300" // Adjust image height as needed
    width="300" // Ensure image fills card width
    src={props.item.imgUrl}
    alt="item image"
    sx={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      margin: '0px',
    }}
  />
  <CardHeader
    title={
        <Typography variant="h5" component="div" sx={{ color: '#fff', fontSize: '1.8rem', fontWeight: 'bold', textTransform: 'uppercase', marginLeft: '10px' }}>
        {props.item.title}
      </Typography>
      
    }
    // subheader={
    //   (props.item.status === 'waiting') ? (
    //   <Typography variant="body2" sx={{ color: '#fff' }}>
    //     {days + 'd :' + hours + 'h :' + minutes + 'm :' + seconds + 's'}
    //   </Typography>): (props.item.status === 'end') ? (
    //     <Typography variant="body2" sx={{ color: '#fff' }}>
    //     auction ended
    //   </Typography>) : (
    //     <></>
    //   )
    // }
    sx={{ marginLeft: '10px' }}/>
  <div sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px' }}>
    <h5 className="d-flex justify-content-between align-items-center">Bid price: ${props.item.bidPrice}</h5>
    <h5 className="d-flex justify-content-between align-items-center">Current Price: ${props.item.currentPrice}</h5>
    <h5 className="d-flex justify-content-between align-items-center">BIN price: ${props.item.binPrice}</h5>
  </div>
  <div sx={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
    {/* {!props.owner ? (
      <button onClick={props.bidAuciton} className="btn btn-outline-secondary">Bid</button>
    ) : props.userRole === 'admin' ? (
      <button disabled className="btn btn-outline-secondary">Admin</button>
    ) : props.owner.email === props.item.email ? (
      props.item.status === 'active' ? (
      <button onClick={() => props.rejectAuction(props.item.id)} className="btn btn-outline-secondary" style={{ width: '200px' }} >Cancel Auction</button>) :
      (<button disabled className="btn btn-outline-secondary">{props.item.currentWinner} is winner</button>)
    
    
    ) : props.owner.email === props.item.currentWinner ? (
      <div className="btn btn-outline-secondary">You are winning</div>
    ) : 
      (props.item.status === 'active' ? (
      <button onClick={() => props.bidAuciton(props.item.id, props.item.currentPrice, props.item.bidPrice)} className="btn btn-outline-secondary">Bid</button>) : 
      (<button  className="btn btn-outline-secondary">Auction ended</button>)
    )} */}

        <button onClick={()=>props.changeStateAuction('active',props.item.id)} className="btn btn-outline-secondary">Approve</button>
  </div>
  <CardActions disableSpacing sx={{ justifyContent: 'center' }}>
    <ExpandMore
      expand={props.expanded}
      onClick={props.handleExpandClick}
      aria-expanded={props.expanded}
      aria-label="show more"
      sx={{ color: 'white' }}
    >
      <ExpandMoreIcon />
    </ExpandMore>
  </CardActions>
  <Collapse in={props.expanded} timeout="auto" unmountOnExit>
    <CardContent>
      <Typography paragraph sx={{ color: 'white' }}>
        {props.item.description}
        
      </Typography>
      
    </CardContent>
  </Collapse>
</Card>


            {/* <div className="card shadow-sm">
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
                    {!completed ? (
                    <div className="d-flex justify-content-between align-item-center">
                        <h5>
                            {days} day : { hours} hr : {minutes} min : {seconds} sec
                        </h5>
                    </div>) : (
                        <>end Auction</>
                    )}
                    <p className='card-text'>{props.item.description}</p>
                    <div className="d-flex justify-content-between align-item-center">
                        <div className="btn-group">
                            
                            {!props.owner ?(
                                <button onClick={props.bidAuciton} className="btn btn-outline-secondary" >Bid </button>

                            ) : props.userRole === 'admin' ? (
                                <button />
                            ) :
                            props.owner.email === props.item.email ? (
                                <button onClick={()=>props.endAuction(props.item.id)} className="btn btn-outline-secondary" >Cancel Auction </button>
                            
                            ) : props.owner.email===props.item.currentWinner ? (
                                <div className="btn btn-outline-secondary" >You are winning </div>
                            ) : (
                                <button onClick={()=>props.bidAuciton(props.item.id,props.item.currentPrice,props.item.bidPrice)}
                                 className="btn btn-outline-secondary" >bid </button>
                            
                            )}
          
                           
                        </div>
                        

                    </div>
                    
            </div> */}
        </div>
        ) : (
            <></>
    )
    

    )
}
const ApproveAuctionCard = ({item}) => {
    let endDate = item.duration;
    
    const {changeStateAuction,currentUser,bidAuciton,endAuction,userRole,BINitem,cancelAuction,endInOneMinute,rejectAuction} = useContext(AuthContext)
    const [expanded, setExpanded] = React.useState(false);
//     useEffect(() => {
//       if (item.duration   < new Date().getTime() && item.status === 'active'){
//         endAuction(item.id)
//       }
//   });
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

  return <>
  

  <Countdown changeStateAuction={changeStateAuction}  rejectAuction ={rejectAuction} endInOneMinute={endInOneMinute} expanded={expanded} BINitem={BINitem} cancelAuction ={cancelAuction} 
  setExpanded={setExpanded}  handleExpandClick={handleExpandClick}   owner = {currentUser} 
  userRole={userRole} bidAuciton={bidAuciton} endAuction={endAuction} date={endDate} item ={item} renderer={renderer}/>
  </>
}

export default ApproveAuctionCard
