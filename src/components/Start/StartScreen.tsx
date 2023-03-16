import "./StartScreen.css";
import TableList from "./TableList";


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

    return (
        <div className="beans">
            <div className="grid-container">
                <div className="start-title grid-item">
                    <h1 className="start-h1">Live Tables</h1>
                </div>
                <div className="menu-container grid-item">
                    <TableList/>
                </div>
            </div>
        </div>
    )
}

export default StartScreen;