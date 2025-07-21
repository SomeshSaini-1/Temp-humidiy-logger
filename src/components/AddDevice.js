import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDevice } from '../redux/sensorSlice';
import { CircleX, Delete, Download, HardDrive, Home, SlidersHorizontal, SquarePen } from 'lucide-react';
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
    // status: "",
    Organization :"",
    City:"",
    Mode:"",
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

  const [Single,setSingle] = useState();
  const [Search,setSearch] = useState("");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      {/* Modal for Adding Device */}
      {show && (
        
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50" onClick={()=> setShow(false)}>
          <div 
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            className="bg-white p-6 rounded-xl shadow-md w-full max-w-6xl h-auto min-h-[80vh]"> 
            <div className='flex justify-between items-center px-2 mb-6'>
              <h4 className='font-bold text-xl'>Add Device</h4>
              <CircleX onClick={()=> {setShow(false)}}/>
            </div>

            <div className='text-center'>
              <h4 className='font-bold text-xl'>Add New Device </h4>
              <p className='text-gray-500 font-semibold mb-4'>Enter details to tag a new device</p>
            </div>

            <div className='flex justify-end items-center px-10 mb-6'>
              <span>
                <button className={`bg-${!Single?"blue-600 text-white":"white text-black"} border-blue-600 border-2 cursor-pointer py-1 px-4 text-sm  rounded hover:bg-blue-700 hover:text-white transition `} onClick={()=> setSingle(!Single)}>Single</button>
                <button className={`bg-${Single?"blue-600 text-white":"white text-black"} border-blue-600 border-2 cursor-pointer py-1 px-4 text-sm ml-4 rounded hover:bg-blue-700 hover:text-white transition `} onClick={()=> setSingle(!Single)}>Muiltiple</button>
              </span>
            </div>
            {!Single ?
          <form
            className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl mx-auto'
            onSubmit={handleSubmit}
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
              <label className="text-sm font-medium text-gray-700 text-left">City</label>
              <input
                name="City"
                value={device.City}
                onChange={handleChange}
                className="p-2 border rounded"
              />
               
            </div>


            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 text-left">Organization</label>
              <input
                name="Organization"
                value={device.Organization}
                onChange={handleChange}
                className="p-2 border rounded"
              />
               
            </div>


            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 text-left">Mode</label>
              <select
                name="Mode"
                value={device.Mode}
                onChange={handleChange}
                className="p-2 border rounded"
              >
                <option selected hidden defaultValue={""}>Select Mode</option>
                <option value={"Test"}>Test</option>
                <option value={"Deployed"}>Deployed</option>
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
                className="w-full max-w-[10rem] bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Add Device
              </button>
            </div>
          </form>
          :
          <form
            className='flex flex-col gap-6 w-full max-w-3xl mx-auto'
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 text-left">Upload Device File</label>
              <input
                type="file"
                name="file"
                value={device.devicename}
                onChange={handleChange}
                className="p-2 border rounded border-dashed border-blue-400 p-[4rem] pl-[15rem]"
                required
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 text-left">Comment</label>
              <input
                type="textarea"
                name="Comment"
                value={device.devicename}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              />
            </div>


            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full max-w-[10rem] bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Add Device
              </button>
            </div>

          </form>  
        }
          </div>
        </div>
      )}

      <main className="flex-1 p-6 overflow-y-auto">
        <Header icon={<HardDrive />} Name={`Devices`} />

        {/* Page Title & Add Button */}
        <div className="flex justify-between items-center mb-6 px-2 rounded-xl ">
          <div className="text-sm text-gray-500 flex items-center"><Home className='mr-2'/> / {"  "} Add Device</div>
          <button
            onClick={() => setShow(!show)}
            className="flex items-center bg-blue-500 cursor-pointer py-1 px-2 text-white rounded hover:bg-blue-600 transition"
          >
            + Add Device
          </button>
        </div>



        {/* Devices Table */}
        <div className="bg-white p-6 rounded-xl shadow-md overflow-auto h-[75%] mt-10">
          
        <div className="flex justify-between items-center mb-6 px-2 rounded-xl ">
          <span className='flex gap-2'>
            <ul>
              <li className='font-bold text-left'>Device List   ({devices.length || "--"})</li>
              <li className='text-sm text-gray-500'>Track and manage all devices in the real time</li>
            </ul>
            <input onChange={(e) => {setSearch(e.target.value)}} value={Search} placeholder='Search ...'
             className='text-gray-600 border-gray-500 border-2 rounded-lg px-4 ml-4 '/>
          </span>
          <span className='flex gap-4'>
            <button className='flex gap-4 font-bold border-2 rounded-lg px-4 py-2 '><SlidersHorizontal />Filter</button>
            <button className='flex gap-4 font-bold border-2 rounded-lg px-4 py-2 bg-blue-500 text-white'>Download <Download/></button>
          </span>
        </div>
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Sr. No.</th>
                <th className="border px-3 py-2">Device ID</th>
                <th className="border px-3 py-2">Date</th>
                <th className="border px-3 py-2">Device Name</th>
                <th className="border px-3 py-2">Category</th>
                <th className="border px-3 py-2">Region</th>
                <th className="border px-3 py-2">City</th>
                <th className="border px-3 py-2">Mode</th>
                <th className="border px-3 py-2">Organization</th>
                {/* <th className="border px-3 py-2">View Device</th> */}
                <th className="border px-3 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {devices.filter((ele) =>
  Object.values(ele).some((val) =>
    String(val).toLowerCase().includes(Search.toLowerCase())
            )).map((ele, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{index + 1}</td>
                  <td className="border px-3 py-2">{ele.id}</td>
                  <td className="border px-3 py-2">{ele.date || '-'}</td>
                  <td className="border px-3 py-2">{ele.name}</td>
                  <td className="border px-3 py-2">{ele.category}</td>
                  <td className="border px-3 py-2">{ele.region}</td>
                  <td className="border px-3 py-2">{ele.City}</td>
                  <td className="border px-3 py-2">{ele.Mode}</td>
                  <td className="border px-3 py-2">{ele.Organization}</td>
                  {/* <td className="border px-3 py-2">
                    <button onClick={() => navigate(`/dashboard/${ele.id}/${ele.name}`)} className='rounded text-white bg-blue-500 cursor-pointer py-1 px-2'>View Device</button>
                  </td> */}
                  <td className="border px-3 py-2 text-center flex justify-center gap-2">
                      <button
                          onClick={() =>
                            ele.id && ele.name && navigate(`/dashboard/${ele.id}/${ele.name}`)
                          }
                          className="rounded text-white bg-blue-500 cursor-pointer py-1 px-2 text-sm"
                          disabled={!ele.id || !ele.name}
                        >
                          View device
                        </button>

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
