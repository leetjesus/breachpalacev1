import React from 'react';
import TopBar from './topbar';
import ContainerComponent from './aboutContainer';
import Background from './background';
import DocumentTitle from './DocumentTitle';

function AboutPage() {
    DocumentTitle("About BreachPalace")
    return (
      <div>
        <TopBar />
        <ContainerComponent />
        <Background />
      </div>
    );
  }
  
  export default AboutPage;