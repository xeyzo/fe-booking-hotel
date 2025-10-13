import axios from "axios";
import { useState, useCallback, useEffect } from "react";

export function useHomeManager() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4000/api';

    const fetchBookings = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/bookings`);
            setBookings(response?.data?.data);
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

    const handleChangeStatusBooking = async (status, id) => {
        const data = {
            bookingStatus: status
        };
        try {
            await axios.patch(`${API_BASE_URL}/bookings/${id}`, data);
            fetchBookings();
        } catch (error) {
            console.error("Failed to change booking status:", error);
        }
    };
    

    return {
        bookings,
        loading,
        error,
        handleChangeStatusBooking
    };
}