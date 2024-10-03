import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Giả sử bạn lưu role trong Redux store

// Component để bảo vệ các route dựa trên role
const PrivateRoute = ({ children, allowedRoles }) => {
  const role = useSelector((state) => state.auth.role); // Lấy role từ Redux store

  // Kiểm tra nếu role không nằm trong danh sách allowedRoles, điều hướng tới trang Unauthorized
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  // Nếu role hợp lệ, hiển thị nội dung trang
  return children;

  
};


export default PrivateRoute;
