import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDevice } from '../redux/sensorSlice';
import { Delete, SquarePen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../assets/Sidebar';
import Header from '../assets/Header';

const AddDevice = () => {

  const [device, setDevice] = useState({
    devicename: "",
    deviceid: "",
    region: "",
    category: "",
    comment: "",
    date: "",
    status: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { devices = [] } = useSelector((state) => state.sensors);
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDevice({ ...device, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(addDevice({ id: device.deviceid, name: device.devicename, date: device.date }));
    dispatch(addDevice(device));
    setDevice({
      devicename: "",
      deviceid: "",
      region: "",
      category: "",
      comment: "",
      date: "",
      status: "",
    });
    setShow(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      {/* Modal for Adding Device */}
      {show && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50" onClick={()=> setShow(false)}>
          <form
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl"
          >
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 text-left">Device Name</label>
              <input
                type="text"
                name="devicename"
                value={device.devicename}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 text-left">Device ID</label>
              <input
                type="text"
                name="deviceid"
                value={device.deviceid}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 text-left">Region</label>
              <select
                type="text"
                name="region"
                value={device.region}
                onChange={handleChange}
                className="p-2 border rounded"
              >
                {
                  ["North", "Northeast", "East", "West", "South"].map(ele => (
                    <option value={ele}>{ele}</option>
                  ) )
                }
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 text-left">Category</label>
              <input
                name="category"
                value={device.category}
                onChange={handleChange}
                className="p-2 border rounded"
              />
               
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 text-left">Status</label>
              <select
                name="status"
                value={device.status}
                onChange={handleChange}
                className="p-2 border rounded"
              >
                <option value="">Select</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 text-left">Date</label>
              <input
                type="date"
                name="date"
                value={device.date}
                onChange={handleChange}
                className="p-2 border rounded"
              />
            </div>

            <div className="md:col-span-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700 text-left">Comment</label>
              <textarea
                name="comment"
                value={device.comment}
                onChange={handleChange}
                className="p-2 border rounded"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Add Device
              </button>
            </div>
          </form>
        </div>
      )}

      <main className="flex-1 p-6 overflow-y-auto">
        <Header Name="Device" />

        {/* Page Title & Add Button */}
        <div className="flex justify-between items-center mb-6 border py-4 px-2 rounded-xl bg-white">
          <div className="text-sm text-gray-500">Home / Add Device</div>
          <button
            onClick={() => setShow(!show)}
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            + Add Device
          </button>
        </div>

        {/* Devices Table */}
        <div className="bg-white p-6 rounded-xl shadow-md overflow-auto h-[75%]">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Sr. No.</th>
                <th className="border px-3 py-2">Device ID</th>
                <th className="border px-3 py-2">Date</th>
                <th className="border px-3 py-2">Device Name</th>
                <th className="border px-3 py-2">Category</th>
                <th className="border px-3 py-2">Region</th>
                <th className="border px-3 py-2">View Device</th>
                <th className="border px-3 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((ele, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{index + 1}</td>
                  <td className="border px-3 py-2">{ele.id}</td>
                  <td className="border px-3 py-2">{ele.date || '-'}</td>
                  <td className="border px-3 py-2">{ele.name}</td>
                  <td className="border px-3 py-2">{ele.category}</td>
                  <td className="border px-3 py-2">{ele.region}</td>
                  <td className="border px-3 py-2">
                    <button onClick={() => navigate(`/dashboard/${ele.id}/${ele.name}`)} className='rounded text-white bg-green-500 cursor-pointer p-2'>View Device</button>
                  </td>
                  <td className="border px-3 py-2 text-center flex justify-center gap-2">
                    <Delete className="text-red-500 cursor-pointer" />
                    <SquarePen className="text-blue-500 cursor-pointer" />
                  </td>
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
