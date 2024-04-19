import React from 'react';
import NavComp from './component/Authenticattion/NavComp';
import { AuthProvider } from './context/AuthContext';
import {AuctionBody} from './component/Auction/body';
import PrimarySearchAppBar from './component/MUI/Navbar';


export const App = () => {
  return (
    <>
    <AuthProvider>
      <PrimarySearchAppBar />
      <NavComp />
      <AuctionBody />
     </AuthProvider>
      
    </>
  );
  
};
