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
        <div className="bg">
            <div className="grid-container beans">
                <div className="start-title grid-item">
                    <h1 className="start-h1">Live Tables</h1>
                </div>
                <div className="menu-container grid-item">
                    <TableList />
                </div>
                <div className="new-game-btn grid-item"><Link to="/creategame"><button className="new-game-btn">CREATE NEW TABLE</button></Link></div>
            </div>
        </div>
    )
}

export default StartScreen;