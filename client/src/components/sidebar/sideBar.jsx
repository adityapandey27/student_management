import React from 'react';
import { Link } from 'react-router-dom';
import "./sideBar.css"
function Sidebar({ onLogout }) {
  return (
    <div className='side-bar'>
      <h3 style={{display:"flex",justifyContent:"center"}}>Menu</h3>

      <div className='side-bar-list'>  
        <div>
         <Link style={{
        textDecoration: "none",
        color: "#000",
        fontWeight: "bold",
        padding: "5px 10px", 
        }} to="/dashboard">Student List</Link>
        </div>     
        <div className='button' onClick={onLogout}>
        Logout
          </div>     

      </div>

    </div>
  );
}

export default Sidebar;
