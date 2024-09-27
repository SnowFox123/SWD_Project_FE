import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import "./App.css";
import Header from "./components/header";
import { Navbar } from "./components/nav";
import Cart from "./pages/usercart/cart";
import HistoryUserCart from "./pages/usercart/historyusercart";
import Login from "./pages/login/login";

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/historyusercart" element={<HistoryUserCart />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
