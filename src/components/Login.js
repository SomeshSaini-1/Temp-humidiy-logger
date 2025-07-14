import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="min-h-screen flex items-center justify-evenly " style={{background:"linear-gradient(to right, #2B7AC3 53%, #c2d8f2 95%)"}}>
      <div className="bg-white p-8 shadow-md w-full max-w-2xl h-[40rem] " style={{borderRadius:"2rem 2rem 8rem"}}>
        <h2 className="text-xl font-bold mt-16 mb-4 text-center">Welcome</h2>
        <h3 className='text-lg font-nurmal mb-6 text-center'>Login in to Your account</h3>
            <label className="block text-gray-500 mb-6 text-center">Enter your credentials to access your account</label>
        <form onSubmit={handleLogin} className='w-1/2  mx-auto flex flex-col'>

          <div className="mb-6">
            <label className="block text-gray-500 text-left">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border-2 border-gray-400 rounded "
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-500 text-left">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border-2 border-gray-400 rounded "
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 text-white p-2 rounded hover:bg-green-500"
          >
            Login
          </button>
        </form>
      </div>
      <div className='flex items-center justify-center w-full max-w-2xl'>
        <img src={"/logo.png"} alt='logo' className='w-3/4' />
      </div>
    </div>
  );
};

export default Login;