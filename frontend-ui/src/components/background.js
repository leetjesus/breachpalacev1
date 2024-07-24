// components/Background.js
import React, { useEffect } from 'react';
import ForceGraph3D from '3d-force-graph';
import './background.css'; // Import specific CSS for Background

const Background = () => {
  useEffect(() => {
    // Random tree data
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

    let isRotationActive = true;
    const Graph = ForceGraph3D()
      (document.getElementById('3d-graph'))
      .enableNodeDrag(false)
      .enableNavigationControls(false)
      .showNavInfo(false)
      .nodeColor(() => 'white')
      .linkColor(() => 'white')
      .backgroundColor('#000000')
      .cameraPosition({ z: distance })
      .graphData(gData);

    // Camera orbit
    let angle = 0;
    const interval = setInterval(() => {
      if (isRotationActive) {
        Graph.cameraPosition({
          x: distance * Math.sin(angle),
          z: distance * Math.cos(angle)
        });
        angle += Math.PI / 300;
      }
    }, 10);

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div id="3d-graph"></div>
  );
};

export default Background;
