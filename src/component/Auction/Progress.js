import React, { useEffect } from 'react'
import {motion} from 'framer-motion'
import useStorage from '../../hooks/useStorage'


 const ProgressBar = ({auction,setAuction}) => {
    const [progress,isCompleted] = useStorage(auction)
    useEffect(() => {
        if (isCompleted){
            setAuction(null)
        }
    },[isCompleted,setAuction])
  return  (
     <motion.div 
        style={ {height :'5px',background:'black'}}
        inital = {{width:0}}
        animate = {{width:'${progress}%'}}

    />
  )
  
}

export default ProgressBar


