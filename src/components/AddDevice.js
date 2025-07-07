import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDevice } from '../redux/sensorSlice';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../assets/Sidebar';

const AddDevice = () => {
  const [deviceName, setDeviceName] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
    const { devices, sensorData } = useSelector((state) => state.sensors);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDevice({ id: deviceId, name: deviceName }));
    // navigate('/dashboard');
  };

  console.log(devices)

  return (
    // <div className="min-h-screen bg-gray-100">
    //   <nav className="bg-blue-500 p-4">
    //     <div className="container mx-auto flex justify-between items-center">
    //       <h1 className="text-white text-2xl">Environmental Dashboard</h1>
    //       <div>
    //         <Link to="/dashboard" className="text-white mr-4 hover:underline">
    //           Dashboard
    //         </Link>
    //         <Link to="/" className="text-white mr-4 hover:underline">
    //           Home
    //         </Link>
    //       </div>
    //     </div>
    //   </nav>
    //   <div className="container mx-auto p-4">
    //     <h2 className="text-2xl font-bold mb-4">Add New Device</h2>
    //     <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
    //       <div className="mb-4">
    //         <label className="block text-gray-700">Device Name</label>
    //         <input
    //           type="text"
    //           value={deviceName}
    //           onChange={(e) => setDeviceName(e.target.value)}
    //           className="w-full p-2 border rounded"
    //           required
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label className="block text-gray-700">Device ID</label>
    //         <input
    //           type="text"
    //           value={deviceId}
    //           onChange={(e) => setDeviceId(e.target.value)}
    //           className="w-full p-2 border rounded"
    //           required
    //         />
    //       </div>
    //       <button
    //         type="submit"
    //         className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
    //       >
    //         Add Device
    //       </button>
    //     </form>
    //   </div>
    // </div>
    
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="text-xl font-semibold">Add Device</div>
            {/* <div className="text-sm text-gray-500">Time Range: 2019-01-03 11:00 - 2019-02-03 11:00</div> */}
          </div>
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        </div>

        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md  flex flex-col items-start">
          <div className="w-3xl  mb-4">
            <label className="block text-gray-700">Device Name</label>
            <input
              type="text"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              className=" p-2 border w-full rounded"
              required
            />
          </div>
          <div className="w-3xl  mb-4">
            <label className="block text-gray-700">Device ID</label>
            <input
              type="text"
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              className=" p-2 border w-full rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-xl  bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Device
          </button>
        </form>

        <div className='bg-white p-6 rounded shadow-md my-4'>
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border px-2 py-1">Sr. No.</th>
                <th className="border px-2 py-1">Device ID</th>
                <th className="border px-2 py-1">Date/Time</th>
                <th className="border px-2 py-1">Device Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((ele, index) => (
                <tr key={index}>
                  <td className="border px-2 py-1">{index + 1}</td>
                  <td className="border px-2 py-1">{ele.id}</td>
                  <td className="border px-2 py-1">{new Date(ele.timestamp).toLocaleString()}</td>
                  <td className="border px-2 py-1">{ele.name}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AddDevice;