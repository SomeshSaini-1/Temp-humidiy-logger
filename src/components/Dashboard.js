import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSensorData, addSensorData } from '../redux/sensorSlice';
import { MqttContext } from '../assets/Mqtt';
import * as XLSX from 'xlsx';
import Sidebar from '../assets/Sidebar';
import Header from '../assets/Header';
import Mainchart from '../assets/Mainchart';
import Map from '../assets/Map';
import Chart from '../assets/Chart';

export default function Dashboard() {
  const dispatch = useDispatch();
  const params = useParams();
  const { sensorData } = useSelector((state) => state.sensors);
  const [Sensor, setSensor] = useState([]);
  const [count, setCount] = useState(1);
  const { subscribeToTopic, data } = useContext(MqttContext);

  // MQTT Subscription
  useEffect(() => {
    subscribeToTopic(`am_sensor/${params.id}/RX`);
    subscribeToTopic(`am_sensor/${params.id}/status`);
  }, [params.id, subscribeToTopic]);

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

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Header Name={`${params.name}-${params.id}`} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Device Information */}
          <div className="col-span-1 bg-white p-6 rounded-lg shadow-md border-l-4 border-black">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Device Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Devicename:</span>
                <span className="font-medium">{params.name}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Deviceid:</span>
                <span className="font-medium">{params.id}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Region:</span>
                <span className="font-medium">NORTH</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Category:</span>
                <span className="font-medium">Wifi</span>
              </div>
              <div className="flex justify-between border- pb-2">
                <span className="text-gray-500">Date:</span>
                <span className="font-medium">15-07-2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Mode:</span>
                <span className="font-medium capitalize">
                  Test
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">City:</span>
                <span className="font-medium"> Jaiput</span>
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
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => exportToExcel('xlsx')}
              className="rounded text-white bg-green-500 cursor-pointer p-2"
            >
              Export
            </button>
          </div>
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
          <div className="mt-2">
            <button
              onClick={() => setCount((prev) => Math.max(prev - 1, 1))}
              className="bg-green-400 text-white px-2 rounded hover:bg-green-500 mr-4"
              disabled={count === 1}
            >
              Prev
            </button>
            <button
              onClick={() => setCount((prev) => prev + 1)}
              className="bg-green-400 text-white px-2 rounded hover:bg-green-500"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}