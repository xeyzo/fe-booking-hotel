import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const initialFormState = {
  amenityTypeId: 0,
  notes: '',
};

export function useRoomDetailManager() {
    const [roomDetail, setRoomDetail] = useState({});
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingAmenity, setLoadingAmenity] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState(initialFormState);

    const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4000/api';
    const { id } = useParams();

    const fetchRoomDetail = useCallback( async() => {
    setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/rooms/${id}`);
            setRoomDetail(response.data.data);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Gagal terhubung atau memuat data.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    },[API_BASE_URL, id]);

    const fetchAmenityRoom = useCallback( async() => {
    setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/rooms/${id}/amenities`);
            setSelectedAmenities(response.data.data);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Gagal terhubung atau memuat data.";
            setError(errorMessage);
        } finally {
            setLoadingAmenity(false);
        }
    },[API_BASE_URL, id]);

    useEffect(() => {
        fetchRoomDetail();
        fetchAmenityRoom();
    }, [fetchRoomDetail, fetchAmenityRoom]);

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleShowModal = () => {
        setShowModal(true);
        setFormData(initialFormState);
    }

    const handleSubmit = async () => {
        try {
            await axios.post(`${API_BASE_URL}/rooms/${id}/amenities`, formData);
            handleCloseModal();
            fetchAmenityRoom()
        } catch (error) {
            console.error("Gagal menyimpan data:", error);
        }
    };

    const handleDelete = async (amenityId) => {
        try {
            await axios.delete(`${API_BASE_URL}/rooms/${id}/amenities/${amenityId}`);   
            fetchAmenityRoom();
        } catch (error) {
            console.error("Gagal menghapus data:", error);
        }
    };  


        return {
            roomDetail,
            loading,
            error,
            showModal,
            formData,
            loadingAmenity,
            selectedAmenities,
            handleDelete,
            setFormData,
            handleCloseModal,
            handleShowModal,
            handleSubmit,
        };
    }