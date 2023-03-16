import "./StartScreen.css"; 
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";



function StartScreen() {
    
    /* Will need an API fetch to retrieve all available lobbies and display them */

    

    return (<div className="bg">
    <h1 className="start-title">Shuffle the deck...</h1>
    <div className="beans">
    <div className="grid-container">
        <div className="grid-item">TABLE 1</div>
        <Link to="/game"><button className="start-button">JOIN</button></Link>
        <div className="grid-item">TABLE 2</div>
        <Link to="/game"><button className="start-button">JOIN</button></Link>
        <div className="grid-item">TABLE 3</div>
        <Link to="/game"><button className="start-button">JOIN</button></Link>
    </div>
    <div>
        <Link to="/creategame"><button>CREATE NEW GAME</button></Link>
    </div>
    </div>
    </div>)
}

export default StartScreen;