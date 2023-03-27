import "./StartScreen.css";
import TableList from "./TableList";
import { useState } from "react";
import CreateNewGameForm from "../CreateNewGame/CreateGame";
import Modal from "react-modal";



function StartScreen() {

    /* Will need an API fetch to retrieve all available lobbies and display them*/
    const [openModal, setOpenModal] = useState(false);

    const handleButton = () => {
        setOpenModal(!openModal);
    }


    return (
        <div className="bg">
            <div className="grid-container beans">
                <div className="start-title grid-item">
                    <h1 className="start-h1">Live Tables</h1>
                </div>
                <div className="new-game-btn grid-item"><button onClick={handleButton} className="new-game-btn">
                    {openModal ? "CHOOSE EXISTING TABLE" : "CREATE NEW TABLE"}
                    </button>
                </div>
                <div className="menu-container grid-item">
                    {openModal ? <CreateNewGameForm/> : <TableList />}
                </div>

            </div>
        </div>
    )
}

export default StartScreen;