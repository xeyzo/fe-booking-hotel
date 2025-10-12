import React from 'react';
import { Modal, Button } from 'react-bootstrap';

// Perbaikan: Nama prop diubah menjadi `handleCancelBooking` agar konsisten
function CancelBookingModalComponent({ show, handleClose, handleCancelBooking, itemName }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        {/* Perbaikan: Judul disesuaikan */}
        <Modal.Title>Konfirmasi Pembatalan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Apakah Anda yakin ingin cancel booking untuk tamu <strong>{itemName}</strong>? Tindakan ini tidak dapat dibatalkan.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Tutup
        </Button>
        {/* Perbaikan: onClick bisa lebih sederhana */}
        <Button variant="danger" onClick={handleCancelBooking}>
          Ya, Cancel Booking
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CancelBookingModalComponent;