import React from 'react';
import NavComp from './component/Authenticattion/NavComp';
import { AuthProvider } from './context/AuthContext';
import {AuctionBody} from './component/Auction/body';
import ThemedPrimarySearchAppBar from './component/MUI/Navbar';



export const App = () => {
  
  return (
    <>
      <AuthProvider>
      <ThemedPrimarySearchAppBar />
      {/* <NavComp /> */}
      <AuctionBody />
      </AuthProvider>
      
    </>
  );
  
};
