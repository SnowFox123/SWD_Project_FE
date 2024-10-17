import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

import { ToastContainer, toast } from 'react-toastify';

import "./App.css";
import Header from "./components/header";
import { Navbar } from "./components/nav";
import Cart from "./pages/usercart/cartRent";
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
import SupplierPage from "./components/SupplierPage";
import StaffPage from "./components/Staff";
import ProfileUser from "./pages/profile/profileuser";
import ChangePassword from "./components/changePassword";
import { useSelector } from 'react-redux'; //
import CartRent from "./pages/usercart/cartRent";
import CartSale from "./pages/usercart/cartsale";
import ToyRentalDetail from "./components/ToyRentalDetail";
import OrderPage2 from "./components/OrderPage2";

function App() {
  const role = useSelector((state) => state.auth.role); // 


  return (
    <>

      {role !== '4' && role !== '3' && role !== '2' && (
        <>
          <Header />
          <Navbar />
        </>
      )}
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
          path="/user"
          element={
            <PrivateRoute allowedRoles={['1']}>
              <UserPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/order"
          element={
            <PrivateRoute allowedRoles={['1']}>
              <OrderPage2 />
            </PrivateRoute>
          }
        />


        <Route
          path="/cartrental"
          element={
            <PrivateRoute allowedRoles={['1']}>
              <CartRent />
            </PrivateRoute>
          }
        />

        <Route
          path="/toyrentaldetail/:id"
          element={
            <PrivateRoute allowedRoles={['1']}>
              <ToyRentalDetail />
            </PrivateRoute>
          }
        />

        {/* <Route path="/toyrentaldetail/:id" component={ToyRentalDetail} /> */}

        <Route
          path="/cartsale"
          element={
            <PrivateRoute allowedRoles={['1']}>
              <CartSale />
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
        {/* <Route path="/cartrental" element={<CartRent />} /> */}
        {/* <Route path="/historyusercart" element={<HistoryUserCart />} /> */}
        <Route path="/rentaltoy" element={<Rentaltoy />} />

        {/* Catch-all route for non-existent paths */}
        <Route path="*" element={<Navigate to="/unauthorized" />} />
      </Routes>

      {role !== '4' && role !== '3' && role !== '2' && (
        <>
          <LogoCategories />
        </>
      )}

      {/* <ToastContainer /> */}
    </>
  );
}

export default App;
