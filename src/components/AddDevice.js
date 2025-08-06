import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDeviceData } from '../redux/sensorSlice';
import { CircleX, Download, HardDrive, Home, SlidersHorizontal, SquarePen, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../assets/Sidebar';
import Header from '../assets/Header';
import { ToastContainer, toast } from 'react-toastify';
import * as XLSX from 'xlsx';


const AddDevice = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const notify = (data) => toast(data);

  const [device, setDevice] = useState({
    devicename: "",
    deviceid: "",
    region: "",
    category: "",
    comment: "",
    date: "",
    status: "",
    Organization: "",
    City: "",
    Mode: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { devices = [] } = useSelector((state) => state.sensors);
  const [show, setShow] = useState(false);
  const [Single, setSingle] = useState(true);
  const [Search, setSearch] = useState("");
  const [edit, setedit] = useState(false);

  useEffect(() => {
    dispatch(fetchDeviceData());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDevice({ ...device, [name]: value });
  };

  const delete_ele = async (id) => {
    const url = await fetch(`${apiUrl}/api/Delete_device`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deviceid: id })
    });

    const data = await url.json();
    notify(data.message);
    dispatch(fetchDeviceData());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = await fetch(edit ? `${apiUrl}/api/Update_device` : `${apiUrl}/api/DeviceRegister`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(device)
    });

    const data = await url.json();

    if (data.message === "Device Created" || data.message === "Device updated") {
      setDevice({
        devicename: "",
        deviceid: "",
        region: "",
        category: "",
        comment: "",
        date: "",
        status: "",
        Organization: "",
        City: "",
        Mode: "",
      });
      setShow(false);
      notify(data.message);
      setedit(false);
      dispatch(fetchDeviceData());
    } else if (data.error?.includes("dup key")) {
      notify("This error indicates a duplicate entry for the device name or device ID.");
    }
  };

  const Edit_ele = (data) => {
    setedit(true);
    setDevice({ ...data });
    setShow(true);
  };

  // Export to Excel
  const exportToExcel = (type = 'xlsx', fn) => {
    if (devices.length === 0) {
      alert('No data to export');
      return;
    }
    const elt = document.getElementById('datatable');
    const wb = XLSX.utils.table_to_book(elt, { sheet: 'Sheet1' });
    XLSX.writeFile(wb, fn || `deviceData_.${type}`);
  };



  return (
    <div className="flex flex-col md:flex-row h-screen bg-[var(--secondary)] text-[var(--text)]">
      <Sidebar />
      <ToastContainer />

      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-[9999] overflow-y-auto p-4">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-xl shadow-md w-full max-w-5xl h-auto max-h-[95vh] overflow-y-auto"
          >
            <div className='flex justify-between items-center px-2 mb-6 text-black'>
              <h4 className='font-bold text-xl'>Add Device</h4>
              <CircleX onClick={() => setShow(false)} className="cursor-pointer" />
            </div>

            <div className='text-center text-black'>
              <h4 className='font-bold text-xl'>Add New Device</h4>
              <p className='font-semibold mb-4 text-gray-500'>Enter details to tag a new device</p>
            </div>

            <div className='flex justify-center items-center px-4 mb-6 gap-4 flex-wrap'>
              <button
                className={`border-2 py-1 px-4 text-sm rounded transition ${!Single ? "bg-blue-600 text-white" : "bg-white text-black border-blue-600 hover:bg-blue-600 hover:text-white"}`}
                onClick={() => setSingle(true)}
              >
                Single
              </button>
              <button
                className={`border-2 py-1 px-4 text-sm rounded transition ${Single ? "bg-white text-black border-blue-600 hover:bg-blue-600 hover:text-white" : "bg-blue-600 text-white"}`}
                onClick={() => setSingle(false)}
              >
                Multiple
              </button>
            </div>

            {Single ? (
              <form
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mx-auto text-black"
                onSubmit={handleSubmit}
              >
                {[
                  { label: "Device Name", name: "devicename" },
                  { label: "Device ID", name: "deviceid" },
                  {
                    label: "Region",
                    name: "region",
                    type: "select",
                    options: ["North", "Northeast", "East", "West", "South"]
                  },
                  { label: "City", name: "City" },
                  { label: "Organization", name: "Organization" },
                  {
                    label: "Mode",
                    name: "Mode",
                    type: "select",
                    options: ["Test", "Deployed"]
                  },
                  { label: "Category", name: "category" },
                  { label: "Date", name: "date", type: "date" }
                ].map(({ label, name, type, options }) => (
                  <div className="flex flex-col" key={name}>
                    <label className="text-sm font-medium text-gray-700 text-left">{label}</label>
                    {type === "select" ? (
                      <select name={name} value={device[name]} onChange={handleChange} className="p-2 border rounded" required>
                        <option hidden value="">Select an option</option>
                        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : (
                      <input
                        type={type || "text"}
                        name={name}
                        value={device[name]}
                        onChange={handleChange}
                        className="p-2 border rounded"
                        required
                      />
                    )}
                  </div>
                ))}

                <div className="sm:col-span-2 md:col-span-3 flex flex-col">
                  <label className="text-sm font-medium text-gray-700 text-left">Comment</label>
                  <textarea
                    name="comment"
                    value={device.comment}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                  />
                </div>

                <div className="sm:col-span-2 md:col-span-3">
                  <button type="submit" className="w-full max-w-[10rem] bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    {edit ? "Update Device" : "Add Device"}
                  </button>
                </div>
              </form>
            ) : (
              <form className="flex flex-col gap-6 w-full max-w-3xl mx-auto" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 text-left">Upload Device File</label>
                  <input
                    type="file"
                    name="file"
                    onChange={handleChange}
                    className="p-2 border rounded border-dashed border-blue-400"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 text-left">Comment</label>
                  <textarea
                    name="comment"
                    value={device.comment}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <button type="submit" className="w-full max-w-[10rem] bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    Add Devices
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
        <Header icon={<HardDrive className='bg-[#FFD9A3] h-8 w-8 rounded p-1' />} Name="Devices" />

        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div className="text-sm flex items-center text-[var(--black)]">
            <Home className="mr-2" onClick={() => navigate('/')} /> / Devices
          </div>
          <button
            onClick={() => setShow(!show)}
            className="flex items-center bg-blue-500 py-1 px-4 text-white rounded hover:bg-blue-600 transition"
          >
            + Add Device
          </button>
        </div>

        <div className="bg-[var(--bg)] p-4 md:p-6 rounded-xl shadow-md overflow-auto h-[75%] mt-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2 sm:items-center">
              <div>
                <div className="font-bold text-left">Device List ({devices.length || "--"})</div>
                <div className="text-sm text-[var(--black)] text-left">Track and manage all devices in real time</div>
              </div>
              <input
                onChange={(e) => setSearch(e.target.value)}
                value={Search}
                placeholder="Search ..."
                className="text-gray-600 border border-[var(--black)] rounded-lg px-4 py-1 w-full sm:w-auto sm:ml-4"
              />
            </div>
            <div className="flex gap-4 flex-wrap">
              <button className="flex items-center gap-2 font-bold border-2 rounded-lg px-4 py-2">
                <SlidersHorizontal /> Filter
              </button>
              <button className="flex items-center gap-2 font-bold border-2 rounded-lg px-4 py-2 bg-blue-500 text-white" onClick={() => exportToExcel()}>
                Download <Download />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border" id='datatable'>
              <thead>
                <tr>
                  {["Sr. No.", "Device ID", "Date", "Device Name", "Category", "Region", "City", "Mode", "Organization", "Actions"].map(header => (
                    <th key={header} className="border px-3 py-2">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {devices.filter((ele) =>
                  Object.values(ele).some((val) =>
                    String(val).toLowerCase().includes(Search.toLowerCase())
                  )).map((ele, index) => (
                    <tr key={index}>
                      <td className="border px-3 py-2">{index + 1}</td>
                      <td className="border px-3 py-2">{ele.deviceid}</td>
                      <td className="border px-3 py-2">{ele.date || '-'}</td>
                      <td className="border px-3 py-2">{ele.devicename}</td>
                      <td className="border px-3 py-2">{ele.category}</td>
                      <td className="border px-3 py-2">{ele.region}</td>
                      <td className="border px-3 py-2">{ele.City}</td>
                      <td className="border px-3 py-2">{ele.Mode}</td>
                      <td className="border px-3 py-2">{ele.Organization}</td>
                      <td className="border px-3 py-2">
                        <div className="flex flex-wrap gap-2 justify-center">
                          <button
                            onClick={() => ele.deviceid && ele.devicename && navigate(`/dashboard/${ele.deviceid}/${ele.devicename}`)}
                            className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                          >
                            View
                          </button>
                          <Trash className="text-red-500 cursor-pointer" onClick={() => delete_ele(ele.deviceid)} />
                          <SquarePen className="text-blue-500 cursor-pointer" onClick={() => Edit_ele(ele)} />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddDevice;
