import { Modal, Button, Form, Col, Row } from 'react-bootstrap';

export function AddBookingModalComponent({ 
  show, handleClose, handleSubmit, isEditMode, 
  bookingData, setBookingData, 
  handleGetAvailableRooms, availableRooms 
}) {
  
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'number' ? parseInt(value, 10) || 0 : value;

    setBookingData(prevState => ({
      ...prevState,
      [name]: finalValue,
    }));
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? 'Edit Booking' : 'Add New Booking'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="firstName" value={bookingData.firstName || ''} onChange={handleChange} placeholder="Enter first name" autoFocus />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="lastName" value={bookingData.lastName || ''} onChange={handleChange} placeholder="Enter last name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Check In Date</Form.Label>
            <Form.Control type="date" name="checkedInDate" value={bookingData.checkedInDate || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Check Out Date</Form.Label>
            <Form.Control type="date" name="checkedOutDate" value={bookingData.checkedOutDate || ''} onChange={handleChange} />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Adults</Form.Label>
                <Form.Control type="number" name="adultCapacity" value={bookingData.adultCapacity || 0} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Children</Form.Label>
                <Form.Control type="number" name="childrenCapacity" value={bookingData.childrenCapacity || 0} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <hr />

          <Form.Group className="mb-3 text-start">
            <Button variant="warning" onClick={handleGetAvailableRooms}>
              Check Available Rooms
            </Button>
          </Form.Group>
          
        {availableRooms && (
          <Form.Group className="mb-3">
            Room Number: {availableRooms?.roomNumber || 0} | Rp {Number(availableRooms?.roomPrice).toLocaleString('id-ID')} / night
          </Form.Group>
        )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        {availableRooms && (
        <Button variant="primary" onClick={handleSubmit}>
            Book now
        </Button>
        )}   
      </Modal.Footer>
    </Modal>
  );
}