import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const initialFormState = {
  roomNumber: '',
  adultCapacity: 1,
  childrenCapacity: 0,
  roomPrice: 0
};

export function useRoomManager() {
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4000/api';

  // --- State dari useRooms ---
  const [rooms, setRooms] = useState({ content: [], totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  // --- State dari useRoomForm ---
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingRoom, setDeletingRoom] = useState(null)

  // --- Fungsi dari useRooms ---
  const fetchRooms = useCallback( async() => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/rooms?page=${currentPage}&size=10`);
      setRooms(response.data.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Gagal terhubung atau memuat data.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  },[currentPage, API_BASE_URL]);

  useEffect(() => {
    fetchRooms();
  }, [currentPage, fetchRooms]);

  // --- Fungsi dari useRoomForm ---
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData(initialFormState);
    setEditingRoomId(null);
    setIsEditMode(false);
  };

  const handleShowAddModal = () => {
    setIsEditMode(false);
    setFormData(initialFormState);
    setShowModal(true);
  };

  const handleShowEditModal = (room) => {
    setIsEditMode(true);
    setFormData({
      roomNumber: room.roomNumber,
      adultCapacity: room.adultCapacity,
      childrenCapacity: room.childrenCapacity,
      roomPrice: room.roomPrice
    });
    setEditingRoomId(room.id);
    setShowModal(true);
  };

  const handleShowDeleteModal = (roomId) => {
    setDeletingRoom(roomId);
    setShowDeleteModal(true);
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingRoom(null);
  }

  const handleDeleteRoom = async () => {
    const roomId = deletingRoom;
      try {
            await axios.delete(`${API_BASE_URL}/rooms/${roomId}`);
            fetchRooms();
            setShowDeleteModal(false)
        } catch (error) {
            console.error("Gagal menghapus data:", error);
        }
  };


  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        await axios.put(`${API_BASE_URL}/rooms/${editingRoomId}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/rooms`, formData);
      }
      handleCloseModal();
      fetchRooms(); // Langsung panggil fetchRooms karena berada dalam hook yang sama
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
    }
  };

  // Kembalikan semua state dan fungsi yang dibutuhkan oleh UI
  return {
    rooms,
    loading,
    error,
    currentPage,
    setCurrentPage,
    showModal,
    isEditMode,
    formData,
    setFormData,
    handleShowAddModal,
    handleShowEditModal,
    handleCloseModal,
    handleSubmit,
    handleDeleteRoom,
    showDeleteModal,
    deletingRoom,
    handleCloseDeleteModal,
    handleShowDeleteModal
  };
}