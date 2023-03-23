interface ButtonProps {
    handleHit: () => void,
    handleStand: () => void
}

function HitOrStand({ handleHit, handleStand }:ButtonProps) {
    return (
        <div>
            <button className="hit-btn" onClick={handleHit}>Hit</button>
            <button className="stand-btn" onClick={handleStand}>Stand</button>
        </div>
    )
}

export default HitOrStand;