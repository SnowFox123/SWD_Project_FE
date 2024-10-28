import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

import { ToastContainer, toast } from 'react-toastify';

import "./App.css";
import Header from "./components/header";
import { Navbar } from "./components/nav";
import Cart from "./pages/usercart/cartRent";
import Login2 from "./pages/login/Login";
import Home from "./pages/home/home";
import Rentaltoy from "./pages/rentaltoy/rentaltoy";
import LogoCategories from "./components/logo";
// import Register from "./pages/register/Register";
import Register2 from "./pages/register/register2";
import ForgotPassword from "./pages/forgot-password/forgot-password";
// import AuthStatus from "./redux/AuthStatus";
import AdminPage from "./pages/admin/AdminPage";
import UserPage from "./pages/user/UserPage";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import PrivateRoute from "./pages/privateroute/PrivateRoute";  // Import PrivateRoute
import Logout from "./pages/user/Logout";
import SupplierPage from "./pages/supplier/SupplierPage";
import StaffPage from "./pages/staff/Staff";
import ProfileUser from "./pages/profile/profileuser";
import ChangePassword from "./pages/user/changePassword";
import { useSelector } from 'react-redux'; //
import CartRent from "./pages/usercart/cartRent";
import CartSale from "./pages/usercart/cartsale";
import ToyRentalDetail from "./pages/toy/toyrent/ToyRentalDetail";
import OrderRent from "./pages/user/order/OrderRent";
import OrderSale from "./pages/user/order/OrderSale";
import ToySaleDetail from "./pages/toy/toysale/ToySaleDetail";

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

        <Route
          path="/voucher"
          element={
            <PrivateRoute allowedRoles={['1']}>
              <ChangePassword />
            </PrivateRoute>
          }
        />

        <Route
          path="/paid"
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
          path="/orderrent"
          element={
            <PrivateRoute allowedRoles={['1']}>
              <OrderRent />
            </PrivateRoute>
          }
        />

        <Route
          path="/ordersale"
          element={
            <PrivateRoute allowedRoles={['1']}>
              <OrderSale />
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
            <PrivateRoute allowedRoles={['1', 'guest']} >
              <ToyRentalDetail />
            </PrivateRoute>
          }
        />

        <Route
          path="/toysaledetail/:id"
          element={
            <PrivateRoute allowedRoles={['1', 'guest']} >
              <ToySaleDetail />
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
