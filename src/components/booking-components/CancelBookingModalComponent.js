import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function CancelBookingModalComponent({ show, handleClose, handleCancelBooking, itemName }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Konfirmasi Pembatalan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Apakah Anda yakin ingin membatalkan pesanan untuk tamu <strong>{itemName}</strong>? Tindakan ini tidak dapat dibatalkan.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Tutup
        </Button>
        <Button variant="danger" onClick={handleCancelBooking}>
          Ya, Cancel Booking
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CancelBookingModalComponent;