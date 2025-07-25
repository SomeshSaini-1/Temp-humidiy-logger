import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { MqttContext } from '../assets/Mqtt';
import { FaSitemap, FaChartLine } from 'react-icons/fa';
import Sidebar from '../assets/Sidebar';
import Header from '../assets/Header';
import Map from '../assets/Map';
import { fetchDeviceData } from '../redux/sensorSlice'; // Adjust path to your sensorSlice file

const Home = () => {
  
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.sensors.devices); // Access devices from Redux store

  useEffect(() => {
    dispatch(fetchDeviceData()); // Dispatch the thunk to fetch device data
  }, [dispatch]);

  const { subscribeToTopic, data } = useContext(MqttContext);
  // const { devices = [] } = useSelector((state) => state.sensors);
  const navigate = useNavigate();

  // MQTT Subscription
  useEffect(() => {
    const subscriptions = devices.map((ele) =>
      subscribeToTopic(`am_sensor/${ele.deviceid}/status`)
    );
    return () => {
      // Unsubscribe logic if supported by MqttContext
    };
  }, [devices, subscribeToTopic]);

  // Get device status
  const getStatus = (deviceId) => {
    const topic = `am_sensor/${deviceId}/status`;
    try {
      return data[topic] ? data[topic] : '--';
    } catch (err) {
      console.error(`Failed to parse status for ${deviceId}:`, err);
      return '--';
    }
  };

  // Calculate device counts
  const inactiveDevices = devices.filter((ele) => getStatus(ele.deviceid) === 'Disconnected').length;
  const activeDevices = devices.length - inactiveDevices;

  return (
    <div className="flex h-screen bg-[var(--secondary)] text-[var(--text)]">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Header Name="Welcome" />
        <div className="bg-[var(--bg)] rounded-xl shadow p-6 w-full mb-4">
          <div className="flex items-center space-x-3 mb-6">
            <FaSitemap className="text-blue-500 text-2xl" />
            <h2 className="text-2xl font-bold">Dashboard</h2>
          </div>
          <div className="flex flex-wrap gap-8 items-start">
            <div className="flex flex-col gap-6 items-center">
              <div className="text-left min-w-[160px]">
                <h3 className="text-lg font-semibold text-[var(--white)]">Total Devices</h3>
                <p className="text-4xl font-extrabold text-[var(--white)] mt-2">{devices.length || '0'}</p>
              </div>
              <div className="flex-1 min-w-[220px] bg-green-50 border border-green-200 rounded-xl p-4 relative">
                <h4 className="text-gray-700 text-sm mb-1 font-semibold">Connected Devices</h4>
                <div className="text-green-600 text-sm font-semibold flex items-center">
                  <FaChartLine className="mr-1" />{' '}
                  {devices.length ? Math.round((activeDevices / devices.length) * 100) : 0}%
                </div>
                <div className="mt-4 w-full h-12 bg-green-200 rounded-xl opacity-60 flex items-center justify-center text-xl font-bold text-green-900">
                  {activeDevices}
                </div>
              </div>
              <div className="flex-1 min-w-[220px] bg-red-50 border border-red-200 rounded-xl p-4 relative">
                <h4 className="text-gray-700 text-sm mb-1 font-semibold">Disconnected Devices</h4>
                <div className="text-red-600 text-sm font-semibold flex items-center">
                  <FaChartLine className="mr-1" />{' '}
                  {devices.length ? Math.round((inactiveDevices / devices.length) * 100) : 0}%
                </div>
                <div className="mt-4 w-full h-12 bg-red-200 rounded-xl opacity-60 flex items-center justify-center text-xl font-bold text-red-900">
                  {inactiveDevices}
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-[300px]">
              <Map />
            </div>
          </div>
        </div>
        <div className="bg-[var(--bg)] rounded-xl shadow p-6 w-full">
          <h2 className="text-2xl font-bold text-left">Device</h2>
          {devices.length === 0 ? (
            <p className="text-gray-500 mt-4">No devices available.</p>
          ) : (
            <div className="bg-[var(--bg)] p-6 rounded-xl shadow-md overflow-auto h-[75%]">
              <table className="min-w-full text-sm text-left border">
                <thead className="bg-[var(--secondary)]">
                  <tr>
                    <th className="border px-3 py-2">Sr. No.</th>
                    <th className="border px-3 py-2">Device ID</th>
                    <th className="border px-3 py-2">Date</th>
                    <th className="border px-3 py-2">Device Name</th>
                    <th className="border px-3 py-2">Category</th>
                    <th className="border px-3 py-2">Region</th>
                    <th className="border px-3 py-2">Status</th>
                    <th className="border px-3 py-2">View Device</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((ele, index) => (
                    <tr key={index} className="">
                      <td className="border px-3 py-2">{index + 1}</td>
                      <td className="border px-3 py-2">{ele.deviceid || '--'}</td>
                      <td className="border px-3 py-2">{ele.date || '--'}</td>
                      <td className="border px-3 py-2">{ele.devicename || '--'}</td>
                      <td className="border px-3 py-2">{ele.category || '--'}</td>
                      <td className="border px-3 py-2">{ele.region || '--'}</td>
                      <td className="border px-3 py-2 capitalize">{getStatus(ele.deviceid)}</td>
                      <td className="border px-3 py-2">
                        <button
                          onClick={() =>
                            ele.deviceid && ele.devicename && navigate(`/dashboard/${ele.deviceid}/${ele.devicename}`)
                          }
                          className="rounded text-[var(--bg)] bg-blue-500 cursor-pointer py-1 px-2 text-sm"
                          disabled={!ele.deviceid || !ele.devicename}
                        >
                          View device
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;