// src/tests/RoomPage.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RoomPage from '../pages/RoomPage';
import { useRoomManager } from '../hooks/useRoomManager';

// 1. Mock the custom hook
jest.mock('../hooks/useRoomManager');

// 2. Cast the mocked hook to satisfy TypeScript/autocomplete
const mockUseRoomManager = useRoomManager;

describe('RoomPage', () => {
  // 3. Create a base mock state in one place
  let baseMockState;

  beforeEach(() => {
    // Reset the base state before each test to ensure test isolation
    baseMockState = {
      rooms: { content: [], totalPages: 0 },
      loading: false,
      error: null,
      currentPage: 0,
      setCurrentPage: jest.fn(),
      showModal: false,
      isEditMode: false,
      formData: { roomNumber: '', adultCapacity: 1, childrenCapacity: 0, roomPrice: 0 },
      formError: null,
      transactionError: '',
      setFormData: jest.fn(),
      handleShowAddModal: jest.fn(),
      handleShowEditModal: jest.fn(),
      handleCloseModal: jest.fn(),
      handleSubmit: jest.fn(),
      handleDeleteRoom: jest.fn(),
      showDeleteModal: false,
      handleCloseDeleteModal: jest.fn(),
      handleShowDeleteModal: jest.fn(),
      deletingRoom: null,
    };
    // Set the default mock implementation for all tests
    mockUseRoomManager.mockReturnValue(baseMockState);
  });

  // --- Rendering States ---
  test('renders loading state initially', () => {
    // 5. Use the base state and override properties as needed for the specific test
    mockUseRoomManager.mockReturnValueOnce({
      ...baseMockState,
      loading: true,
    });
    render(<RoomPage />);
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  test('renders error message if an error occurs', () => {
    mockUseRoomManager.mockReturnValueOnce({
      ...baseMockState,
      error: 'Failed to fetch',
    });
    render(<RoomPage />);
    expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
  });

  test('renders room management title and add button', () => {
    render(<RoomPage />);
    expect(screen.getByText('Room Management')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Room' })).toBeInTheDocument();
  });

  // --- Table Display ---
  test('displays rooms in the table', () => {
    const roomsData = {
      content: [
        { id: 1, roomNumber: '101', adultCapacity: 2, childrenCapacity: 1, roomPrice: 500000 },
        { id: 2, roomNumber: '102', adultCapacity: 3, childrenCapacity: 0, roomPrice: 700000 },
      ],
      totalPages: 1,
    };
    mockUseRoomManager.mockReturnValueOnce({
      ...baseMockState,
      rooms: roomsData,
    });

    render(<RoomPage />);
    expect(screen.getByText('101')).toBeInTheDocument();
    expect(screen.getByText('102')).toBeInTheDocument();
  });

  // --- User Interactions ---
  test('calls handleShowAddModal when add room button is clicked', async () => {
    render(<RoomPage />);
    await userEvent.click(screen.getByRole('button', { name: 'Add Room' }));
    // Check the mock function from the base state
    expect(baseMockState.handleShowAddModal).toHaveBeenCalledTimes(1);
  });

  test('calls handleShowEditModal when edit button is clicked', async () => {
    const roomToEdit = { id: 1, roomNumber: '101', adultCapacity: 2, childrenCapacity: 1, roomPrice: 500000 };
    mockUseRoomManager.mockReturnValueOnce({
      ...baseMockState,
      rooms: { content: [roomToEdit], totalPages: 1 },
    });

    render(<RoomPage />);
    await userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    expect(baseMockState.handleShowEditModal).toHaveBeenCalledWith(roomToEdit);
  });

  test('calls handleShowDeleteModal when delete button is clicked', async () => {
    const roomToDelete = { id: 1, roomNumber: '101', adultCapacity: 2, childrenCapacity: 1, roomPrice: 500000 };
    mockUseRoomManager.mockReturnValueOnce({
      ...baseMockState,
      rooms: { content: [roomToDelete], totalPages: 1 },
    });

    render(<RoomPage />);
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(baseMockState.handleShowDeleteModal).toHaveBeenCalledWith(roomToDelete.id);
  });

  // --- Modal Visibility ---
  test('renders add modal when showModal is true for adding', () => {
    mockUseRoomManager.mockReturnValueOnce({
      ...baseMockState,
      showModal: true,
      isEditMode: false,
    });

    render(<RoomPage />);
    // Assuming the modal has a title "Add New Room"
    expect(screen.getByText('Add New Room')).toBeInTheDocument();
  });

  test('renders edit modal when showModal is true for editing', () => {
    mockUseRoomManager.mockReturnValueOnce({
      ...baseMockState,
      showModal: true,
      isEditMode: true,
    });

    render(<RoomPage />);
    // Assuming the modal has a title "Edit Room"
    expect(screen.getByText('Edit Room')).toBeInTheDocument();
  });

  test('renders delete modal when showDeleteModal is true', () => {
    mockUseRoomManager.mockReturnValueOnce({
      ...baseMockState,
      showDeleteModal: true,
      deletingRoom: { id: 1 }, // Mock data for the modal
    });

    render(<RoomPage />);
    // Assuming the modal has a title "Delete Confirmation" after the previous text was not found.
    expect(screen.getByText('Konfirmasi Hapus')).toBeInTheDocument();
  });

  // --- Pagination ---
  test('calls setCurrentPage when pagination button is clicked', async () => {
    mockUseRoomManager.mockReturnValueOnce({
      ...baseMockState,
      rooms: { content: [], totalPages: 2 },
    });

    render(<RoomPage />);
    await userEvent.click(screen.getByText('2'));
    expect(baseMockState.setCurrentPage).toHaveBeenCalledWith(1); // Page '2' corresponds to index 1
  });
});