import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { CssBaseline } from '@mui/material';
import ReactDOM from 'react-dom';
import { createBrowserRouter ,RouterProvider} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';


// const routes = createBrowserRouter([
//   {path : '/',
//    element: <App />},
//   {
//     path: '/login',
//     element: <LoginPage />
//   },
//   {path: '/register',
//    element: <RegisterPage />},
//    {path: '/auction',
//    element: <AuctionBody />},
//    {path: '/auctionAdmin',
//     element: <AdminBody />},

   

// ]);
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <React.StrictMode>
    
  
//       <AuthProvider>
//         <App/>
//       </AuthProvider>
  
//     </React.StrictMode>,
//   );
render(<App />, document.getElementById('root'));
