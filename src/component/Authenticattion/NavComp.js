import React from 'react'
import Login from './Login'
import Register from './Register'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'
import logoImg from '../../assets/logo.png';

const NavComp = () => {
  const {currentUser,logout} = useContext(AuthContext)
  return (
    <nav className="container navbar sticky-top navbar-light bg-light">
      <div className = "container-fluid">
        
        <div className='nav-item'>
          <div className ="col">
            {currentUser ? (
              <>
                <div>{currentUser.email}</div>
                <button onClick={logout} className="btn btn-outline-secondary">Logout</button>
              </>
            ) :(
              <>
                < Login />
                < Register />
              </>
            ) }
            
          </div>
        </div>
      </div>
    </nav>
    
  )
}

export default NavComp
