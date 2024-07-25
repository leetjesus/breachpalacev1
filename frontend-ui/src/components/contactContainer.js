import React, { useState } from 'react';
import './contactform.css'; // Assuming you will use an external CSS file

const ContactForm = () => {
  const [charCount, setCharCount] = useState(0);
  
  const handleChange = (event) => {
    setCharCount(event.target.value.length);
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <form action="/submit_contact_form/" method="post">
        <div className="form-group">
          <input type="text" id="name" name="name" className="form-control" placeholder="Your Name" />
        </div>
        <div className="form-group">
          <input type="email" id="email" name="email" className="form-control" placeholder="Your Email" />
        </div>
        <div className="form-group">
          <textarea 
            id="message" 
            name="message" 
            className="form-control" 
            rows="5" 
            placeholder="Your Message" 
            maxLength="1000" 
            onChange={handleChange}
          ></textarea>
          <div className="char-counter">
            <span>{charCount}</span>/1000
          </div>
        </div>
        <button type="submit" className="btn-custom">Send Message</button>
      </form>
    </div>
  );
};

export default ContactForm;
