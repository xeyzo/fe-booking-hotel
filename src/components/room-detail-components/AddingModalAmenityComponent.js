import { Modal, Button, Form } from 'react-bootstrap';


function AddingModalAmenityComponent({ show, handleClose, handleSubmit, roomData, setRoomData, isEditMode }) {
  return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Konfirmasi Hapus</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Tampilkan nama item yang akan dihapus agar lebih jelas */}
                <Form.Group className="mb-3">
                <Form.Label>Pilih amenity yang akan ditambahkan</Form.Label>
                <Form.Select>
                    <option value="">--Pilih salah satu--</option>
                    <option value="apel">Apel</option>
                    <option value="mangga">Mangga</option>
                    <option value="jeruk">Jeruk</option>
                </Form.Select>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Batal
                </Button>
                <Button variant="danger">
                  Ya, Hapus
                </Button>
            </Modal.Footer>
        </Modal>
  )
}

export default AddingModalAmenityComponent;