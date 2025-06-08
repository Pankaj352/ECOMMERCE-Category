import React from 'react'
import Navbar from './Navbar'
import DiscountOffers from './DiscountOffers';
import '../styles/Header.css'
const Header = ({userName}) => {
  return (
    <>
      <header className="">
        <div className="user-details">
          <div className="help same">Help</div>
          <div className="order same">Order & Returns</div>
          <div className="profile same">{`Hi, ${
            userName ? userName : "John"
          }`}</div>
        </div>

        <div>
          <Navbar />
        </div>
      </header>
      <div className="">
        <DiscountOffers />
      </div>
    </>
  );
}

export default Header