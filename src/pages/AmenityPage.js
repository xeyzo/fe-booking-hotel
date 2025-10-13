import React from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useAmenityManager } from '../hooks/useAmenityManager';
import AmenityModalComponent from '../components/amenity-components/AmenityModalComponent';
import DeleteAmenityModalComponent from '../components/amenity-components/DeleteAmenityModalComponent';

function AmenityPage() {
  const {
    amenities,
    loading,
    error,
    showModal,
    isEditMode,
    formData,
    setFormData,
    handleShowAddModal,
    handleShowEditModal,
    handleCloseModal,
    handleSubmit,
    handleDeleteAmenity,
    showDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deletingAmenity
  } = useAmenityManager();

  if (loading && !showModal) {
    return <Container><p className="mt-4">Loading data...</p></Container>;
  }

  if (error) {
    return <Container><p className="mt-4 text-danger">Error: {error}</p></Container>;
  }

  return (
    <Container>
      <div className='mt-4'>
        <Row className="align-items-center">
          <Col><h3>Amenity Management</h3></Col>
          <Col className="text-end">
            <Button variant="primary" onClick={handleShowAddModal}>
              Add Amenity
            </Button>
          </Col>
        </Row>

        <Table striped bordered hover responsive className="mt-4">
          <thead className='table-dark'>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>isActive</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {amenities.content?.length === 0 ? ( 
              <tr><td colSpan="5" className="text-center">Belum ada data kamar.</td></tr>
            ) : (
              amenities.map(amenity => (
                <tr key={amenity.id}>
                  <td>{amenity.name}</td>
                  <td>{amenity.description}</td>
                  <td>{amenity.isActive ? 'Yes' : 'No'}</td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowEditModal(amenity)}>
                      Edit
                    </Button>
                    <Button onClick={()=> handleShowDeleteModal(amenity.id)} variant="danger" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      <AmenityModalComponent 
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
        isEditMode={isEditMode}
        amenityData={formData}
        setAmenityData={setFormData}
      />

      <DeleteAmenityModalComponent
          show={showDeleteModal}
          handleClose={handleCloseDeleteModal}
          handleConfirm={handleDeleteAmenity}
          itemName={deletingAmenity ? amenities.find(amenity => amenity.id === deletingAmenity)?.name : ''}
        />
    </Container>
  );
}

export default AmenityPage;