// components/Container.js
import React, { useState } from 'react';
import './container.css'; // Import specific CSS for Container
import axios from "axios";
import { getCookie } from './getCookie.js';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import NoBreachContainer from './nobreachfoundPage.js'

const Container = () => {
  const navigate = useNavigate();
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  function validateEmail(value) {  
    let error;

    if (!value) {
      error = '404';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = '404';
    } else {
      error = '200'
    }
    return error;
  }

  function onChange(event) {
    event.preventDefault(); // Prevents the default form submission (prevent refresh)
    
    const csrftoken = getCookie('csrftoken');
    const email = document.getElementById('email').value;
    // Email validation from the server side. (API EMAIL SERVER SIDE EMAIL VALIDATION)
    const url = '/api/email/' + email;
    
    const emailStatus = validateEmail(email)
    
    if (emailStatus === '200') {
      axios.get(url, {
        headers: {
          'X-CSRFToken': csrftoken,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.status === 200) {
          // Redirects to api call once we get a succesful message.
          navigate('/result/' + email); // redirect to /result
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          // Pop up success message here.
          setShowSuccess(true)
        } else {
          // Pop error message compo
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 5000);
        }
      });
    } else if (emailStatus === '404'){
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  }

  return (
    <div className="container">
      <h1>Welcome to Breach Palace</h1>
      
      {showAlert && (
       <Alert severity="error">Invalid email format. Please try again.</Alert>
      )}
      <br/>
      
      <div className="input-group">
        <input id='email' type="text" placeholder="Email address..." />
        <form onSubmit={onChange}>
          <button type="submit">Search</button>
        </form>
        
        <br/>
        {showSuccess && (
          <Alert severity="success">Congrats your email has not been found in a leak!.</Alert>
        )}
      </div>
      <NoBreachContainer />
    </div>
  );
};

export default Container;
