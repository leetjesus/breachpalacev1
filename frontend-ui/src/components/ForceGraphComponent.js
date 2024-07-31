import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as THREE from 'three';
import SpriteText from 'three-spritetext';
import ForceGraph3D from '3d-force-graph';
import './interactive.css'; 

// Import images
import leakImage from '../assets/leak.png';
import atSignImage from '../assets/at-sign.png'; 

const ForceGraphComponent = () => {
  const containerRef = useRef(null);
  const [infoBoxVisible, setInfoBoxVisible] = useState(false);
  const [nodeData, setNodeData] = useState({});

  const distance = 120;
  // change this base on page load
  const email_name = 'jesus@gmail.com';
  
  // Change this end-point
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/dataread')
      .then(response => {
        creatingGraph(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const creatingGraph = (data) => {
    const Graph = ForceGraph3D()(containerRef.current)
      .graphData(data)
      .linkColor(() => 'white')
      .nodeColor(() => 'white')
      .backgroundColor('#000000')
      .enableNodeDrag(false)
      .enableNavigationControls(true)
      .cameraPosition({ z: distance })
      .linkDirectionalParticles(4)
      .linkDirectionalParticleWidth(1.5)
      .linkDirectionalParticleSpeed(0.004)
      .onNodeClick(node => {
        setNodeData({
          name: node.name,
          id: node.id,
          type: node.type,
          data: node.data
        });
        setInfoBoxVisible(true);

        const distance = 40;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
        const newPos = node.x || node.y || node.z
          ? { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }
          : { x: 0, y: 0, z: distance };

        Graph.cameraPosition(
          newPos,
          node,
          3000,
        );
      })
      
      .onBackgroundClick(() => {
        setInfoBoxVisible(false);
      })

      .nodeThreeObject(node => {
        const textureLoader = new THREE.TextureLoader();
        const imageSprite = new THREE.Sprite();

        // Determine which image to load based on the node id
        const imageToLoad = node.id === email_name ? atSignImage : leakImage;

        textureLoader.load(imageToLoad, (texture) => {
          imageSprite.material = new THREE.SpriteMaterial({ map: texture });
        });

        imageSprite.scale.set(10, 10, 1);

        const textSprite = new SpriteText(node.name);
        textSprite.color = 'white';
        textSprite.textHeight = 2;
        textSprite.position.set(0, -7, 0);

        const group = new THREE.Group();
        group.add(imageSprite);
        group.add(textSprite);

        return group;
      });
  };

  return (
    <div>
      <div id="infoBox" className={infoBoxVisible ? 'visible' : ''}>
        <h2>Data breach Info</h2>
        <p>Name: {nodeData.name}</p>
        <p>ID: {nodeData.id}</p>
        <p>Type: {nodeData.type}</p>
        <p>Data: {nodeData.data}</p>
      </div>
      <div id="container" ref={containerRef}></div>
    </div>
  );
};

export default ForceGraphComponent;
