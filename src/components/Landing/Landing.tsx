import React from "react";
import {Link} from 'react-router-dom';
import './Landing.css';


const Landing: React.FC = () => {
    return (
        <div className="background">
        <div className="landing-container">
        <div className="landing-card">
            <h1> Welcome High Roller! Please either login or register below to start the fun!</h1>
            <ul>
            <Link to="/Registration" className="button-link">
              <button className="button">Register</button>
            </Link>
            <Link to="/Login" className="button-link">
              <button className="button">Login</button>
            </Link>
            </ul>
        </div>
        </div>
        </div>
    );
};

export default Landing; 