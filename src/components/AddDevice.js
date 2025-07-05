import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDevice } from '../redux/sensorSlice';
import { useNavigate, Link } from 'react-router-dom';

const AddDevice = () => {
  const [deviceName, setDeviceName] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDevice({ id: deviceId, name: deviceName }));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl">Environmental Dashboard</h1>
          <div>
            <Link to="/dashboard" className="text-white mr-4 hover:underline">
              Dashboard
            </Link>
            <Link to="/" className="text-white mr-4 hover:underline">
              Home
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Add New Device</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700">Device Name</label>
            <input
              type="text"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Device ID</label>
            <input
              type="text"
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Device
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDevice;