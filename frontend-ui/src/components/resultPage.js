import React from 'react';
import TopBar from './topbar';
import ForceGraphComponent from './ForceGraphComponent.js';
import DocumentTitle from './DocumentTitle';

function ResultPage() {
    DocumentTitle("Results!")
    return (
      <div>
        <TopBar />
        <ForceGraphComponent />
      </div>
    );
  }
  
  export default ResultPage;