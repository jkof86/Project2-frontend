interface ButtonProps {
    handleDisconnect: () => void
}

function DisconnectButton({handleDisconnect}:ButtonProps) {
    return (
        <>
            <button className="disconnect-btn" onClick={handleDisconnect}>Disconnect</button>
        </>
    )
}

export default DisconnectButton;