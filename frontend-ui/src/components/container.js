// components/Container.js
import React from 'react';
import './container.css'; // Import specific CSS for Container

const Container = () => {
  return (
    <div className="container">
      <h1>Welcome to Breach Palace</h1>
      <div className="input-group">
        <input type="text" placeholder="Email address..." />
        <button>Search</button>
      </div>
    </div>
  );
};

export default Container;
