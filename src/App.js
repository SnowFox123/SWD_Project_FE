import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

import { ToastContainer, toast } from 'react-toastify';

import "./App.css";
import Header from "./components/header";
import { Navbar } from "./components/nav";
import Cart from "./pages/usercart/cart";
import HistoryUserCart from "./pages/usercart/historyusercart";
import Login2 from "./pages/login/Login";
import Home from "./pages/home/home";
import Rentaltoy from "./pages/rentaltoy/rentaltoy";
import LogoCategories from "./components/logo";
// import Register from "./pages/register/Register";
import Register2 from "./pages/register/register2";
import ForgotPassword from "./pages/forgot-password/forgot-password";
// import AuthStatus from "./redux/AuthStatus";
import AdminPage from "./components/AdminPage";
import UserPage from "./components/UserPage";
import Unauthorized from "./components/Unauthorized";
import PrivateRoute from "./components/PrivateRoute";  // Import PrivateRoute
import Logout from "./components/Logout";
import SupplierPage from "./components/Supplier";
import StaffPage from "./components/Staff";
import ProfileUser from "./pages/profile/profileuser";
import ChangePassword from "./components/changePassword";

function App() {
  return (
    <>
      <Header />
      <Navbar />
      {/* <AuthStatus /> */}
      {/* <Logout /> */}

      <Routes>
        {/* Unrestricted routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login2 />} />
        <Route path="/logout" element={<Logout />} />

        <Route
          path="/profile"
          element={
            <PrivateRoute allowedRoles={['1', '2', '3']}>
              <ProfileUser />
            </PrivateRoute>
          }
        />

<Route
          path="/changepassword"
          element={
            <PrivateRoute allowedRoles={['1']}>
              <ChangePassword />
            </PrivateRoute>
          }
        />


        {/* <Route
          path="/edit-profile"
          element={
            <PrivateRoute allowedRoles={['1' || '2' || '3']}>
              <ProfileUser />
            </PrivateRoute>
          }
        /> */}

        {/* Role-based protected routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={['4']}>
              <AdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute allowedRoles={['1']}>
              <UserPage />
            </PrivateRoute>
          }
        />



        <Route
          path="/rentaltoy"
          element={
            <PrivateRoute allowedRoles={['1']}>
              <Rentaltoy />
            </PrivateRoute>
          }
        />
        <Route
          path="/supplier"
          element={
            <PrivateRoute allowedRoles={['2']}>
              <SupplierPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/staff"
          element={
            <PrivateRoute allowedRoles={['3']}>
              <StaffPage />
            </PrivateRoute>
          }
        />

        {/* Other pages */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/customer" element={<Home />} />
        <Route path="/register" element={<Register2 />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/historyusercart" element={<HistoryUserCart />} />
        <Route path="/rentaltoy" element={<Rentaltoy />} />

        {/* Catch-all route for non-existent paths */}
        <Route path="*" element={<Navigate to="/unauthorized" />} />
      </Routes>

      <LogoCategories />
      {/* <ToastContainer /> */}
    </>
  );
}

export default App;
