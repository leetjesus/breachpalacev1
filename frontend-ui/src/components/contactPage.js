import React from 'react';
import TopBar from './topbar';
import Background from './background';
import ContactForm from './contactContainer';

function contactPage() {
    return (
      <div>
        <TopBar />
        <ContactForm />
        <Background />
      </div>
    );
  }
  
  export default contactPage;