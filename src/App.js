import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Home from './components/Home';
import AddDevice from './components/AddDevice';
import Dashboard from './components/Dashboard';
import Support from './components/Support';
import './App.css';

// ProtectedRoute as a wrapper component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Wrapper for routes that need Redux hooks
const Protected = (Component) => (
  <ProtectedRoute>
    <Component />
  </ProtectedRoute>
);

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <ProtectedRoute><Home /></ProtectedRoute>,
  },
  {
    path: '/dashboard/:id/:name',
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
  },
  {
    path: '/Support',
    element: <ProtectedRoute><Support /></ProtectedRoute>,
  },
  {
    path: '/add-device',
    element: <ProtectedRoute><AddDevice /></ProtectedRoute>,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
