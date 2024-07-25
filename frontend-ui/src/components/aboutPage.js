import React from 'react';
import TopBar from './topbar';
import ContainerComponent from './aboutContainer';
import Background from './background';

function AboutPage() {
    return (
      <div>
        <TopBar />
        <ContainerComponent />
        <Background />
      </div>
    );
  }
  
  export default AboutPage;