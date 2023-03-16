import "./StartScreen.css";
import TableList from "./TableList";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";



function StartScreen() {

    /* Will need an API fetch to retrieve all available lobbies and display them 

    
    const loadExistingLobbies() {
        
    }; */

    return (
        <div>
            <h1 className="start-h1">Choose a Table</h1>
            <div className="beans">
                <div className="grid-container">
                    <div className="menu-container grid-item">
                        <TableList />
                    </div>
                </div>
                <div><Link to="/creategame"><button className="new-game-btn">CREATE NEW GAME</button></Link></div>
            </div>
            
                
            
        </div>
    )
}

export default StartScreen;