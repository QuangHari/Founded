import { useState,useRef,useContext} from 'react'
import React from 'react'
import {Modal,Alert }from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import { set } from 'firebase/database';
import { Row, Col } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const AddAuction = ({setAuction}) => {
    const [showForm, setShowForm] = useState(false)
    const [error, setError] = useState('')
  
    const itemTitle = useRef()
    
    const itemDescription = useRef()
    const startPrice = useRef()
    const binPrice = useRef()
    const bidPrice = useRef()
    const itemImage = useRef()
    const duration = useRef()
    const {currentUser} = useContext(AuthContext)
  
    const imageType = ['image/png','image/jpeg','image/jpg']
    
    const openForm =() => setShowForm(true)
    const closeForm = () => setShowForm(false)

    const submitForm = async (e) => {
      e.preventDefault()
  
      setError('')
      if (!imageType.includes(itemImage.current.files[0].type)){
        return setError('Please select a valid image file')
    }

    let currentDateTime = new Date()
    let dueDatetime = currentDateTime.setHours(currentDateTime.getHours() + parseInt(duration.current.value))
    let newAuction ={
      email : currentUser.email,
      title : itemTitle.current.value,
      description : itemDescription.current.value,
      startPrice : startPrice.current.value,
      binPrice : binPrice.current.value,
      bidPrice : bidPrice.current.value,
      itemImage : itemImage.current.files[0],
      duration : dueDatetime,
      currentPrice : startPrice.current.value,
      status : 'waiting'
    }
    setAuction(newAuction)
    closeForm()
  }
    

  
  
  
    return (
      <>
        
        <IconButton onClick={openForm} size="large" aria-label="add new" color="inherit">
                    <AddCircleOutlineIcon />
        </IconButton>
        {/* <div className="col d-flex justify-content-center my-3">
          <Button onClick={openForm} variant="outline-secondary">
              Create Auction Item
          </Button>{' '}
        </div> */}

        <Modal centered show ={showForm} onHide={closeForm}>
          <form onSubmit={submitForm}>
            <Modal.Header>
              <Modal.Title>Add Auction</Modal.Title> 
            </Modal.Header>
            <Modal.Body>
              {error && <Alert variant="danger" >{error}</Alert> }
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Item Title</Form.Label>
                    <Form.Control type="text"  required  ref = {itemTitle}/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Item description</Form.Label>
                    <Form.Control type="text"  required  ref = {itemDescription}/>
                  </Form.Group>
                </Col>
              </Row>



              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Start price</Form.Label>
                    <Form.Control type="number"  required  ref = {startPrice}/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>BIN price</Form.Label>
                    <Form.Control type="number"  required  ref = {binPrice}/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Bid price</Form.Label>
                    <Form.Control type="number"  required  ref = {bidPrice}/>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.File label custom required  ref = {itemImage}/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Duration (in hour)</Form.Label>
                    <Form.Control type="number"  required  ref = {duration}/>
                  </Form.Group>
                </Col>

              </Row>
              
  
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeForm}>Close</Button>
                <Button variant="secondary" type = "submit">Submit</Button>
              </Modal.Footer>
          </form>
        </Modal>  
      </>
    )
}

export default AddAuction

