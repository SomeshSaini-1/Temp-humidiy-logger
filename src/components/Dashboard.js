import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSensorData } from '../redux/sensorSlice';
import Sidebar from '../assets/Sidebar';
import Header from '../assets/Header';
import { addSensorData } from '../redux/sensorSlice';
import * as XLSX from "xlsx";


import { Line } from 'react-chartjs-2';
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
import { useContext } from 'react';
import { MqttContext } from '../assets/Mqtt';
import { useParams } from 'react-router-dom';

import Chart from '../assets/Chart';

export default function Dashboard() {
  const dispatch = useDispatch();
  const parmas = useParams()
  console.log(parmas.id, parmas.name)
  const [Sensor, setSensor] = useState([]);
  const { setTopic, data } = useContext(MqttContext);

  useEffect(() => {
    setTopic(`am_sensor/${parmas.id}/RX`); // Subscribe to a topic when component mounts
  }, [setTopic]);

  const { sensorData } = useSelector((state) => state.sensors);

  useEffect(() => {
    dispatch(fetchSensorData());
  }, [dispatch]);

  console.log(sensorData, data)

  const chartData = {
    labels: Sensor.map((data) => new Date(data.date).toLocaleTimeString()),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: Sensor.map((data) => data.Temp),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Humidity (%RH)',
        data: Sensor.map((data) => data.hume),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },

    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Environmental All Data ' },
    },
  };

  // let data_sen = data && JSON.parse(data?.payload)

  let data_sen = null;
  try {
    if (data?.payload) {
      data_sen = JSON.parse(data.payload);
    }
  } catch (err) {
    console.error("❌ Failed to parse MQTT payload:", data.payload);
    console.error(err);
  }


  console.log(data_sen, "data_sen")

  const [count, setcount] = useState(1)

  const get_data = async () => {
    const api = await fetch("http://otplai.com:4004/api/get_data", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: parmas.id,
        page: count
      })
    })

    const data = await api.json();
    console.log(data)
    setSensor(data);

  }

  useEffect(() => {
    get_data();
  }, [count])

  useEffect(() => {

    count == 1 && get_data();

    data && dispatch(addSensorData({
      timestamp: new Date().toISOString(),
      temperature: data_sen?.temperature,
      humidity: data_sen?.humidity,
      // dust: data_sen?.pm
    }))
  }, [data])

  function ExportToExcel(type, fn, dl) {
    console.log('hiii', Sensor);
    if (Sensor.length === 0) { alert("No data"); return; };
    var elt = document.getElementById('datatable');
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
    return dl ?
      XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
      XLSX.writeFile(wb, fn || ('MySheetName.' + (type || 'pdf')));
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">

        <Header Name={parmas.name + "-" + parmas.id} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Device Information Card */}
          <div className="col-span-1 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Device Information</h3>

            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">devicename:</span>
                <span className="font-medium">{parmas.name}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">deviceid:</span>
                <span className="font-medium">{parmas.id}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">region:</span>
                <span className="font-medium">NORTH</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">category:</span>
                <span className="font-medium">Wifi</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">comment:</span>
                <span className="font-medium">LORA Protocol</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">date:</span>
                <span className="font-medium">15-07-2025</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">status:</span>
                <span className="font-medium text-green-500">Deployed</span>
              </div>
            </div>
          </div>

          {/* Additional Metrics Cards */}
          <div className="col-span-1 space-y-4">
            <div className="col-span-1 space-y-4">
              {/* Humidity Card */}
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Humidity</h4>
                    <p className="text-2xl font-semibold text-gray-800">
                      {data_sen?.humidity || "--"} <span className="text-lg text-gray-500">%RH</span>
                    </p>
                  </div>
                </div>
                <div className="h-32">
                  <Chart
                    sensorData={sensorData.map((data) => data.humidity)}
                    labelname={"Humidity"}
                    chartColor="#3B82F6" // Blue color for humidity
                  />
                </div>
              </div>

              {/* Temperature Card */}
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Temperature</h4>
                    <p className="text-2xl font-semibold text-gray-800">
                      {data_sen?.temperature || "--"} <span className="text-lg text-gray-500">°C</span>
                    </p>
                  </div>

                </div>
                <div className="h-32">
                  <Chart
                    sensorData={sensorData.map((data) => data.temperature)}
                    labelname={"Temperature"}
                    chartColor="#EF4444" // Red color for temperature
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded shadow-md my-4 ">
          <Line data={chartData} options={options} />
        </div>

        <div className='bg-white p-6 rounded shadow-md my-4'>
          <div className='mb-4 flex justify-end'>
            <button onClick={() => ExportToExcel('xlsx')} className='rounded text-white bg-green-500 cursor-pointer p-2'>
              Export
            </button>
          </div>
          <table className="min-w-full border" id='datatable'>
            <thead>
              <tr>
                <th className="border px-2 py-1">Sr. No.</th>
                <th className="border px-2 py-1">Device ID</th>
                <th className="border px-2 py-1">Date/Time</th>
                {/* <th className="border px-2 py-1">Dust Particles</th> */}
                <th className="border px-2 py-1">Humidity</th>
                <th className="border px-2 py-1">Temperature</th>
              </tr>
            </thead>
            <tbody>
              {Sensor.map((ele, index) => (
                <tr key={index}>
                  <td className="border px-2 py-1">{index + 1}</td>
                  <td className="border px-2 py-1">{parmas.id}</td>
                  {/* <td className="border px-2 py-1">{ ele.date.split('T')[0] +"/"+new Date(ele.date).toLocaleTimeString()}</td> */}
                  <td className="border px-2 py-1">
                    {
                      ele.date.includes('T') && ele.date.endsWith('Z')
                        ? ele.date.split('T')[0] + " / " + new Date(ele.date).toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })
                        : ele.date
                    }
                  </td>

                  {/* <td className="border px-2 py-1">{ele.dust}</td> */}
                  <td className="border px-2 py-1">{ele.hume}</td>
                  <td className="border px-2 py-1">{ele.Temp}</td>
                </tr>
              ))}
            </tbody>

          </table>
          <div className='mt-2'>
            <button onClick={() => { setcount(count - 1) }} className='bg-green-400 text-white px-2  rounded hover:bg-green-500 mr-4'>prev</button>
            <button onClick={() => { setcount(count + 1) }} className='bg-green-400 text-white px-2  rounded hover:bg-green-500'>next</button>
          </div>
        </div>
      </main>
    </div>
  );
}

