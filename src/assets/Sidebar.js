import { Link } from "react-router-dom"
import { useDispatch } from "react-redux";

const Sidebar = () => {
      const dispatch = useDispatch();
    
  return (
 
         <aside className="w-64 bg-white border-r shadow-sm p-4">
              <div className="text-2xl font-bold mb-6 text-blue-600">Clarity</div>
              <nav className="flex flex-col space-y-2 items-start">
                
                <Link to="/" className="text-gray-600 font-medium hover:bg-blue-400 rounded ">
                  Home
                </Link>
                <Link to="/add-device" className="text-gray-600 font-medium">
                  Add Device
                </Link>
                <button
                  onClick={() => dispatch(logout())}
                  className="text-gray-600 font-medium"
                >
                  Logout
                </button>
              </nav>
            </aside>
      
  )
}

export default Sidebar
