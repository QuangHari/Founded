import { useState,useRef} from 'react'
import React from 'react'
import {Modal,Alert }from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import { set } from 'firebase/database';
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'

const LoginComponent = () => {
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')

  const emailRef = useRef()
  const passwordRef = useRef()

  const {login,userRole} = useContext(AuthContext)
  
  const openForm =() => setShowForm(true)
  const closeForm = () => setShowForm(false)

  const submitForm = async (e) => {
    e.preventDefault()
    
    setError('')
    try {
      await login(emailRef.current.value, passwordRef.current.value)
      closeForm()
      
      

    }catch (error) {
      setError("Invalid email or password")

    }

  }




  return (
    <>
    <Button onClick={openForm} variant="outline-secondary" style={{ color: 'white' ,border:'none'}}>Login</Button>

      {/* <Button color="secondary">Secondary</Button> */}
      <Modal centered show ={showForm} onHide={closeForm}>
        <form onSubmit={submitForm}>
          <Modal.Header>
            <Modal.Title>Login</Modal.Title> 
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger" >{error}</Alert> }
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email"  required ref={emailRef} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"  required   ref={passwordRef}/>
            </Form.Group>


            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeForm}>Close</Button>
              <Button variant="secondary" type = "submit">Login</Button>
            </Modal.Footer>
        </form>
      </Modal>  
    </>
  )
}

export default LoginComponent
