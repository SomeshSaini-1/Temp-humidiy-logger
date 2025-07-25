import React, { useState, useEffect } from 'react';
import { User2Icon, ChevronDown, Settings, LogOut, Sun, Moon } from 'lucide-react';
import { BiSupport } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

function Downdata() {
  const navigate = useNavigate(); 

  return (
    <ul className="absolute top-14 right-2 mt-2 bg-white dark:bg-gray-900 dark:text-white shadow-md rounded-md w-48 z-[99]">
      <li className="text-left px-4 py-2">Welcome!</li>
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

const Header = ({ icon, Name }) => {
  const [show, setShow] = useState(false);
  const [theme, setTheme] = useState('light-theme');

  // Load theme on mount
  useEffect(() => {
    const savedTheme = sessionStorage.getItem('theme') || 'light-theme';
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  // Update body class and session storage when theme changes
  useEffect(() => {
    document.body.className = theme;
    sessionStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light-theme' ? 'dark-theme' : 'light-theme'));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6 border py-4 px-2 rounded-xl relative">
        <div>
          <div className="text-2xl font-bold flex gap-4 items-center"><span className='text-black'>{icon}</span> {Name}</div>
        </div>
        <div className="flex items-center justify-center cursor-pointer gap-4">
          <span onClick={toggleTheme} className="hover:text-yellow-500">
            {theme === 'light-theme' ? <Sun /> : <Moon />}
          </span>
          <span onClick={() => setShow(!show)} className="flex items-center justify-center cursor-pointer">
            <User2Icon className="w-10 h-10 bg-blue-100 text-blue-600 p-2 rounded-full mr-3 flex-shrink-0" />
            <ChevronDown />
          </span>
        </div>

        {show && <Downdata />}
      </div>
    </>
  );
};

export default Header;
