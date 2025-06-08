import React from 'react'
import leftAngleBracket from "../assets/leftAngle.png";
import rightAngleBracket from "../assets/rightAngle.png";
import  '../styles/Discount.css'
const DiscountOffers = () => {
  const discount = 10;
  return (
    <div className='discount-container'>
      <span>
        <img src={leftAngleBracket} alt="left-angle" />
      </span>
      <p className='discount-text'>
        Get {discount}% of on business sign up 
      </p>
      <span>
        <img src={rightAngleBracket} alt="right-angle" />
      </span>
    </div>
  );
}

export default DiscountOffers