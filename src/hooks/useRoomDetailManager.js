import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export function useRoomDetailManager() {
const [roomDetail, setRoomDetail] = useState({});
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [showModal, setShowModal] = useState(false);


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

useEffect(() => {
    fetchRoomDetail();
}, [fetchRoomDetail]);

const handleCloseModal = () => {
    setShowModal(false);
}

const handleShowModal = () => {
    setShowModal(true);
}

    return {
        roomDetail,
        loading,
        error,
        showModal,
        handleCloseModal,
        handleShowModal,
    };
}