// components/TopBar.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './topbar.css'; // Import specific CSS for TopBar

const TopBar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <a className="navbar-brand" href="/">Breach Palace</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon">&#9776;</span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contact/">Contact</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about/">About</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default TopBar;
