import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const initialFormState = {
  name: '',
  description: '',
  price: 0,
  isActive: false
};

export function useServiceManager() {
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4000/api';

  // --- State dari useRooms ---
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- State dari useRoomForm ---
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingService, setDeletingService] = useState(null)

  // --- Fungsi dari useRooms ---
  const fetchServices = useCallback( async() => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/service-types`);
      setServices(response.data.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Gagal terhubung atau memuat data.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  },[API_BASE_URL]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // --- Fungsi dari useRoomForm ---
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData(initialFormState);
    setEditingServiceId(null);
    setIsEditMode(false);
  };

  const handleShowAddModal = () => {
    setIsEditMode(false);
    setFormData(initialFormState);
    setShowModal(true);
  };

  const handleShowEditModal = (service) => {
    setIsEditMode(true);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      isActive: service.isActive
    });
    setEditingServiceId(service.id);
    setShowModal(true);
  };

  const handleShowDeleteModal = (serviceId) => {
    setDeletingService(serviceId);
    setShowDeleteModal(true);
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingService(null);
  }

  const handleDeleteService = async () => {
    const serviceId = deletingService;
      try {
            await axios.delete(`${API_BASE_URL}/service-types/${serviceId}`);
            fetchServices();
            setShowDeleteModal(false)
        } catch (error) {
            console.error("Gagal menghapus data:", error);
        }
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        await axios.put(`${API_BASE_URL}/service-types/${editingServiceId}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/service-types`, formData);
      }
      handleCloseModal();
      fetchServices(); // Langsung panggil fetchRooms karena berada dalam hook yang sama
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
    }
  };

  // Kembalikan semua state dan fungsi yang dibutuhkan oleh UI
  return {
    services,
    loading,
    error,
    showModal,
    isEditMode,
    formData,
    setFormData,
    handleShowAddModal,
    handleShowEditModal,
    handleCloseModal,
    handleSubmit,
    handleDeleteService,
    showDeleteModal,
    deletingService,
    handleCloseDeleteModal,
    handleShowDeleteModal
  };
}