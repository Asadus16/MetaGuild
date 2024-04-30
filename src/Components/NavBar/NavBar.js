import React from 'react';
import logo from '../../images/logo.png';
import './Navbar.css';

export default function NavBar() {
  return (
    <div className="navbar">
      <main className="main">
        <a href="#">
          <img src={logo} className="logo" />
        </a>
      </main>
    </div>
  );
}
