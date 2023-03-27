import "./LoadScreen.css";
import DisconnectButton from '../Buttons/DisconnectButton';
import { leaveGame, disconnectFromWebSocket } from '../GameTable/GameConnection';
import { useNavigate } from 'react-router-dom';

function LoadScreen(props: any) {
  const navigate = useNavigate();

  const disconnect = () => {
    props.setIsConnected(false);
    leaveGame(props.tableId, props.playerId);
    disconnectFromWebSocket();
    navigate("/app");
  }

  return (
    <div className="loadscreen">
      <div className="loadscreen-div">
        <h1 className="load-header">Loading next round...</h1>        
      </div>
      <DisconnectButton handleDisconnect={disconnect} />
    </div>)
}

export default LoadScreen;