import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import {
  Home,
  PlusCircle,
  LogOut, Settings, User2Icon
  , ChevronDown
} from "lucide-react";
import { BiSupport } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

function Downdata() {
  const navigate = useNavigate();

  return (
    <ul className="absolute bottom-24 left-4 mt-2 bg-white shadow-md rounded-md w-48 z-[99]">
      <li className="text-left px-4 py-2">Welcome !</li>
      <li className="text-center p-2 cursor-pointer" onClick={() => navigate('/Support')}>
        <Settings className="inline mr-2" /> Settings
      </li>
      <li className="text-center p-2 border-b cursor-pointer" onClick={() => navigate('/Support')}>
        <BiSupport className="inline mr-2" /> Support
      </li>
      <li className="text-center p-2 text-red-500 cursor-pointer" onClick={() => navigate('/login')}>
        <LogOut className="inline mr-2" /> Logout
      </li>
    </ul>
  );
}

const Sidebar = () => {
  const dispatch = useDispatch();
  const [show, setshow] = useState(false);

  return (
    <aside className="w-64 min-h-screen bg-white border-r shadow-md p-6">
      <div className="text-2xl font-bold mb-10 text-blue-600">
        <img src="/logo1.png" alt="logo" />
      </div>
      <nav className="flex flex-col gap-2">
        <Link
          to="/"
          className="flex items-center gap-3 text-gray-700 font-medium hover:bg-blue-100 px-2 py-2 rounded transition-all"
        >
          <Home size={20} />
          Home
        </Link>

        <Link
          to="/add-device"
          className="flex items-center gap-3 text-gray-700 font-medium hover:bg-blue-100 px-2 py-2 rounded transition-all"
        >
          <PlusCircle size={20} />
          Device
        </Link>

        <Link
          to="/Support"
          className="flex items-center gap-3 text-gray-700 font-medium hover:bg-blue-100 px-2 py-2 rounded transition-all"
        >
          <BiSupport size={20} />
          Support
        </Link>

        <Link
          to="/Setting"
          className="flex items-center gap-3 text-gray-700 font-medium hover:bg-blue-100 px-2 py-2 rounded transition-all"
        >
          <Settings size={20} />
          Setting
        </Link>

        <button
          onClick={() => dispatch(logout())}
          className="flex items-center gap-3 text-gray-700 font-medium hover:bg-red-100 px-2 py-2 rounded transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>

      <div
        className="absolute bottom-4 left-0 w-64 flex items-center justify-between p-3 bg-white rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl hover:bg-gray-50"
        onClick={() => setshow(!show)}
      >
        <div className="flex items-center">
          {/* User Icon */}
          <User2Icon className="w-10 h-10 bg-blue-100 text-blue-600 p-2 rounded-full mr-3 flex-shrink-0" />

          {/* Text content */}
          <div className="text-left">
            <p className="text-sm font-medium text-gray-700">Hello there!</p>
            <p className="text-lg font-semibold text-gray-900">Admin </p>
          </div>
        </div>

        {/* Dropdown Icon */}
        <ChevronDown className={`w-6 h-6 text-gray-500 ml-4 transition-transform duration-300 ${show ? 'rotate-180' : 'rotate-0'}`} />
      </div>

      {show && <Downdata />}
    </aside>
  );
};

export default Sidebar;
