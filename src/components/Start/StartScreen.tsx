import "./StartScreen.css";
import TableList from "./TableList";
import { Link } from "react-router-dom";
import { useState } from "react";
import CreateNewGameForm from "../CreateNewGame/CreateGame";
import Modal from "react-modal";



function StartScreen() {

    /* Will need an API fetch to retrieve all available lobbies and display them*/
    const [openModal, setOpenModal] = useState(false);

    const setOpenModaltoTrue = () => {
        setOpenModal(true);
    }


    return (
        <div className="bg">
            <div className="grid-container beans">
                <Modal className="modal" isOpen={openModal} onRequestClose={() => setOpenModal(false)}>
                    <CreateNewGameForm />
                </Modal>
                <div className="start-title grid-item">
                    <h1 className="start-h1">Live Tables</h1>
                </div>
                <div className="menu-container grid-item">
                    <TableList />
                </div>
                <div className="new-game-btn grid-item"><button onClick={setOpenModaltoTrue} className="new-game-btn">CREATE NEW TABLE</button></div>

            </div>
        </div>
    )
}

export default StartScreen;