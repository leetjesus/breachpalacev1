import React, { useState } from 'react';
import './contactform.css'; // Assuming you will use an external CSS file
import DocumentTitle from './DocumentTitle';

import { Button} from "react-bootstrap";

const ContactForm = () => {
  DocumentTitle("Contact BreachPalace")
  const [charCount, setCharCount] = useState(0);
  
  const handleChange = (event) => {
    setCharCount(event.target.value.length);
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <form action="/submit_contact_form/" method="post">
        <div className="form-group">
          <input type="text" id="name" name="name" className="form-control" placeholder="Name" />
        </div>
        <br></br>
        <div className="form-group">
          <input type="email" id="email" name="email" className="form-control" placeholder="Email" />
        </div>
        <br></br>
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
          <br></br>
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
