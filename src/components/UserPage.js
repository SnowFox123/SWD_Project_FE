import React from 'react';
import {  useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';


const UserPage = () => {
    // const role = useSelector((state) => state.auth.role);
  
    // Chỉ cho phép role 1 (User) hoặc role 4 (Admin) truy cập trang này
    // if (role !== '1' && role !== '4') {
    //   return <Navigate to="/unauthorized" />;
    // }

    const navigate = useNavigate()

    const handleRental = () => {
      navigate("/rentaltoy")
    }
  
    return (
      <div>
        <h1>User Dashboard</h1>
        <button onClick={() => handleRental()}>Rentaltoy</button>
        {/* Nội dung cho User */}
      </div>
    );
  };

  export default UserPage;
  