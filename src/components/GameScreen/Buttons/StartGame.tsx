import { useEffect, useState } from "react";

interface ButtonProps {
    isHost: boolean | undefined,
    handleGameStart: () => void
}

function StartGame({isHost, handleGameStart}:ButtonProps) {

    return (
        <div className="start-game">
            { !isHost
                ? <h1 className="start-btn">Waiting for Host to Start Game</h1>
                : <button className="start-btn game-button" onClick={handleGameStart}>Start Game</button>
            }
        </div>
    )
}

export default StartGame;