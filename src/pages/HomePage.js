import React from 'react';
import { Col, Container, Row, Card, Button, Spinner } from 'react-bootstrap';
import { useHomeManager } from '../hooks/useHomeManager';

function HomePage() {
  const { bookings, loading, error, handleChangeStatusBooking } = useHomeManager();

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return <Container><p className="mt-4 text-danger">Error: {error}</p></Container>;
  }

  const bookingList = Array.isArray(bookings) ? bookings : bookings.content || [];
  const today = new Date().toISOString().split('T')[0];

  const dataCheckin = bookingList.filter(data => 
    data.bookingStatus === 'BOOKED' && data.checkedInDate === today
  );
  
  const dataCheckout = bookingList.filter(data => 
    data.bookingStatus === 'CHECKED_IN' && data.checkedOutDate === today
  );

  return (
    <Container>
      <Row className="mt-4">
        {/* Kolom untuk Check-in */}
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header className='fw-bold bg-light'>
              <h4>Checking in Today ({dataCheckin.length})</h4>
            </Card.Header>
            <Card.Body>
              {dataCheckin.length > 0 ? (
                dataCheckin.map(booking => (
                  <Card key={booking.id} className="mb-3">
                    <Row className="g-0 align-items-center">
                      <Col md={8}>
                        <div className='m-3'>
                          <div className='fw-bold'>{`${booking.firstName} ${booking.lastName}`}</div>
                          <div>{formatDate(booking.checkedInDate)}</div>
                        </div>
                      </Col>
                      <Col md={4} className='text-end'>
                        <div className='m-3'>
                          {/* PERBAIKAN: Panggil fungsi di dalam onClick */}
                          <Button 
                            variant="warning" 
                            onClick={() => handleChangeStatusBooking('CHECKED_IN', booking.id)}
                          >
                            Check in
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                ))
              ) : (
                <p className="text-muted">No guests are checking in today.</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Kolom untuk Check-out */}
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header className='fw-bold bg-light'>
              <h4>Checking out Today ({dataCheckout.length})</h4>
            </Card.Header>
            <Card.Body>
              {dataCheckout.length > 0 ? (
                dataCheckout.map(booking => (
                  <Card key={booking.id} className="mb-3">
                     <Row className="g-0 align-items-center">
                      <Col md={8}>
                        <div className='m-3'>
                          <div className='fw-bold'>{`${booking.firstName} ${booking.lastName}`}</div>
                          <div>{formatDate(booking.checkedOutDate)}</div>
                        </div>
                      </Col>
                      <Col md={4} className='text-end'>
                        <div className='m-3'>
                          {/* PERBAIKAN: Panggil fungsi di dalam onClick */}
                          <Button 
                            variant="danger"
                            onClick={() => handleChangeStatusBooking('CHECKED_OUT', booking.id)}
                          >
                            Check out
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                ))
              ) : (
                <p className="text-muted">No guests are checking out today.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;