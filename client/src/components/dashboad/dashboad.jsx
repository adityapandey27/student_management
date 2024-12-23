import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/sideBar';
import StudentList from '../studentList/studentList';
import CreateStudent from '../createStudent/createStudent';
import "./dashboad.css"

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar onLogout={handleLogout} />
      <div  className='dashboad'>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/create" element={<CreateStudent />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
