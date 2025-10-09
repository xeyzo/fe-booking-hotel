import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AmenityModalComponent({ show, handleClose, handleSubmit, amenityData, setAmenityData, isEditMode }) {

  // Fungsi generik untuk input text/number
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAmenityData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? 'Edit Amenity Types' : 'Add New AmenityTypes'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              name="name" 
              value={amenityData.name || ''} 
              onChange={handleChange}
              placeholder="Enter name" 
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea" 
              name="description" 
              value={amenityData.description || ''} 
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="isActive"
              checked={amenityData.isActive || false}
              onChange={(e) => setAmenityData(prevData => ({
                ...prevData,
                isActive: e.target.checked
              }))}
            />
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

export default AmenityModalComponent;
