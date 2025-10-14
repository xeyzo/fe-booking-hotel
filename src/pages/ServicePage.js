import React from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useServiceManager } from '../hooks/useServiceManager';
import ServiceModalComponent from '../components/service-components/ServiceModalComponent';
import DeleteBookingModalComponent from '../components/booking-components/DeleteBookingModalComponent';

function ServicePage() {
  const {
    services,
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
    handleDeleteService,
    showDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deletingService,
    formError,
    transactionError
  } = useServiceManager();

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
          <Col><h3>Service Management</h3></Col>
          <Col className="text-end">
            <Button variant="primary" onClick={handleShowAddModal}>
              Add Service
            </Button>
          </Col>
        </Row>

        <Table striped bordered hover responsive className="mt-4">
          <thead className='table-dark'>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>isActive</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.content?.length === 0 ? (
              <tr><td colSpan="5" className="text-center">Belum ada data kamar.</td></tr>
            ) : (
              services.map(service => (
                <tr key={service.id}>
                  <td>{service.name}</td>
                  <td>{service.description}</td>
                  <td>Rp {Number(service.price).toLocaleString('id-ID')}</td>
                  <td>{service.isActive ? 'Yes' : 'No'}</td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowEditModal(service)}>
                      Edit
                    </Button>
                    <Button onClick={()=> handleShowDeleteModal(service.id)} variant="danger" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      <ServiceModalComponent 
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
        isEditMode={isEditMode}
        serviceData={formData}
        setServiceData={setFormData}
        formError={formError}
        transactionError={transactionError}
      />

      <DeleteBookingModalComponent
          show={showDeleteModal}
          handleClose={handleCloseDeleteModal}
          handleConfirm={handleDeleteService}
          itemName={deletingService ? services.find(service => service.id === deletingService)?.name : ''}
      />
    </Container>
  );
}

export default ServicePage;