

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSensorData } from '../redux/sensorSlice';
import { Line } from 'react-chartjs-2';
import Sidebar from '../assets/Sidebar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


export default function Dashboard() {
  const dispatch = useDispatch();
  const { devices, sensorData } = useSelector((state) => state.sensors);

  useEffect(() => {
    dispatch(fetchSensorData());
  }, [dispatch]);

  console.log(sensorData)

  const chartData = {
    labels: sensorData.map((data) => new Date(data.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: sensorData.map((data) => data.temperature),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Humidity (%)',
        data: sensorData.map((data) => data.humidity),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Dust Particles (µg/m³)',
        data: sensorData.map((data) => data.dust),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Environmental Data Trends' },
    },
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="text-xl font-semibold">Rue Simart - ASF65R4</div>
            {/* <div className="text-sm text-gray-500">Time Range: 2019-01-03 11:00 - 2019-02-03 11:00</div> */}
          </div>
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        </div>

        {/* Filter */}
        <div className="flex items-center space-x-4 mb-4">
          <label className="text-sm font-medium">Parameter:</label>
          <select className="border rounded px-2 py-1 text-sm">
            <option>Dust Particles Concentration</option>
            <option>HumidityConcentration</option>
            <option>Temperature Concentration</option>
          </select>

        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Metric Cards */}
          <div className="col-span-1 bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500 mb-1">Dust Particles</div>
            <div className="w-full h-32 bg-gray-200 rounded text-2xl font-semibold flex items-center justify-center">23.5 µg/m³</div>
          </div>
          <div className="col-span-1 bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500 mb-1">Humidity</div>
            <div className="w-full h-32 bg-gray-200 rounded text-2xl font-semibold flex items-center justify-center">3.5 </div>
          </div>
          <div className="col-span-1 bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500 mb-2">Temperature </div>
            <div className="w-full h-32 bg-gray-200 rounded text-2xl font-semibold flex items-center justify-center">29 </div>
          </div>

        </div>


        <div className="bg-white p-6 rounded shadow-md my-4 ">
          <Line data={chartData} options={options} />
        </div>

        <div className='bg-white p-6 rounded shadow-md my-4'>
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border px-2 py-1">Sr. No.</th>
                <th className="border px-2 py-1">Device ID</th>
                <th className="border px-2 py-1">Date/Time</th>
                <th className="border px-2 py-1">Dust Particles</th>
                <th className="border px-2 py-1">Humidity</th>
                <th className="border px-2 py-1">Temperature</th>
              </tr>
            </thead>
            <tbody>
              {sensorData.map((ele, index) => (
                <tr key={index}>
                  <td className="border px-2 py-1">{index + 1}</td>
                  <td className="border px-2 py-1">6465kjh66</td>
                  <td className="border px-2 py-1">{new Date(ele.timestamp).toLocaleString()}</td>
                  <td className="border px-2 py-1">{ele.dust}</td>
                  <td className="border px-2 py-1">{ele.humidity}</td>
                  <td className="border px-2 py-1">{ele.temperature}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
