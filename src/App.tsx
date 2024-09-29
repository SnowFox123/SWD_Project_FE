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
import Forgetpassword from "./pages/login/Forgetpassword";
import Register from "./pages/login/Register";

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />
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
