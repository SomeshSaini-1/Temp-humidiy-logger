// WorkInProgress.js
import React from 'react';
import { useNavigate } from 'react-router-dom';


function WorkInProgress() {
    const navigate = useNavigate();

 return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-5xl font-extrabold text-yellow-500 mb-6">
          🚧 Work in Progress 🚧
        </h1>
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          We're busy building something awesome! Please check back soon.
        </p>
        <div className="
          inline-block
          w-16 h-16
          border-8 border-t-8 border-gray-200 border-t-yellow-500
          rounded-full
          animate-spin
        "></div>
    <br />
    <button type="button" onClick={() => { navigate("/")}} className=' bg-yellow-500  font-bold p-4 rounded text-center my-4'>go back Home</button>
      </div>
    </div>
  );
}

export default WorkInProgress;