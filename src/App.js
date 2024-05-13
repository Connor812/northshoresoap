import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header.js';
import Home from './pages/home.js';
import About from './pages/about.js';
import Soap from './pages/soap.js';
import Bath from './pages/bath.js';
import Household from './pages/household.js';
import Clothing from './pages/clothing.js';
import Jewelry from './pages/jewelry.js';
import Cart from './pages/cart.js';
import Checkout from './pages/checkout.js';
import Payment from './pages/payment.js';
import Thankyou from './pages/thankyou.js';
import EmailListing from './pages/emailListing.js';

import { DataProvider, DataContext } from './hooks/dataContext.js'; // Import DataProvider
import "./assets/css/main.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Router>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </Router>
  );
}

function AppContent() {
  const { setCartItems, subTotal, setSubtotal, hst, setHst, grandTotal, setGrandTotal } = useContext(DataContext);

  function updateCart(cartItems) {
    setCartItems(cartItems);
    setSubtotal(cartItems.reduce((accumulator, item) => (accumulator + item.price * item.quantity), 0).toFixed(2));
    setHst((cartItems.reduce((accumulator, item) => (accumulator + item.price * item.quantity), 0) * 0.13).toFixed(2));
    setGrandTotal((cartItems.reduce((accumulator, item) => (accumulator + item.price * item.quantity), 0) * 1.13).toFixed(2));
  }

  return (
    <>
      <Header updateCart={updateCart} />
      <Cart />
      <Routes>
        <Route path="/northshoresoap" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/soap" element={<Soap />} />
        <Route path="/household" element={<Household />} />
        <Route path="/bath" element={<Bath />} />
        <Route path="/clothing" element={<Clothing />} />
        <Route path="/jewelry" element={<Jewelry />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/thankyou" element={<Thankyou />} />
        <Route path="/email_listing" element={<EmailListing />} />
      </Routes>
    </>
  );
}

export default App;
