import React from "react";
import { render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

import { useBookingManager } from "../hooks/useBookingManager";
import BookingPage from "../pages/BookingPage";

jest.mock("../hooks/useBookingManager");

const mockUseBookingManager = useBookingManager;

describe("BookingPage", () => {
  beforeEach(() => {
    mockUseBookingManager.mockReturnValue({
      bookings: [],
      loading: false,
      error: null,
      showModal: false,
      isEditMode: false,
      formData: {},
      setFormData: jest.fn(),
      handleShowAddModal: jest.fn(),
      handleCloseModal: jest.fn(),
      handleSubmit: jest.fn(),
      showDeleteModal: false,
      deletingBooking: null,
      handleCloseDeleteModal: jest.fn(),
      handleShowDeleteModal: jest.fn(),
      handleDeleteBooking: jest.fn(),
      availableRooms: null,
      handleGetAvailableRooms: jest.fn(),
      showCancelModal: false,
      cancellingBooking: null,
      handleCloseCancelModal: jest.fn(),
      handleShowCancelModal: jest.fn(),
      handleCancelBooking: jest.fn(),
      showCheckoutModal: false,
      checkoutBooking: null,
      handleCloseCheckoutModal: jest.fn(),
      handleShowCheckoutModal: jest.fn(),
      handleCheckoutBooking: jest.fn(),
      formError: null,
      transactionError: null,
    });
  });

  test("renders booking page with add button", () => {
    render(<BookingPage />);
    expect(screen.getByText("Booking Management")).toBeInTheDocument();
    expect(screen.getByText("Add Booking")).toBeInTheDocument();
  });

  test("shows add booking modal when add button is clicked", () => {
    const handleShowAddModal = jest.fn();
    mockUseBookingManager.mockReturnValueOnce({
      ...mockUseBookingManager(),
      handleShowAddModal,
    });
    render(<BookingPage />);
    userEvent.click(screen.getByText("Add Booking"));
    expect(handleShowAddModal).toHaveBeenCalledTimes(1);
  });

  test("displays bookings in the table", () => {
    const bookings = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        roomNumber: "101",
        checkedInDate: "2025-10-19",
        checkedOutDate: "2025-10-20",
        adultCapacity: 2,
        childrenCapacity: 0,
        bookingStatus: "BOOKED",
      },
    ];
    mockUseBookingManager.mockReturnValueOnce({
      ...mockUseBookingManager(),
      bookings,
    });
    render(<BookingPage />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("101")).toBeInTheDocument();
    expect(screen.getByText("BOOKED")).toBeInTheDocument();
  });

  test("shows cancel modal when cancel button is clicked", () => {
    const handleShowCancelModal = jest.fn();
    const bookings = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        bookingStatus: "BOOKED",
      },
    ];
    mockUseBookingManager.mockReturnValueOnce({
      ...mockUseBookingManager(),
      bookings,
      handleShowCancelModal,
    });
    render(<BookingPage />);
    userEvent.click(screen.getByText("Cancel"));
    expect(handleShowCancelModal).toHaveBeenCalledWith(1);
  });

  test("shows delete modal when delete button is clicked", () => {
    const handleShowDeleteModal = jest.fn();
    const bookings = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        bookingStatus: "CANCELED",
      },
    ];
    mockUseBookingManager.mockReturnValueOnce({
      ...mockUseBookingManager(),
      bookings,
      handleShowDeleteModal,
    });
    render(<BookingPage />);
    userEvent.click(screen.getByText("Delete"));
    expect(handleShowDeleteModal).toHaveBeenCalledWith(1);
  });

  test("shows checkout modal when checkout button is clicked", () => {
    const handleShowCheckoutModal = jest.fn();
    const bookings = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        bookingStatus: "CHECKED_IN",
      },
    ];
    mockUseBookingManager.mockReturnValueOnce({
      ...mockUseBookingManager(),
      bookings,
      handleShowCheckoutModal,
    });
    render(<BookingPage />);
    userEvent.click(screen.getByText("Check out"));
    expect(handleShowCheckoutModal).toHaveBeenCalledWith(1);
  });
});