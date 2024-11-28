import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as THREE from 'three';
import SpriteText from 'three-spritetext';
import ForceGraph3D from '3d-force-graph';
import './interactive.css';
// Import images
import BreachImage from '../assets/breach.png';
import EmailImage from '../assets/email.png';
import { useParams } from 'react-router-dom';

const ForceGraphComponent = () => {
  const containerRef = useRef(null);
  const infoBoxRef = useRef(null);
  const [infoBoxVisible, setInfoBoxVisible] = useState(false);
  const [nodeData, setNodeData] = useState({});

  const [showHashes, setShowHashes] = useState(false);

  const toggleHashes = () => setShowHashes(!showHashes);

  const distance = 120;
  const { email } = useParams();

  useEffect(() => {
    axios.get('/api/result/' + email)
      .then(response => {
        creatingGraph(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [email]);

  const creatingGraph = (data) => {
    const Graph = ForceGraph3D()(containerRef.current)
      .graphData(data)
      .linkColor(() => 'white')
      .nodeColor(() => 'white')
      .backgroundColor('#272727')
      .enableNodeDrag(false)
      .enableNavigationControls(true)
      .cameraPosition({ z: distance })
      .linkDirectionalParticles(4)
      .linkDirectionalParticleWidth(1.5)
      .linkDirectionalParticleSpeed(0.004)
      .onNodeClick(node => {
        // Update info based on node clicked
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(node.name)) {
          setNodeData({
            name: node.name,
            id: node.id,
            breachdate: '',
            description: '',
            hashes: [],
          });
          document.getElementById("header-id").innerHTML = "Email Info";
          document.getElementById("object-id").innerHTML = "Email: " + node.name; 
          document.getElementById('date-id').style.visibility = 'hidden';
          document.getElementById('description-id').style.visibility = 'hidden';
          document.getElementById('hashes-button').style.visibility = 'hidden';
        } else {
          setNodeData({
            name: node.name,
            id: node.id,
            breachdate: node.BreachDate,
            description: node.description,
            hashes: node.hashes || []
          });
          document.getElementById("header-id").innerHTML = 'Data Breach Info';
          document.getElementById("object-id").innerHTML = 'Data breach: ' + node.name;
          document.getElementById('date-id').style.visibility = 'visible';
          document.getElementById('description-id').style.visibility = 'visible';
          document.getElementById('hashes-button').style.visibility = 'visible';
        }

        setInfoBoxVisible(true);
        setShowHashes(false);

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

        // Determine if it node.id is an email or data breach
        const imageToLoad = node.id.includes('@') ? EmailImage : BreachImage;

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

    const handleResize = () => {
        if (containerRef.current) {
          const { clientWidth, clientHeight } = containerRef.current;
          Graph.width(clientWidth);
          Graph.height(clientHeight);
        }
    };
  
      window.addEventListener('resize', handleResize);
      handleResize(); // Initial call to set the size based on the current window size
  
      // Cleanup on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    };
  
    const handleResizeInfoBox = (e) => {
      const newWidth = e.clientX - infoBoxRef.current.getBoundingClientRect().left;
      infoBoxRef.current.style.width = `${newWidth}px`;
    };

    // Cleanup on unmount
    return (
      <div>
          <div
            id="infoBox"
            ref={infoBoxRef}
            className={infoBoxVisible ? 'visible' : ''}
          >
          <h2 id="header-id">Data Breach Info</h2>
          <p id="object-id">Email: {nodeData.id || ''}</p>
          <p id="date-id">Breach Date: {nodeData.breachdate}</p>
          <p id="description-id">Description: {nodeData.description}</p>
  
          {/* Dropdown button to show/hide hashes */}
          <button id='hashes-button' onClick={toggleHashes}>
            {showHashes ? 'Hide Hashes' : 'Show Hashes'}
          </button>
  
          {showHashes && (
            <div id="hashes">
              <p>Hashes:</p>
              <ul>
                {nodeData.hashes.map((hash, index) => (
                  <li key={index}>{hash}</li>
                ))}
              </ul>
            </div>
          )}
          <button
            className="resize-arrow"
            onMouseDown={(e) => {
              e.preventDefault(); // Prevent text selection
              document.addEventListener('mousemove', handleResizeInfoBox);
              document.addEventListener('mouseup', () => {
              document.removeEventListener('mousemove', handleResizeInfoBox);
                }, { once: true });
              }}
              >
            ❮
        </button>
        </div>
        <div id="container" ref={containerRef}></div>
      </div>
    );
};

export default ForceGraphComponent;
