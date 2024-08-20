import React, { useRef, useState } from 'react';
import './contactform.css'; 
import DocumentTitle from './DocumentTitle';
import axios from "axios";
import { Button } from "react-bootstrap";
import Alert from '@mui/material/Alert';
import ReCAPTCHA from "react-google-recaptcha";

const ContactForm = () => {
  DocumentTitle("Contact BreachPalace");
  
  // Have button disabled until the user completes the captcha
  const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false);
 
  const captchaRef = useRef(null);
  const [charCount, setCharCount] = useState(0);

  // Will not display alert messages until set to true
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  
  const handleChange = (event) => {
    setCharCount(event.target.value.length);
  };

  function clearFields() {
    // Clears contact input fields after submit
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
    // Disable button
    setIsCaptchaSuccess(false);
    // refresh page after 1 second
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  }

  function oncapChange() {
    setIsCaptchaSuccess(true);  // Update captcha state
  }

  function getCookie(name) {
    // Provided by django docs (grabbing csrf cookie)
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const handleContact = (event) => {
    event.preventDefault(); // Prevent default form submission
    const csrftoken = getCookie('csrftoken'); // Get CSRF token from cookies

    axios.post('/api/contact/', {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    }, {
      headers: {
        'X-CSRFToken': csrftoken,
        'Content-Type': 'application/json'
      }
    })
    
    .then(response => {
      if (response.status === 200) {
        clearFields();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
      }
    })

    .catch(error => {
      if (error.response.status === 302) {
        clearFields();
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
      }
    });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      {showSuccess && (
       <Alert severity="success">Thank you for your message. It has been sent.</Alert>
      )}
      
      {showAlert && (
       <Alert severity="error">This email has already been submitted.</Alert>
      )}

      <br/> 
      <form onSubmit={handleContact}>
        <div className="form-group">
          <input type="text" id="name" name="name" className="form-control" placeholder="Name" />
        </div>
        <br />
        <div className="form-group">
          <input type="email" id="email" name="email" className="form-control" placeholder="Email" />
        </div>
        <br />
        <div className="form-group">
          <textarea 
            id="message" 
            name="message" 
            className="form-control" 
            rows="5" 
            placeholder="Message" 
            maxLength="1000" 
            onChange={handleChange}
          ></textarea>
          <br />
          <div className="char-counter">
            <span>{charCount}</span>/1000
          </div>
        </div>
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_SITE_KEY}
          ref={captchaRef}
          onChange={oncapChange}
        />
        <br/>
        <Button type="submit" variant="light" disabled={!isCaptchaSuccessful}>Send Message</Button>
      </form>
    </div>
  );
};

export default ContactForm;