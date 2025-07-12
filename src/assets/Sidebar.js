import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import {
  Home,
  PlusCircle,
  LogOut
} from "lucide-react";

const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <aside className="w-64 min-h-screen bg-white border-r shadow-md p-6">
      <div className="text-2xl font-bold mb-10 text-blue-600">Clarity</div>
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
          Add Device
        </Link>

        <button
          onClick={() => dispatch(logout())}
          className="flex items-center gap-3 text-gray-700 font-medium hover:bg-red-100 px-2 py-2 rounded transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
