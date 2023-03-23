interface ButtonProps {
    handleGameStart: () => void
}

function StartGameButton({handleGameStart}:ButtonProps) {
    return (
        <>
            <button className="game-button" onClick={handleGameStart}>Start Game</button>
        </>
    )
}

export default StartGameButton;