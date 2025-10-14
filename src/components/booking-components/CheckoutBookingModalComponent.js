import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function CheckoutBookingModalComponent({ show, handleClose, handleCheckoutBooking, itemName }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Konfirmasi Checkout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Apakah Anda yakin ingin checkout booking untuk tamu <strong>{itemName}</strong>? Tindakan ini tidak dapat dibatalkan.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Tutup
        </Button>
        <Button variant="danger" onClick={handleCheckoutBooking}>
          Ya, Checkout sekarang
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CheckoutBookingModalComponent;