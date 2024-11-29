import React from 'react';
import './NobreachContainer.css'; // Import the CSS file

const NoBreachContainer = () => {
    return (
        <div className="nobreachContainer">
            <div className="contentWrapper">
                <h1>
                    <span className="emoji">🎉</span> 
                    Congrats!
                </h1>
                <p>Congratulations, your email wasn't found within our list of databases.</p>
            </div>
        </div>
    );
};

export default NoBreachContainer;
