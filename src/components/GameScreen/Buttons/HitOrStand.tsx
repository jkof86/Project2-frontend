import './Button.css';

interface ButtonProps {
    handleHit: () => void,
    handleStand: () => void
}

function HitOrStand({ handleHit, handleStand }:ButtonProps) {
    return (
        <>
            <button className="hit-btn game-button" onClick={handleHit}>Hit</button>
            <button className="stand-btn game-button" onClick={handleStand}>Stand</button>
        </>
    )
}

export default HitOrStand;