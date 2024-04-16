import "../assets/css/header.css";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {

  // Define state to manage the active link
  const [activeLink, setActiveLink] = useState('Home');

  // Function to handle click on nav links
  const handleClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${activeLink === 'Home' ? 'active' : ''}`}
                onClick={() => handleClick('Home')}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeLink === 'About' ? 'active' : ''}`}
                onClick={() => handleClick('About')}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeLink === 'Contact' ? 'active' : ''}`}
                onClick={() => handleClick('Contact')}
                to="/contact"
              >
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeLink === 'Soap' ? 'active' : ''}`}
                onClick={() => handleClick('Soap')}
                to="/soap"
              >
                Soap
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeLink === 'Bath' ? 'active' : ''}`}
                onClick={() => handleClick('Bath')}
                to="/bath"
              >
                Bath & Skin
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeLink === 'Household' ? 'active' : ''}`}
                onClick={() => handleClick('Household')}
                to="/household"
              >
                Household
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeLink === 'Clothing' ? 'active' : ''}`}
                onClick={() => handleClick('Clothing')}
                to="/clothing"
              >
                Clothing
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeLink === 'Jewelry' ? 'active' : ''}`}
                onClick={() => handleClick('Jewelry')}
                to="/jewelry"
              >
                Jewelry
              </Link>
            </li>

          </ul>
        </div>
        <button type="button" className="cart-button" data-bs-toggle="modal" data-bs-target="#cart-modal">
          <svg width="30" height="30" className="bi bi-cart2" viewBox="0 0 16 16">
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Header;