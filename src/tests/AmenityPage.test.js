import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AmenityPage from '../pages/AmenityPage';
import { useAmenityManager } from '../hooks/useAmenityManager';

jest.mock('../hooks/useAmenityManager');

const mockUseAmenityManager = useAmenityManager;

describe('AmenityPage', () => {
  beforeEach(() => {
    mockUseAmenityManager.mockReturnValue({
      amenities: [],
      loading: false,
      error: null,
      showModal: false,
      isEditMode: false,
      formData: { name: '', description: '', isActive: false },
      formError: null,
      transactionError: '',
      setFormData: jest.fn(),
      handleShowAddModal: jest.fn(),
      handleShowEditModal: jest.fn(),
      handleCloseModal: jest.fn(),
      handleSubmit: jest.fn(),
      handleDeleteAmenity: jest.fn(),
      showDeleteModal: false,
      handleCloseDeleteModal: jest.fn(),
      handleShowDeleteModal: jest.fn(),
      deletingAmenity: null,
    });
  });

  test('renders loading state initially', () => {
    mockUseAmenityManager.mockReturnValueOnce({ ...mockUseAmenityManager(), loading: true });
    render(<AmenityPage />);
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  test('renders error message if an error occurs', () => {
    mockUseAmenityManager.mockReturnValueOnce({ ...mockUseAmenityManager(), error: 'Failed to fetch' });
    render(<AmenityPage />);
    expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
  });

  test('renders amenity management title and add button', () => {
    render(<AmenityPage />);
    expect(screen.getByText('Amenity Management')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Amenity' })).toBeInTheDocument();
  });

  test('calls handleShowAddModal when add amenity button is clicked', () => {
    const handleShowAddModal = jest.fn();
    mockUseAmenityManager.mockReturnValueOnce({ ...mockUseAmenityManager(), handleShowAddModal });
    render(<AmenityPage />);
    userEvent.click(screen.getByRole('button', { name: 'Add Amenity' }));
    expect(handleShowAddModal).toHaveBeenCalledTimes(1);
  });

  test('displays amenities in the table', () => {
    const amenities = [
      { id: 1, name: 'WiFi', description: 'High-speed internet', isActive: true },
      { id: 2, name: 'Pool', description: 'Swimming pool', isActive: false },
    ];
    mockUseAmenityManager.mockReturnValueOnce({ ...mockUseAmenityManager(), amenities });
    render(<AmenityPage />);
    expect(screen.getByText('WiFi')).toBeInTheDocument();
    expect(screen.getByText('High-speed internet')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('Pool')).toBeInTheDocument();
    expect(screen.getByText('Swimming pool')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
  });

  test('calls handleShowEditModal when edit button is clicked', () => {
    const handleShowEditModal = jest.fn();
    const amenities = [{ id: 1, name: 'WiFi', description: 'High-speed internet', isActive: true }];
    mockUseAmenityManager.mockReturnValueOnce({ ...mockUseAmenityManager(), amenities, handleShowEditModal });
    render(<AmenityPage />);
    userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    expect(handleShowEditModal).toHaveBeenCalledWith(amenities[0]);
  });

  test('calls handleShowDeleteModal when delete button is clicked', () => {
    const handleShowDeleteModal = jest.fn();
    const amenities = [{ id: 1, name: 'WiFi', description: 'High-speed internet', isActive: true }];
    mockUseAmenityManager.mockReturnValueOnce({ ...mockUseAmenityManager(), amenities, handleShowDeleteModal });
    render(<AmenityPage />);
    userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(handleShowDeleteModal).toHaveBeenCalledWith(1);
  });
});
