import { useDispatch } from 'react-redux';
import Sidebar from '../assets/Sidebar';
import { useNavigate } from 'react-router-dom';
import { FaDownload, FaSitemap } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";

function StatCard({ title, id, onClick }) {
  return (
    <div
      className="bg-white border shadow rounded-lg p-4 w-40 flex flex-col spyce-y-2 transition-transform hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <div className="text-gray-700 text-base text-left mb-1 font-semibold">{title}</div>
      <div className="text-gray-500 text-xs text-left mb-3">{id}</div>
      <div className="bg-red-600 text-white rounded w-full text-center py-2 text-sm font-medium transition">Disconnected</div>
    </div>
  );
}

const deviceCards = [
  { title: "Rue Simart1", id: "ASF65R4" },
  { title: "Rue Simart2", id: "ASF65R5" },
  { title: "Rue Simart3", id: "ASF65R6" },
];

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="text-2xl font-bold">Welcome</div>
          </div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>

        {/* Dashboard Section */}
        <div className="bg-white rounded-xl shadow p-6 w-full mb-4">
          {/* Header Row */}
          <div className="flex items-center space-x-3 mb-6">
            <FaSitemap className="text-blue-500 text-2xl" />
            <h2 className="text-2xl font-bold">Dashboard</h2>
          </div>

          {/* Main Section */}
          <div className="flex flex-wrap gap-6 items-center">
            {/* Total Devices */}
            <div className="text-left min-w-[160px]">
              <h3 className="text-lg font-semibold text-gray-700">Total Devices</h3>
              <p className="text-4xl font-extrabold text-black mt-2">357+</p>
            </div>

            {/* Active Device Card */}
            <div className="flex-1 min-w-[220px] bg-green-50 border border-green-200 rounded-xl p-4 relative">
              <h4 className="text-gray-700 text-sm mb-1 font-semibold">Active Devices</h4>
              <div className="absolute top-4 right-4 text-green-600 text-sm font-semibold flex items-center">
                <FaChartLine className="mr-1" /> 32.76%
              </div>
              <div className="mt-4 w-full h-12 bg-green-200 rounded-xl opacity-60 flex items-center justify-center text-xl font-bold text-green-900">123</div>
            </div>

            {/* Inactive Device Card */}
            <div className="flex-1 min-w-[220px] bg-red-50 border border-red-200 rounded-xl p-4 relative">
              <h4 className="text-gray-700 text-sm mb-1 font-semibold">Inactive Devices</h4>
              <div className="absolute top-4 right-4 text-red-600 text-sm font-semibold flex items-center">
                <FaChartLine className="mr-1" /> 32.76%
              </div>
              <div className="mt-4 w-full h-12 bg-red-200 rounded-xl opacity-60 flex items-center justify-center text-xl font-bold text-red-900">234</div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="bg-white rounded-xl shadow p-6 w-full">
            <h2 className="text-2xl font-bold text-left">Device</h2>
          <div className="flex gap-6 my-4">
            {deviceCards.map((device, idx) => (
              <StatCard
                key={device.id}
                title={device.title}
                id={device.id}
                onClick={() => navigate('/dashboard')}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;