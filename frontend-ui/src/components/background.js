import React, { useEffect, useRef } from 'react';
import ForceGraph3D from '3d-force-graph';
import './background.css'; 

const Background = () => {
  const graphRef = useRef(null);
  const graphInstance = useRef(null);

  useEffect(() => {
    const N = 300;
    const gData = {
      nodes: [...Array(N).keys()].map(i => ({ id: i })),
      links: [...Array(N).keys()]
        .filter(id => id)
        .map(id => ({
          source: id,
          target: Math.round(Math.random() * (id - 1))
        }))
    };
    const distance = 1400;

    const container = graphRef.current;
    graphInstance.current = ForceGraph3D()
      (container)
      .enableNodeDrag(false)
      .enableNavigationControls(false)
      .showNavInfo(false)
      .nodeColor(() => 'white')
      .linkColor(() => 'white')
      .backgroundColor('#121212')
      .cameraPosition({ z: distance })
      .graphData(gData);

    // Camera orbit
    let angle = 0;
    const interval = setInterval(() => {
      graphInstance.current.cameraPosition({
        x: distance * Math.sin(angle),
        z: distance * Math.cos(angle)
      });
      angle += Math.PI / 300;
    }, 10);

    // Handle window resize
    const handleResize = () => {
      if (container) {
        const { clientWidth, clientHeight } = container;
        graphInstance.current.width(clientWidth);
        graphInstance.current.height(clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call to set the size based on the current window size

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      graphInstance.current = null; // Clear the reference
    };
  }, []);

  return (
    <div id="3d-graph" ref={graphRef} style={{ width: '100vw', height: '100vh' }}></div>
  );
};

export default Background;
