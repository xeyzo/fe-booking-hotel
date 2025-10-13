import React from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

function RoomModalComponent({ show, handleClose, handleSubmit, roomData, setRoomData, isEditMode, error, transactionError }) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? 'Edit Room' : 'Add New Room'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {transactionError && <Alert variant="danger">{transactionError}</Alert>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Room Number</Form.Label>
            <Form.Control 
              type="text" 
              name="roomNumber" 
              value={roomData.roomNumber || ''} 
              onChange={handleChange}
              placeholder="Enter room number" 
              autoFocus
              isInvalid={!!error?.roomNumber}
            />
            <Form.Control.Feedback type="invalid">
              {error?.roomNumber}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Adult Capacity</Form.Label>
            <Form.Control 
              type="number" 
              name="adultCapacity" 
              value={roomData.adultCapacity || 0} 
              onChange={handleChange}
              isInvalid={!!error?.adultCapacity}
            />
            <Form.Control.Feedback type="invalid">
              {error?.adultCapacity}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Children Capacity</Form.Label>
            <Form.Control 
              type="number" 
              name="childrenCapacity" 
              value={roomData.childrenCapacity || 0} 
              onChange={handleChange}
              isInvalid={!!error?.childrenCapacity}
            />
            <Form.Control.Feedback type="invalid">
              {error?.childrenCapacity}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control 
              type="number" 
              name="roomPrice" 
              value={roomData.roomPrice || 0} 
              onChange={handleChange}
              placeholder="Enter price per night" 
              isInvalid={!!error?.roomPrice}
            />
            <Form.Control.Feedback type="invalid">
              {error?.roomPrice}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RoomModalComponent;