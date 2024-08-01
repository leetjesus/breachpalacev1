import React from 'react';
import TopBar from './topbar';
import Container from './container';
import Background from './background';
import DocumentTitle from './DocumentTitle';

function HomePage() {
  DocumentTitle("BreachPalace")
  return (
    <div>
      <TopBar />
      <Container />
      <Background />
    </div>
  );
}

export default HomePage;
