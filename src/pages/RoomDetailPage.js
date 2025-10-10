import React from "react";
import { useRoomDetailManager } from "../hooks/useRoomDetailManager";
import { useAmenityManager } from "../hooks/useAmenityManager";
import { Card, Col, Row, Container, Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChildren } from '@fortawesome/free-solid-svg-icons';
import AddingAmenityModalComponent from "../components/room-detail-components/AddingAmenityModalComponent";

function RoomDetailPage() {
  const { roomDetail, showModal, handleCloseModal, handleShowModal, selectedAmenities, handleSubmit, formData, setFormData, handleDelete} = useRoomDetailManager();
  const { amenities } = useAmenityManager();
  return (
    <Container className="mt-4">
    <Card>
      <Card.Header className="fw-bold">Room {roomDetail?.roomNumber}</Card.Header>
      <Card.Body>
        <Card.Text style={{ textAlign: "justify" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
            recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.        
        </Card.Text>
        <Row>
            <Col>
                <FontAwesomeIcon className="me-1" icon={faUser} />{roomDetail?.adultCapacity}
                <FontAwesomeIcon className="ms-2 me-1" icon={faChildren} />{roomDetail?.childrenCapacity}
            </Col>
            <Col>
                <div className="text-end fw-bold text-success">
                    Rp {Number(roomDetail?.roomPrice).toLocaleString('id-ID')}
                </div>
            </Col>
        </Row>      
      </Card.Body>
    </Card>
    <div className="mt-3 fw-bold" style={{ textAlign: 'end' }}> 
        <Button variant="primary" onClick={handleShowModal} className="mt-3">Add Amenity in Room</Button>
    </div>

    <Table striped bordered hover responsive className="mt-4">
          <thead className='table-dark'>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {selectedAmenities.content?.length === 0 ? (
              <tr><td colSpan="5" className="text-center">Belum ada data kamar.</td></tr>
            ) : (
              selectedAmenities.map(amenity => (
                <tr key={amenity.id}>
                  <td>{amenity.amenityTypeName}</td>
                  <td>{amenity.notes}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(amenity.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

    <AddingAmenityModalComponent 
        show={showModal}
        handleClose={handleCloseModal}
        handleShowModal={handleShowModal}
        amenityData={amenities}
        handleSave={handleSubmit}
        formData={formData}
        setFormData={setFormData}
    />
    </Container>
  );
}

export default RoomDetailPage;