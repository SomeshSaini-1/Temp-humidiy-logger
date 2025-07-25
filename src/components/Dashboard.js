import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSensorData, addSensorData ,fetchDeviceData} from '../redux/sensorSlice';
import { MqttContext } from '../assets/Mqtt';
import * as XLSX from 'xlsx';
import Sidebar from '../assets/Sidebar';
import Header from '../assets/Header';
import Mainchart from '../assets/Mainchart';
import Map from '../assets/Map';
import Chart from '../assets/Chart';
import { CircleX, Download, HardDrive, Home, MoveLeft, MoveRight, SlidersHorizontal } from 'lucide-react';



export default function Dashboard() {
  const dispatch = useDispatch();
  const params = useParams();
  const { sensorData, devices = [] } = useSelector((state) => state.sensors);
  const [Sensor, setSensor] = useState([]);
  const [count, setCount] = useState(1);
  const { subscribeToTopic, data, publisher } = useContext(MqttContext);

  // MQTT Subscription
  useEffect(() => {
    subscribeToTopic(`am_sensor/${params.id}/RX`);
    subscribeToTopic(`am_sensor/${params.id}/status`);
  }, [params.id, subscribeToTopic]);


  const send_data = (data) => {
    publisher(`am_sensor/${params.id}/TX`, data)
  }

  // Fetch historical data
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('http://otplai.com:4004/api/get_data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: params.id, page: count }),
        });
        const data = await response.json();
        setSensor(data);
      } catch (err) {
        console.error('❌ Failed to fetch data:', err);
      }
    };
    getData();
  }, [count, params.id]);

  // Fetch initial sensor data
  useEffect(() => {
    dispatch(fetchSensorData());
    dispatch(fetchDeviceData())
  }, [dispatch]);

  // Parse MQTT data
  const rxTopic = Object.keys(data).find((key) => key.endsWith('/RX'));
  const statusTopic = Object.keys(data).find((key) => key.endsWith('/status'));
  console.log(data[statusTopic])
  let data_sen = null;
  try {
    if (rxTopic && data[rxTopic]?.payload) {
      data_sen = JSON.parse(data[rxTopic].payload);
    }
  } catch (err) {
    console.error('❌ Failed to parse MQTT payload:', data[rxTopic]?.payload, err);
  }

  // Update Redux with MQTT data
  useEffect(() => {
    if (data_sen) {
      dispatch(
        addSensorData({
          timestamp: data_sen.time,
          temperature: data_sen.temperature,
          humidity: data_sen.humidity,
        })
      );
    }
  }, [data_sen, dispatch]);

  // Export to Excel
  const exportToExcel = (type = 'xlsx', fn) => {
    if (Sensor.length === 0) {
      alert('No data to export');
      return;
    }
    const elt = document.getElementById('datatable');
    const wb = XLSX.utils.table_to_book(elt, { sheet: 'Sheet1' });
    XLSX.writeFile(wb, fn || `SensorData_${params.id}.${type}`);
  };



  const [deviceinfo, setdeviceinfo] = useState([]);

  useEffect(() => {
    setdeviceinfo(devices.filter(ele => ele.deviceid === params.id));
  }, [])

  console.log(deviceinfo);

  const [showfrom, setshowfrom] = useState();
  const [from_to_data, setfrom_to_data] = useState({
    From: "", To: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setfrom_to_data((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    console.log(from_to_data);
    exportToExcel('xlsx');
  }
  const from_to = () => {
    return (
      <div className='absolute w-full h-full inset-0' onClick={() => setshowfrom(false)}>

        <from onClick={(e) => e.stopPropagation()}
          className="absolute p-6 w-[15rem] bg-[#fff] text-[#000] rounded-lg shadow-xl space-y-4 z-[50]"
          style={{ bottom: "6rem", right: "1rem" }}
        >
          {/* From Date Input */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-left">From</label>
            <input
              type="date"
              name="From"
              value={from_to_data.From}
              onChange={handleChange}
              className="p-2 border rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* To Date Input */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-left">To</label>
            <input
              type="date"
              name="To"
              value={from_to_data.To}
              onChange={handleChange}
              className="p-2 border rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Download Button */}
          <div className="pt-2">
            <button
              type='submit'
              onSubmit={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Excel
            </button>
          </div>
        </from>

      </div>
    );
  };

  const [show, setShow] = useState();
  const [Wifi, setWifi] = useState({
    pass: "", login: ""
  });
  const [alert, setalert] = useState({
    humidity: "", temp: ""
  })


  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setWifi((prev) => ({
      ...prev,
      [name]: value
    }))
  }


  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setalert((prev) => ({
      ...prev,
      [name]: value
    }))
  }


  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto">
        {/* <Header Name={`${params.name}-${params.id}`} /> */}
        <Header icon={<HardDrive className='bg-[#FFD9A3] h-8 w-8 rounded p-1' />} Name={`Device Analyitcs`} />

      {show && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
    onClick={() => setShow(false)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white p-8 rounded-xl shadow-lg w-full max-w-6xl min-h-[80vh] overflow-y-auto"
    >
      {/* Modal Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h4 className="font-bold text-2xl text-gray-800">Set Configuration</h4>
        <CircleX className="cursor-pointer" onClick={() => setShow(false)} />
      </div>

      {/* Modal Title */}
      <div className="mb-8 text-center">
        <h4 className="text-xl font-semibold text-gray-800">Configure Your Settings</h4>
      </div>

      {/* Sections */}
      <div className="space-y-10 max-w-6xl mx-auto">
        {/* WiFi Settings */}
        <section className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
          <h5 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2 text-left">WiFi Settings</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1 text-left">WiFi Name</label>
              <input
                type="text"
                placeholder="Enter WiFi Name"
                value={Wifi.login}
                onChange={handleChange1}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1 text-left">WiFi Password</label>
              <input
                type="text"
                placeholder="Enter WiFi Password"
                value={Wifi.pass}
                onChange={handleChange1}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => send_data(Wifi)}
                className="w-full md:w-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
              >
                Save WiFi Settings
              </button>
            </div>
          </div>
        </section>

        {/* Alert Settings */}
        <section className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
          <h5 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2 text-left">Alert Settings</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Humidity Alert */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-2 text-left">Humidity Alert (%)</label>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="e.g., 70"
                  value={alert.humidity}
                  onChange={handleChange2}
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => send_data({ Hume_th: alert.humidity })}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Set
                </button>
              </div>
            </div>
            {/* Temperature Alert */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-2 text-left">Temperature Alert (°C)</label>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  min="0"
                  max="50"
                  placeholder="e.g., 30"
                  value={alert.temp}
                  onChange={handleChange2}
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => send_data({ Temp_th: alert.temp })}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Set
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
)}
      
        {/* Page Title & Add Button */}
        <div className="flex justify-between items-center mb-6 px-2 rounded-xl ">
          <div className="text-sm text-gray-500 flex items-center"><Home className='mr-2' onClick={() => navigate('/')} /> / {"  "}  Devices</div>
          <button
            onClick={() => setShow(!show)}
            className="flex items-center bg-blue-500 cursor-pointer py-1 px-2 text-white rounded hover:bg-blue-600 transition"
          >
            + Add Configurotion
          </button>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Device Information */}
          <div className="col-span-1 bg-white rounded-lg shadow border border-gray-300">
            {/* Header */}
            <div className="bg-blue-700 text-white px-4 py-2 rounded-t-lg">
              <h3 className="text-lg font-semibold">Device Information</h3>
            </div>
            {/* Status Badge */}
            <div className="flex justify-end mt-4 px-4">
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${data[statusTopic] === "Disconnected" ? "bg-red-500 text-white" : "bg-green-500 text-white"
                  }`}
              >
                {data[statusTopic]}
              </span>
            </div>
            {/* Content */}
            <div className="p-4 space-y-3 text-sm">
              <div className="flex justify-between items-center  pb-2">
                <span className="text-gray-500">Device ID:</span>
                <div className="text-blue-600 text-left w-1/2 cursor-pointer">{params.id}</div>

              </div>

              <div className="space-y-3 mt-2">
                <div className="flex justify-between  pb-1">
                  <span className="text-gray-500">Devicename:</span>
                  <span className="font-medium text-gray-700 text-left w-1/2">{params.name}</span>
                </div>
                <div className="flex justify-between  pb-1">
                  <span className="text-gray-500">Deviceid:</span>
                  <span className="font-medium text-gray-700 text-left w-1/2">{params.id}</span>
                </div>
                <div className="flex justify-between  pb-1">
                  <span className="text-gray-500">Category:</span>
                  <span className="font-medium text-gray-700 text-left w-1/2">{deviceinfo[0]?.category || "--"}</span>
                </div>
                <div className="flex justify-between  pb-1">
                  <span className="text-gray-500">Date:</span>
                  <span className="font-medium text-gray-700 text-left w-1/2">{deviceinfo[0]?.date || "--"}</span>
                </div>
                <div className="flex justify-between  pb-1">
                  <span className="text-gray-500">Mode:</span>
                  <span className="font-medium capitalize text-gray-700 text-left w-1/2">
                    {deviceinfo[0]?.Mode || "Test"}
                  </span>
                </div>
                <div className="flex justify-between  pb-1">
                  <span className="text-gray-500">Region:</span>
                  <span className="font-medium text-gray-700 text-left w-1/2">{deviceinfo[0]?.region || "--"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">City:</span>
                  <span className="font-medium text-gray-700 text-left w-1/2">{deviceinfo[0]?.City || "Jaipur"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Organization:</span>
                  <span className="font-medium text-gray-700 text-left w-1/2">{deviceinfo[0]?.Organization || "Oxymora"}</span>
                </div>

              </div>
            </div>
          </div>


          {/* Metrics Cards */}
          <div className="col-span-1 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Humidity</h4>
                  <p className="text-2xl font-semibold text-gray-800">
                    {data_sen?.humidity || '--'} <span className="text-lg text-gray-500">%RH</span>
                  </p>
                </div>
              </div>
              <div className="h-32">
                <Chart
                  sensorData={sensorData.map((data) => data.humidity)}
                  timestamp={sensorData.map((data) => data.timestamp)}
                  labelname="Humidity"
                  chartColor="#3B82F6"
                />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Temperature</h4>
                  <p className="text-2xl font-semibold text-gray-800">
                    {data_sen?.temperature || '--'} <span className="text-lg text-gray-500">°C</span>
                  </p>
                </div>
              </div>
              <div className="h-32">
                <Chart
                  sensorData={sensorData.map((data) => data.temperature)}
                  timestamp={sensorData.map((data) => data.timestamp)}
                  labelname="Temperature"
                  chartColor="#EF4444"
                />
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="col-span-1">
            <Map height={455} />
          </div>
        </div>

        {/* Main Chart */}
        <div className="bg-white p-6 rounded shadow-md my-4">
          <Mainchart sensorData={Sensor} />
        </div>


        {/* Data Table */}
        <div className="bg-white p-6 rounded shadow-md my-4">

          <span className='flex justify-between gap-4 mb-4'>

            {showfrom && from_to()}

            <button className='flex gap-4 font-bold border-2 rounded-lg px-4 py-2 '><SlidersHorizontal />Filter</button>
            <button className='flex gap-4 font-bold border-2 rounded-lg px-4 py-2 bg-blue-500 text-white'
              // onClick={() => exportToExcel('xlsx')}
              onClick={() => setshowfrom(!showfrom)}
            >Download <Download /></button>
          </span>

          <table className="min-w-full border" id="datatable">
            <thead>
              <tr>
                <th className="border px-2 py-1">Sr. No.</th>
                <th className="border px-2 py-1">Device ID</th>
                <th className="border px-2 py-1">Date/Time</th>
                <th className="border px-2 py-1">Humidity</th>
                <th className="border px-2 py-1">Temperature</th>
              </tr>
            </thead>
            <tbody>
              {Sensor.map((ele, index) => (
                <tr key={index}>
                  <td className="border px-2 py-1">{index + 1}</td>
                  <td className="border px-2 py-1">{params.id}</td>
                  <td className="border px-2 py-1">
                    {ele.date.includes('T') && ele.date.endsWith('Z')
                      ? `${ele.date.split('T')[0]} / ${new Date(ele.date).toLocaleTimeString(
                        'en-IN',
                        { timeZone: 'Asia/Kolkata' }
                      )}`
                      : ele.date}
                  </td>
                  <td className="border px-2 py-1">{ele.humidity || ele.hume}</td>
                  <td className="border px-2 py-1">{ele.temperature || ele.Temp}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-2 flex items-center justify-center">
            <button
              onClick={() => setCount((prev) => Math.max(prev - 1, 1))}
              className="bg-blue-600 text-white px-3 text-sm rounded-lg hover:bg-blue-500 mr-4 flex items-center gap-2"
              disabled={count === 1}
            >
              <MoveLeft className='my-2' />Previons
            </button>
            <button
              onClick={() => setCount((prev) => prev + 1)}
              className="bg-blue-600 text-white px-3 text-sm rounded-lg hover:bg-blue-500 flex items-center gap-2"
            >
              Next <MoveRight className='my-2' />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}