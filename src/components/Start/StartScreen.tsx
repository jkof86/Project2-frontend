import "./StartScreen.css"; 
import { Link } from "react-router-dom";


function StartScreen() {
    
    /* At a later time, add redirects for other game choices 
    When game starts, will need to generate a way to have others join an existing game */
    
    return (<div>
        <Link to="/demo"><button>START BLACKJACK</button></Link>
        <button>OTHER GAME</button>
    </div>)
}

export default StartScreen;