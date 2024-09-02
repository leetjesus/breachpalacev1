// components/Container.js
import React from 'react';
import './container.css'; // Import specific CSS for Container
import axios from "axios";
import { getCookie } from './getCookie.js';
import { useNavigate } from 'react-router-dom';


const Container = () => {
  const navigate = useNavigate();

  function onChange(event) {
    event.preventDefault(); // Prevents the default form submission (prevent refresh)
    
    const csrftoken = getCookie('csrftoken');
    const email_text = document.getElementById('email').value;
    const url = '/api/email/' + email_text;
  
    axios.get(url, {
      headers: {
        'X-CSRFToken': csrftoken,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.status === 200) {
        // Redirects to api call once we get a succesful message.
        navigate('/result/' + email_text); // redirect to /result
      }
    })
    .catch(error => {
      if (error.response && error.response.status === 404) {
        alert(error.response.data.message);
      } else {
        // Pop error message compo
        alert('An unexpected error occurred');
      }
    });
  }

  return (
    <div className="container">
      <h1>Welcome to Breach Palace</h1>
      <div className="input-group">
        <input id='email' type="text" placeholder="Email address..." />
        <form onSubmit={onChange}>
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Container;
