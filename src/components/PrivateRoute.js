import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Assumes you are using Redux for state management

// Component to protect routes based on role
const PrivateRoute = ({ children, allowedRoles }) => {
    const role = useSelector((state) => state.auth.role); // Get the role from Redux store

    // Check if the role is not in the list of allowed roles
    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" />; // Redirect to Unauthorized page
    }

    // If the role is valid, render the child components
    return children;
};

export default PrivateRoute;
