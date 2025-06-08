import React from "react";
import CartIcon from '../assets/Cart.png'
import searchIcon from '../assets/Search.png';
import '../styles/Navbar.css';
const Navbar = () => {
  return (
    <nav>
      <div className="logo-container">
        <a href="#" className="logo-link">
          Ecommerce
        </a>
      </div>
      <div className="navLink-container">
        <ul className="navLinks">
          <li className="navLink">
            <a href="" className="navLink-text">
              Categories
            </a>
          </li>
          <li className="navLink">
            <a href="" className="navLink-text">
              Sales
            </a>
          </li>
          <li className="navLink">
            <a href="" className="navLink-text">
              Clearance
            </a>
          </li>
          <li className="navLink">
            <a href="" className="navLink-text">
              New stock
            </a>
          </li>
          <li className="navLink">
            <a href="" className="navLink-text">
              Trending
            </a>
          </li>
        </ul>
      </div>
      <div className="searchCart-container">
        <div className="img-box">
          <img src={searchIcon} alt="search-icon" />
        </div>
        <div className="img-box">
          <img src={CartIcon} alt="search" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
