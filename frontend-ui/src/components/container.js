// components/Container.js
import React from 'react';
import './container.css'; // Import specific CSS for Container
import axios from "axios";
import { getCookie } from './getCookie.js';

const Container = () => {
  function onChange(){
    const csrftoken = getCookie('csrftoken');
    axios.get('/api/search/', {
      headers: {
        'X-CSRFToken': csrftoken,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.status===200){
        alert(response.data)
      }
    })
    .catch(error=> {
      if (error.response.status === 404) {
        alert('Not working!')
      }
    })
  }
  return (
    <div className="container">
      <h1>Welcome to Breach Palace</h1>
      <div className="input-group">
        <input type="text" placeholder="Email address..." />
        <form onSubmit={onChange}>
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Container;
