import React from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useRoomManager } from '../hooks/useRoomManager';
import PaginationComponent from '../components/common-components/PaginationComponent';
import RoomModalComponent from '../components/room-components/RoomModalComponent';
import DeleteConfirmationModalComponent from '../components/room-components/DeleteRoomModalComponent';
import {Link} from 'react-router-dom';

function RoomPage() {
  const {
    rooms,
    loading,
    error,
    currentPage,
    setCurrentPage,
    showModal,
    isEditMode,
    formData,
    setFormData,
    handleShowAddModal,
    handleShowEditModal,
    handleCloseModal,
    handleSubmit,
    handleDeleteRoom,
    showDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deletingRoom
  } = useRoomManager();

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
          <Col><h3>Room Management</h3></Col>
          <Col className="text-end">
            <Button variant="primary" onClick={handleShowAddModal}>
              Add Room
            </Button>
          </Col>
        </Row>

        <Table striped bordered hover responsive className="mt-4">
          <thead className='table-dark'>
            <tr>
              <th>Room Number</th>
              <th>Adult Capacity</th>
              <th>Children Capacity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.content?.length === 0 ? (
              <tr><td colSpan="5" className="text-center">Belum ada data kamar.</td></tr>
            ) : (
              rooms.content?.map(room => (
                <tr key={room.id}>
                  <td>
                    <li>
                      <Link to={`/rooms/${room.id}`} className="text-decoration-none">
                        {room.roomNumber}
                      </Link>
                    </li>         
                  </td>
                  <td>{room.adultCapacity}</td>
                  <td>{room.childrenCapacity}</td>
                  <td>Rp {Number(room.roomPrice).toLocaleString('id-ID')}</td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowEditModal(room)}>
                      Edit
                    </Button>
                    <Button onClick={()=> handleShowDeleteModal(room.id)} variant="danger" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <PaginationComponent 
          currentPage={currentPage}
          totalPages={rooms.totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <RoomModalComponent 
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
        isEditMode={isEditMode}
        roomData={formData}
        setRoomData={setFormData}
      />

      <DeleteConfirmationModalComponent
          show={showDeleteModal}
          handleClose={handleCloseDeleteModal}
          handleConfirm={handleDeleteRoom}
          itemName={deletingRoom ? rooms.content.find(room => room.id === deletingRoom)?.roomNumber : ''}
        />
    </Container>
  );
}

export default RoomPage;