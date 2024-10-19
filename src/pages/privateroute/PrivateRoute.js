import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Assumes you are using Redux for state management

// Component to protect routes based on role
const PrivateRoute = ({ children, allowedRoles, disallowedRoles = [] }) => {
    const role = useSelector((state) => state.auth.role); // Get the role from Redux store

    // Check if the role is one of 1, 2, 3, 4. If not, assign role to 'guest'
    const effectiveRole = ['1', '2', '3', '4'].includes(role) ? role : 'guest';

    // Check if the effective role is in the list of disallowed roles
    if (disallowedRoles.includes(effectiveRole)) {
        return <Navigate to="/unauthorized" />; // Redirect to Unauthorized page
    }

    // Check if the effective role is not in the allowedRoles list
    if (allowedRoles && !allowedRoles.includes(effectiveRole)) {
        return <Navigate to="/unauthorized" />; // Redirect if role is not allowed
    }

    // If the role is valid, render the child components
    return children;
};

export default PrivateRoute;
