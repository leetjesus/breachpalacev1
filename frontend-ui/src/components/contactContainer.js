import React, { useState } from 'react';
import './contactform.css'; // Assuming you will use an external CSS file
import DocumentTitle from './DocumentTitle'; // Ensure this is a valid import
import axios from "axios";
import { Button } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';

const ContactForm = () => {
  DocumentTitle("Contact BreachPalace");

  const [charCount, setCharCount] = useState(0);

  const handleChange = (event) => {
    setCharCount(event.target.value.length);
  };

  function getCookie(name) {
    // Provided by django docs
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
      // Collect form data here if needed.... Convert into json?
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
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
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
        <Button type="submit" variant="light">Send Message</Button>
      </form>
    </div>
  );
};

export default ContactForm;
