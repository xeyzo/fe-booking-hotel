import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function BookingPage() {
  return (
      <Container>
        <div className='mt-4'>
        <Row className="align-items-center">
          <Col><h3>Booking Management</h3></Col>
          <Col className="text-end">
            <Button variant="primary">
              Add Booking
            </Button>
          </Col>
        </Row>
        </div>

      </Container>
  );
}

export default BookingPage;