import React from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useBookingManager } from '../hooks/useBookingManager'; 
import { AddBookingModalComponent } from '../components/booking-components/AddBookingModalComponent';
import DeleteBookingModalComponent from '../components/booking-components/DeleteBookingModalComponent';
import CancelBookingModalComponent from '../components/booking-components/CancelBookingModalComponent';

function BookingPage() {
  const {
    bookings, loading, error,
    showModal, isEditMode, formData, setFormData,
    handleShowAddModal, handleCloseModal, handleSubmit,
    showDeleteModal, deletingBooking, handleCloseDeleteModal, handleShowDeleteModal, handleDeleteBooking,
    availableRooms, handleGetAvailableRooms, 
    showCancelModal, cancellingBooking, handleCloseCancelModal, handleShowCancelModal, handleCancelBooking
  } = useBookingManager();

  if (loading && !showModal && !showDeleteModal && !showCancelModal) {
    return <Container><p className="mt-4">Loading data...</p></Container>;
  }

  if (error) {
    return <Container><p className="mt-4 text-danger">Error: {error}</p></Container>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
  };
  
  const bookingList = Array.isArray(bookings) ? bookings : bookings.content || [];

  const findBookingGuestName = (bookingId) => {
    if (!bookingId) return '';
    const booking = bookingList.find(b => b.id === bookingId);
    return booking ? `${booking.firstName} ${booking.lastName}`.trim() : '';
  };

  return (
    <Container>
      <div className='mt-4'>
        <Row className="align-items-center">
          <Col><h3>Booking Management</h3></Col>
          <Col className="text-end">
            <Button variant="primary" onClick={handleShowAddModal}>
              Add Booking
            </Button>
          </Col>
        </Row>

        <Table striped bordered hover responsive className="mt-4">
          <thead className='table-dark'>
            <tr>
              <th>Guest Name</th>
              <th>Room</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Guests (A/C)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookingList.length === 0 ? (
              <tr><td colSpan="7" className="text-center">No booking data available.</td></tr>
            ) : (
              bookingList.map(booking => (
                <tr key={booking.id}>
                  <td>{`${booking.firstName} ${booking.lastName}`}</td>
                  <td>{booking.roomNumber || `ID: ${booking.roomId}`}</td>
                  <td>{formatDate(booking.checkedInDate)}</td>
                  <td>{formatDate(booking.checkedOutDate)}</td>
                  <td>{`${booking.adultCapacity}/${booking.childrenCapacity}`}</td>
                  <td>{booking.bookingStatus}</td>
                  <td>
                    {booking.bookingStatus === 'BOOKED' && (
                      <Button 
                        variant="warning" 
                        size="sm" 
                        className="me-2" 
                        onClick={() => handleShowCancelModal(booking.id)}
                      >
                        Cancel
                      </Button>
                    )}
                    {(booking.bookingStatus === 'CHECKED_OUT' || booking.bookingStatus === 'CANCELED') && (
                      <Button 
                        onClick={() => handleShowDeleteModal(booking.id)} 
                        variant="danger" 
                        size="sm"
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
      
      <AddBookingModalComponent 
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
        isEditMode={isEditMode}
        bookingData={formData}
        setBookingData={setFormData}
        handleGetAvailableRooms={handleGetAvailableRooms}
        availableRooms={availableRooms}
      />
      
      <DeleteBookingModalComponent
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleConfirm={handleDeleteBooking}
        itemName={findBookingGuestName(deletingBooking)}
      />

      <CancelBookingModalComponent 
        show={showCancelModal}
        handleClose={handleCloseCancelModal}
        handleCancelBooking={handleCancelBooking}
        itemName={findBookingGuestName(cancellingBooking)}
      />
    </Container>
  );
}

export default BookingPage;