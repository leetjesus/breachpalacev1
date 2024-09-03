import React from 'react';
import './NobreachContainer.css'; // Import the CSS file
import congratsEmoji from '../assets/congrats.png';
import { LazyLoadImage } from "react-lazy-load-image-component";

const NoBreachContainer = () => {
    return (
        <div className="nobreachContainer">
            <h1>Congrats!<LazyLoadImage src={congratsEmoji}
                width={50} height={30}
                alt="Image Alt"
            /></h1>
            <p>Congratulations! No breached accounts were found associated with this email.</p>
        </div>
    );
};

export default NoBreachContainer;