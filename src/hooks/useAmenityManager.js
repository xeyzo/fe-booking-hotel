import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const initialFormState = {
  name: '',
  description: '',
  isActive: false
};

export function useAmenityManager() {
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4000/api';

  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [editingAmenityId, setEditingAmenityId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingAmenity, setDeletingAmenity] = useState(null);
  const [formError, setFormError] = useState([]);
  const [transactionError, setTransactionError] = useState('');

  const fetchAmenities = useCallback( async() => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/amenity-types`);
      setAmenities(response.data.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Gagal terhubung atau memuat data.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  },[API_BASE_URL]);

  useEffect(() => {
    fetchAmenities();
  }, [fetchAmenities]);

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData(initialFormState);
    setEditingAmenityId(null);
    setIsEditMode(false);
  };

  const handleShowAddModal = () => {
    setIsEditMode(false);
    setFormData(initialFormState);
    setShowModal(true);
  };

  const handleShowEditModal = (amenity) => {
    setIsEditMode(true);
    setFormData({
      name: amenity.name,
      description: amenity.description,
      isActive: amenity.isActive,
    });
    setEditingAmenityId(amenity.id);
    setShowModal(true);
  };

  const handleShowDeleteModal = (amenityId) => {
    setDeletingAmenity(amenityId);
    setShowDeleteModal(true);
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingAmenity(null);
  }

  const handleDeleteAmenity = async () => {
    const amenityId = deletingAmenity;
      try {
            await axios.delete(`${API_BASE_URL}/amenity-types/${amenityId}`);
            fetchAmenities();
            setShowDeleteModal(false)
        } catch (error) {
            console.error("Gagal menghapus data:", error);
        }
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        await axios.put(`${API_BASE_URL}/amenity-types/${editingAmenityId}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/amenity-types`, formData);
      }
      handleCloseModal();
      fetchAmenities(); 
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      setFormError(error?.response?.data?.errors?.fieldErrors)
      setTransactionError(error?.response?.data?.message)
    }
  };

  return {
    amenities,
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
    handleDeleteAmenity,
    showDeleteModal,
    deletingAmenity,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    formError,
    transactionError
  };
}