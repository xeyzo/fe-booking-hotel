import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RoomPage from '../pages/RoomPage';
import { useRoomManager } from '../hooks/useRoomManager';

jest.mock('../hooks/useRoomManager');

const mockUseRoomManager = useRoomManager;

describe('RoomPage', () => {
  let baseMockState;

  beforeEach(() => {
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
    mockUseRoomManager.mockReturnValue(baseMockState);
  });

  test('renders loading state initially', () => {
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

  test('calls handleShowAddModal when add room button is clicked', async () => {
    render(<RoomPage />);
    await userEvent.click(screen.getByRole('button', { name: 'Add Room' }));
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

  test('renders add modal when showModal is true for adding', () => {
    mockUseRoomManager.mockReturnValueOnce({
      ...baseMockState,
      showModal: true,
      isEditMode: false,
    });

    render(<RoomPage />);
    expect(screen.getByText('Add New Room')).toBeInTheDocument();
  });

  test('renders edit modal when showModal is true for editing', () => {
    mockUseRoomManager.mockReturnValueOnce({
      ...baseMockState,
      showModal: true,
      isEditMode: true,
    });

    render(<RoomPage />);
    expect(screen.getByText('Edit Room')).toBeInTheDocument();
  });

  test('renders delete modal when showDeleteModal is true', () => {
    mockUseRoomManager.mockReturnValueOnce({
      ...baseMockState,
      showDeleteModal: true,
      deletingRoom: { id: 1 },
    });

    render(<RoomPage />);
    expect(screen.getByText('Konfirmasi Hapus')).toBeInTheDocument();
  });

  test('calls setCurrentPage when pagination button is clicked', async () => {
    mockUseRoomManager.mockReturnValueOnce({
      ...baseMockState,
      rooms: { content: [], totalPages: 2 },
    });

    render(<RoomPage />);
    await userEvent.click(screen.getByText('2'));
    expect(baseMockState.setCurrentPage).toHaveBeenCalledWith(1);
  });
});