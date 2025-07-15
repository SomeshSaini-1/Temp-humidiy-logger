import { useSelector } from 'react-redux';
import Sidebar from '../assets/Sidebar';
import { useNavigate } from 'react-router-dom';
import { FaDownload, FaSitemap } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import Header from '../assets/Header';
import Map from '../assets/Map';

function StatCard({ title, id, onClick }) {
  return (
    <div
      className="bg-white border shadow rounded-lg p-4 w-40 flex flex-col space-y-2 transition-transform hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <div className="text-gray-700 text-base text-left mb-1 font-semibold">{title}</div>
      <div className="text-gray-500 text-xs text-left mb-3">{id}</div>
    </div>
  );
}

const Home = () => {
  const { devices = [] } = useSelector((state) => state.sensors);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <Header Name={"Welcome"}/>

        {/* Dashboard Section */}
        <div className="bg-white rounded-xl shadow p-6 w-full mb-4">
          {/* Header Row */}
          <div className="flex items-center space-x-3 mb-6">
            <FaSitemap className="text-blue-500 text-2xl" />
            <h2 className="text-2xl font-bold">Dashboard</h2>
          </div>

          <div className="flex flex-wrap gap-8 items-start">
            {/* Stats */}
            <div className="flex flex-col gap-6 items-center">
              <div className="text-left min-w-[160px]">
                <h3 className="text-lg font-semibold text-gray-700">Total Devices</h3>
                <p className="text-4xl font-extrabold text-black mt-2">2+</p>
              </div>

              <div className="flex-1 min-w-[220px] bg-green-50 border border-green-200 rounded-xl p-4 relative">
                <h4 className="text-gray-700 text-sm mb-1 font-semibold">Active Devices</h4>
                <div className="text-green-600 text-sm font-semibold flex items-center">
                  <FaChartLine className="mr-1" /> 50%
                </div>
                <div className="mt-4 w-full h-12 bg-green-200 rounded-xl opacity-60 flex items-center justify-center text-xl font-bold text-green-900">1</div>
              </div>

              <div className="flex-1 min-w-[220px] bg-red-50 border border-red-200 rounded-xl p-4 relative">
                <h4 className="text-gray-700 text-sm mb-1 font-semibold">Inactive Devices</h4>
                <div className=" text-red-600 text-sm font-semibold flex items-center">
                  <FaChartLine className="mr-1" /> 50%
                </div>
                <div className="mt-4 w-full h-12 bg-red-200 rounded-xl opacity-60 flex items-center justify-center text-xl font-bold text-red-900">1</div>
              </div>
            </div>

            {/* Map */}
            <div className="flex-1 min-w-[300px]">
              <Map />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="bg-white rounded-xl shadow p-6 w-full">
          <h2 className="text-2xl font-bold text-left">Device</h2>

          {devices.length === 0 ? (
            <p className="text-gray-500 mt-4">No devices available.</p>
          ) : (
            // <div className="flex gap-6 my-4 flex-wrap">
            //   {devices.map((device) => (
            //     <StatCard
            //       key={device.id}
            //       title={device.name}
            //       id={device.id}
            //       onClick={() => navigate(`/dashboard/${device.id}`)}
            //     />
            //   ))}
            // </div>
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
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">View Device</th>
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
                  <td className='border px-3 py-2'>{ele.status}</td>
                  <td className="border px-3 py-2">
                    <button onClick={() => navigate(`/dashboard/${ele.id}/${ele.name}`)} className='rounded text-white bg-green-500 cursor-pointer p-2'>View Device</button>
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
