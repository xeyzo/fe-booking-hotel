import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// State awal yang benar untuk form booking
const initialFormState = {
  firstName: '',
  lastName: '',
  checkedInDate: '',
  checkedOutDate: '',
  adultCapacity: 1,
  childrenCapacity: 0,
  roomId: 0
};

export function useBookingManager() {
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4000/api';

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingBooking, setDeletingBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancellingBooking, setCancellingBooking] = useState(null);
  const [availableRooms, setAvailableRooms] = useState(null);
  
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/bookings`);
      setBookings(response.data.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to connect or load data.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData(initialFormState);
    setEditingBookingId(null);
    setIsEditMode(false);
    setAvailableRooms(null);
  };

  const handleShowAddModal = () => {
    setIsEditMode(false);
    setFormData(initialFormState);
    setAvailableRooms(null); 
    setShowModal(true);
  };

  const handleShowEditModal = (booking) => {
    setIsEditMode(true);
    setFormData({
      firstName: booking.firstName,
      lastName: booking.lastName,
      checkedInDate: booking.checkedInDate,
      checkedOutDate: booking.checkedOutDate,
      adultCapacity: booking.adultCapacity,
      childrenCapacity: booking.childrenCapacity,
      roomId: booking.roomId,
      id: booking.id
    });
    setEditingBookingId(booking.id);
    setShowModal(true);
  };
  
  const handleGetAvailableRooms = async () => {
    try {
      const body = {
          checkInDate: formData.checkedInDate,
          checkOutDate: formData.checkedOutDate,
          numberOfAdults: formData.adultCapacity,
          numberOfChildrens: formData.childrenCapacity
      };
      const response = await axios.post(`${API_BASE_URL}/rooms/available-room`, body);
      setAvailableRooms(response.data.data || null);
    } catch (error) {
      console.error("Failed to get available rooms:", error.response?.data || error.message);
      console.log(error.response?.data?.errors?.fieldErrors?.checkInDate || error.response?.data?.errors?.fieldErrors?.checkInDate)
      setAvailableRooms(null);
    }
  };

  const handleSubmit = async () => {
    if (!formData.roomId && (!availableRooms || !availableRooms.id)) {
        console.error("No room selected or found.");
        return;
    }

    const finalFormData = {
        ...formData,
        roomId: availableRooms ? Number(availableRooms.id) : formData.roomId
    };

    try {
      if (isEditMode) {
        await axios.put(`${API_BASE_URL}/bookings/${editingBookingId}`, finalFormData);
      } else {
        await axios.post(`${API_BASE_URL}/bookings`, finalFormData);
      }
      handleCloseModal();
      fetchBookings();
    } catch (error) {
      console.error("Failed to save data:", error.response?.data || error.message);
    }
  };
  
  const handleShowDeleteModal = (bookingId) => {
    setDeletingBooking(bookingId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingBooking(null);
  };
  
  const handleDeleteBooking = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/bookings/${deletingBooking}`);
      fetchBookings();
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Failed to delete data:", error);
    }
  };

  const handleShowCancelModal = (bookingId) => {
    setCancellingBooking(bookingId);
    setShowCancelModal(true);
  }

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
    setCancellingBooking(null);
  }

  const handleCancelBooking = async () => {
    if (!cancellingBooking) return;
    const data = {
      bookingStatus: 'CANCELED'
    }
    try {
      await axios.patch(`${API_BASE_URL}/bookings/${cancellingBooking}`, data);
      fetchBookings();
      handleCloseCancelModal();
    } catch (error) {
      console.error("Failed to cancel booking:", error);
    }
  };

  return {
    bookings, loading, error, showModal, isEditMode, formData, setFormData,
    handleShowAddModal, handleShowEditModal, handleCloseModal, handleSubmit,
    showDeleteModal, deletingBooking, handleCloseDeleteModal, handleShowDeleteModal, handleDeleteBooking,
    availableRooms, handleGetAvailableRooms, 
    showCancelModal, cancellingBooking, handleCloseCancelModal, handleShowCancelModal, handleCancelBooking
  };
}