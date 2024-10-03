import React from 'react';
import { useSelector } from 'react-redux';

const AuthStatus = () => {
  // Lấy dữ liệu từ Redux store
  const accessToken = useSelector((state) => state.auth.accessToken);
  const refreshToken = useSelector((state) => state.auth.refreshToken);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div>
      <h3>Authentication Status</h3>
      <p>Access Token: {accessToken}</p>
      <p>Refresh Token: {refreshToken}</p>
      <p>Is Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
      {/* <p>state {}</p> */}
    </div>
  );
};

export default AuthStatus;
