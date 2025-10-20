import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ServicePage from '../pages/ServicePage';
import { useServiceManager } from '../hooks/useServiceManager';

// Mock the custom hook
jest.mock('../hooks/useServiceManager');

const mockUseServiceManager = useServiceManager;

describe('ServicePage', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockUseServiceManager.mockReturnValue({
      services: [],
      loading: false,
      error: null,
      showModal: false,
      isEditMode: false,
      formData: { name: '', description: '', price: 0, isActive: false },
      formError: null,
      transactionError: '',
      setFormData: jest.fn(),
      handleShowAddModal: jest.fn(),
      handleShowEditModal: jest.fn(),
      handleCloseModal: jest.fn(),
      handleSubmit: jest.fn(),
      handleDeleteService: jest.fn(),
      showDeleteModal: false,
      handleCloseDeleteModal: jest.fn(),
      handleShowDeleteModal: jest.fn(),
      deletingService: null,
    });
  });

  test('renders loading state initially', () => {
    mockUseServiceManager.mockReturnValueOnce({ ...mockUseServiceManager(), loading: true });
    render(<ServicePage />);
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  test('renders error message if an error occurs', () => {
    mockUseServiceManager.mockReturnValueOnce({ ...mockUseServiceManager(), error: 'Failed to fetch' });
    render(<ServicePage />);
    expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
  });

  test('renders service management title and add button', () => {
    render(<ServicePage />);
    expect(screen.getByText('Service Management')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Service' })).toBeInTheDocument();
  });

  test('calls handleShowAddModal when add service button is clicked', () => {
    const handleShowAddModal = jest.fn();
    mockUseServiceManager.mockReturnValueOnce({ ...mockUseServiceManager(), handleShowAddModal });
    render(<ServicePage />);
    userEvent.click(screen.getByRole('button', { name: 'Add Service' }));
    expect(handleShowAddModal).toHaveBeenCalledTimes(1);
  });

  test('displays services in the table', () => {
    const services = [
      { id: 1, name: 'Laundry', description: 'Per kilogram', price: 10000, isActive: true },
      { id: 2, name: 'Breakfast', description: 'Per person', price: 50000, isActive: false },
    ];
    mockUseServiceManager.mockReturnValueOnce({ ...mockUseServiceManager(), services });
    render(<ServicePage />);
    expect(screen.getByText('Laundry')).toBeInTheDocument();
    expect(screen.getByText('Per kilogram')).toBeInTheDocument();
    expect(screen.getByText('Rp 10.000')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('Breakfast')).toBeInTheDocument();
    expect(screen.getByText('Per person')).toBeInTheDocument();
    expect(screen.getByText('Rp 50.000')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
  });

  test('calls handleShowEditModal when edit button is clicked', () => {
    const handleShowEditModal = jest.fn();
    const services = [{ id: 1, name: 'Laundry', description: 'Per kilogram', price: 10000, isActive: true }];
    mockUseServiceManager.mockReturnValueOnce({ ...mockUseServiceManager(), services, handleShowEditModal });
    render(<ServicePage />);
    userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    expect(handleShowEditModal).toHaveBeenCalledWith(services[0]);
  });

  test('calls handleShowDeleteModal when delete button is clicked', () => {
    const handleShowDeleteModal = jest.fn();
    const services = [{ id: 1, name: 'Laundry', description: 'Per kilogram', price: 10000, isActive: true }];
    mockUseServiceManager.mockReturnValueOnce({ ...mockUseServiceManager(), services, handleShowDeleteModal });
    render(<ServicePage />);
    userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(handleShowDeleteModal).toHaveBeenCalledWith(1);
  });
});
