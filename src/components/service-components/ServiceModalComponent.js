import React from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

function ServiceModalComponent({ show, handleClose, handleSubmit, serviceData, setServiceData, isEditMode, formError, transactionError}) {

  // Fungsi generik untuk input text/number
  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? 'Edit Service Types' : 'Add New ServiceTypes'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {transactionError && <Alert variant="danger">{transactionError}</Alert>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              name="name" 
              value={serviceData.name || ''} 
              onChange={handleChange}
              placeholder="Enter name" 
              autoFocus
              isInvalid={!!formError?.name}
            />
            <Form.Control.Feedback type="invalid">
              {formError?.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control 
              type="number" 
              name="price" 
              value={serviceData.price || 0} 
              onChange={handleChange}
              isInvalid={!!formError?.price}    
            />
            <Form.Control.Feedback type="invalid">
              {formError?.price}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea" 
              name="description" 
              value={serviceData.description || ''} 
              onChange={handleChange}
              placeholder="Enter description"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="isActive"
              checked={serviceData.isActive || false}
              onChange={(e) => setServiceData(prevData => ({
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

export default ServiceModalComponent;
