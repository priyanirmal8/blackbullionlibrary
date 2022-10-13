import React from 'react';
import './header.css';

const Header = () => {
  return (
    <div className='header'>
      <img
        src='/images/blackbullion-white-logo.svg'
        loading='lazy'
        width='180'
        height='22'
        alt='Blackbullion logo'
      />
      <h2>Welcome Priya!</h2>
    </div>
  );
};

export default Header;
