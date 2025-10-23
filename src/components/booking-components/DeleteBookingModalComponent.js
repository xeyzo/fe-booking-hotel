import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeleteBookingModalComponent({ show, handleClose, handleConfirm, itemName }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Konfirmasi Hapus</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Apakah Anda yakin ingin menghapus data booking untuk tamu <strong>{itemName}</strong>? Tindakan ini tidak dapat dibatalkan.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Batal
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Ya, Hapus
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteBookingModalComponent;