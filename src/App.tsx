import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import "./App.css";
import Header from "./components/header";
import { Navbar } from "./components/nav";
import Cart from "./pages/usercart/cart";
import HistoryUserCart from "./pages/usercart/historyusercart";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import Rentaltoy from "./pages/rentaltoy/rentaltoy";
import LogoCategories from "./components/logo";
import Register from "./pages/register/Register";
import ForgotPassword from "./pages/forgot-password/forgot-password";

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/historyusercart" element={<HistoryUserCart />} />
        <Route path="/rentaltoy" element={<Rentaltoy />} />
        {/* Add other routes here */}
      </Routes>

      <LogoCategories />
    </Router>
  );
}

export default App;
