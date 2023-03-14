import "./StartScreen.css"; 
import { Link } from "react-router-dom";
import { useState } from "react";


function StartScreen() {
    
    /* At a later time, add redirects for other game choices 
    When game starts, will need to generate a way to have others join an existing game */

    /*interface Lobby {
        gameId: number; 
    }

    const [state, setState] = useState({
        gameLobbies: [{
            gameId: 0
        }]
    }); 

    
    const loadExistingLobbies() {
        
    }; */

    return (<div className="beans">
        <h1>Shuffle the deck...</h1>
    <div className="grid-container">
        <div className="grid-item">LOBBY 1</div>
        <Link to="/game"><button>START GAME</button></Link>
        <div className="grid-item">LOBBY 2</div>
        <Link to="/game"><button>JOIN LOBBY</button></Link>
        <div className="grid-item">LOBBY 3</div>
        <Link to="/game"><button>JOIN LOBBY</button></Link>
    </div>
    </div>)
}

export default StartScreen;