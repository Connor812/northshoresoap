import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header.js';
import Home from './pages/home.js';
import About from './pages/about.js';
import Contact from './pages/contact.js';
import Soap from './pages/soap.js';
import Bath from './pages/bath.js';
import Household from './pages/household.js';
import Clothing from './pages/clothing.js';
import Jewelry from './pages/jewelry.js';
import Cart from './pages/cart.js';

import { DataProvider } from './hooks/dataContext.js'; // Import DataProvider
import "./assets/css/main.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Router>
      <DataProvider>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/soap" element={<Soap />} />
            <Route path="/household" element={<Household />} />
            <Route path="/bath" element={<Bath />} />
            <Route path="/clothing" element={<Clothing />} />
            <Route path="/jewelry" element={<Jewelry />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </DataProvider>
    </Router>
  );
}

export default App;
