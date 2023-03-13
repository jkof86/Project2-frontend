import "./StartScreen.css"; 
import { Link } from "react-router-dom";
import { useState } from "react";


function StartScreen() {
    
    /* At a later time, add redirects for other game choices 
    When game starts, will need to generate a way to have others join an existing game */

    interface Lobby {
        gameId: number; 
    }

    const [state, setState] = useState({
        gameLobbies: [{
            gameId: 0
        }]
    }); 

    
    const loadExistingLobbies() {
        
    }; 

    return (<div>
        <Link to="/game"><button>START BLACKJACK</button></Link>
        <button>OTHER GAME</button>
        <button>OTHER GAME</button>
    </div>)
}

export default StartScreen;