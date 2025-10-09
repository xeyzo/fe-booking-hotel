import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomPage';
import BookingsPage from './pages/BookingPage';
import ServicePage from './pages/ServicePage';
import NavigationBarComponent from './components/NavigationBarComponent';

function App() {
  return (
    <div>
      <NavigationBarComponent  />
       <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path='/services' element={<ServicePage />} />
        </Routes>

    </div>
  );
}

export default App;