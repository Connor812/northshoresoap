import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header.js';
import Footer from './components/footer.js';
import Home from './pages/home.js';
import About from './pages/about.js';
import DisplayItems from './pages/displayItems.js';
import Checkout from './pages/checkout.js';
import Payment from './pages/payment.js';
import Thankyou from './pages/thankyou.js';
import EmailListing from './pages/emailListing.js';
import Search from './pages/search.js';
import Ingredients from './pages/ingredients.js';

import { Helmet } from 'react-helmet';
import { DataProvider, DataContext } from './hooks/dataContext.js';
import ScrollToTop from './utils/ScrollToTop.js';
import "./assets/css/main.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Router>
      <DataProvider>
        <ScrollToTop />
        <AppContent />
      </DataProvider>
    </Router>
  );
}

function AppContent() {
  const { setCartItems, setSubtotal, setHst, setGrandTotal } = useContext(DataContext);

  function updateCart(cartItems) {
    setCartItems(cartItems);
    setSubtotal(cartItems.reduce((accumulator, item) => (accumulator + item.price * item.quantity), 0).toFixed(2));
    setHst((cartItems.reduce((accumulator, item) => (accumulator + item.price * item.quantity), 0) * 0.13).toFixed(2));
    setGrandTotal((cartItems.reduce((accumulator, item) => (accumulator + item.price * item.quantity), 0) * 1.13).toFixed(2));
  }

  return (
    <>
      <Helmet>
        <title>North Shore Soap Works</title>
        <meta name="description" content="Discover NorthShore Soapworks, your source for luxurious, all-natural homemade soaps. Our eco-friendly, chemical-free bars are crafted with nourishing ingredients for a gentle, effective cleanse. Perfect for sensitive skin and sustainable living." />
        <meta name="keywords" content="soap, handmade, natural, organic, eco-friendly, sustainable, sensitive skin, chemical-free, nourishing, cleanse, bath, body, beauty, skincare, North Shore Soap Works" />
        <meta name="author" content="North Shore Soap Works" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Header updateCart={updateCart} />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/display_items/:categoryId" element={<DisplayItems />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/thankyou" element={<Thankyou />} />
        <Route path="/email_listing" element={<EmailListing />} />
        <Route path="/search" element={<Search />} />
        <Route path="/ingredients" element={<Ingredients />} />
      </Routes>
      {/* <InitialModal /> */}
      <Footer />
    </>
  );
}

export default App;