import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/'); // Redirect to the home page
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <button onClick={handleNavigateHome} style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px' }}>
        Go to Home
      </button>
    </div>
  );
};

export default Unauthorized;
