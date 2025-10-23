import { Modal, Button, Form } from 'react-bootstrap';

function AddingAmenityModalComponent({ show, handleClose, handleSave, amenityData, formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Tambahkan Amenity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Pilih amenity yang akan ditambahkan</Form.Label>
          <Form.Select
            name="amenityTypeId" 
            value={formData.amenityTypeId || ''} 
            onChange={handleChange}
          >
            <option value="" disabled>--Pilih amenity--</option>
            {amenityData.map((amenity) => (
              <option key={amenity.id} value={amenity.id}>{amenity.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Note</Form.Label>
          <Form.Control
            as="textarea"
            name="notes" 
            value={formData.notes || ''}
            onChange={handleChange}
            placeholder="Catatan (opsional)"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Batal
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Simpan
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddingAmenityModalComponent;