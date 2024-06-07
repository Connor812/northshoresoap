import "../assets/css/header.css";
import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DataContext } from "../hooks/dataContext.js";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { TbSearch } from "react-icons/tb";

function Header({ updateCart, cartItems, setCartItems }) {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const dataProvider = useContext(DataContext);
  const categories = dataProvider.categories;

  // Function to check if a link is active based on the URL pathname
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <Navbar className="navbar" expand="lg" expanded={expanded}>
        <Container className="nav-container">
          <Nav.Link onClick={() => setExpanded(false)} style={{ width: "50px", margin: "0px", padding: "0px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src="http://northshoresoapworks.com/images/bird.png" alt="North Shore Soap Works" className="logo-link-img" width="100%" height="auto" />
          </Nav.Link>
          <Navbar.Toggle id="basic-navbar-nav-btn" aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
          <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse">
            <Nav className="me-auto">

              <Nav.Link onClick={() => setExpanded(false)}>
                <Link to="/northshoresoap" className={isActiveLink("/northshoresoap") ? "active" : ""}>Home</Link>
              </Nav.Link>
              <Nav.Link onClick={() => setExpanded(false)}>
                <Link to="/about" className={isActiveLink("/about") ? "active" : ""}>About Us</Link>
              </Nav.Link>
              <NavDropdown title="Categories" className="nav-dropdown-categories" id="basic-nav-dropdown">
                {categories.map(category => {
                  const categoryName = category.name;
                  const categoryId = category.id;

                  return (
                    <NavDropdown.Item key={categoryId} className="nav-dropdown-link-container" onClick={() => setExpanded(false)}>
                      <Link to={`/display_items/${categoryId}`} className="nav-dropdown-link">{categoryName}</Link>
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Link to="/search"
            className="search-icon">
            <TbSearch />
          </Link>
          <Link onClick={() => {
            updateCart(JSON.parse(localStorage.getItem("cartItems")));
            setExpanded(false);
          }}
            to="/checkout"
            className="cart-button">
            <svg width="30" height="30" className="bi bi-cart2" viewBox="0 0 16 16">
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
            </svg>
          </Link>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
