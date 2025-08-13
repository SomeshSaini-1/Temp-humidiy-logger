import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeClosed } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login logic
    if (username === 'admin' && password === '1234') {
      dispatch(login());
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  const [showp,setshowp] = useState();

  return (
    <div className="min-h-screen flex items-center justify-evenly " style={{background:"linear-gradient(to right, #2B7AC3 53%, #c2d8f2 95%)"}}>
      <div className="bg-white p-8 shadow-md w-full max-w-2xl h-[40rem] " style={{borderRadius:"2rem 2rem 8rem"}}>
        <h2 className="text-4xl text-gray-800 font-bold mt-16 mb-4 text-center">Welcome</h2>
        <h3 className='text-2xl text-gray-700 font-normal mb-6 text-center'>Sign in to Your account</h3>
        <label className="block text-gray-500 mb-6 text-center text-lg">Enter your credentials to access your account</label>
        <form onSubmit={handleLogin} className='w-1/2  mx-auto flex flex-col'>

          <div className="mb-6">
            <label className="block text-gray-500 text-left mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border-2 border-gray-400 rounded "
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-500 text-left mb-2">Password</label>
            <div className="w-full p-2 border-2 border-gray-400 rounded flex items-center">
              <input
                type={showp ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='h-fit w-[90%] border-white bg-transparent focus:outline-none'
                required
              />
              <button
                type="button"
                tabIndex={-1}
                className="ml-2 focus:outline-none"
                onClick={() => setshowp(!showp)}
                aria-label={showp ? "Hide password" : "Show password"}
              >
                {showp ? <Eye /> : <EyeClosed />}
              </button>
            </div>
          </div>
          <label className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" />
            Keep me signed in
          </label>
          <button
            type="submit"
            className="w-full bg-green-400 text-white p-2 rounded hover:bg-green-500"
          >
            Login
          </button>

          <p className='text-gray-600 mt-8'>2025 © Oxymora All Rights Reserved</p>
        </form>
      </div>
      <div className='flex items-center justify-center w-full max-w-2xl hidden md:block '>
        <img src={"/logo.png"} alt='logo' className='w-3/4' />
      </div>
    </div>
  );
};

export default Login;