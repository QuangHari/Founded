import { useState,useRef, useContext} from 'react'
import React from 'react'
import {Modal,Alert }from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from '../../context/AuthContext'
import { set } from 'firebase/database';


const RegisterComponent = () => {
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')

  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const {register} = useContext(AuthContext)
  
  const openForm =() => setShowForm(true)
  const closeForm = () => setShowForm(false)
  const submitForm = async (e) => {
    e.preventDefault()
    setError('')
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('Passwords do not match')
    }

    try {
      await register(emailRef.current.value, passwordRef.current.value)
      closeForm()
    } catch (error) {
      setError(error.message)
    }

  }




  return (
    <>
      <Button onClick={openForm} variant="outline-secondary">Register</Button>{' '}
      <Modal centered show ={showForm} onHide={closeForm}>
        <form onSubmit={submitForm}>
          <Modal.Header>
            <Modal.Title>Register</Modal.Title> 
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

            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password"  required   ref={confirmPasswordRef}/>
            </Form.Group>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeForm}>Close</Button>
              <Button variant="secondary" type = "submit">Register</Button>
            </Modal.Footer>
        </form>
      </Modal>  
    </>
  )
  
}

export default RegisterComponent
