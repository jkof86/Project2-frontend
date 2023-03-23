import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BlackjackClientGameState } from '../../../model/BlackjackClientGameState';
import { BlackjackPlayerInfo } from '../../../model/BlackjackPlayerInfo';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import DisconnectButton from '../Buttons/DisconnectButton';
import HitOrStand from '../Buttons/HitOrStand';
import StartGameButton from '../Buttons/StartGameButton';
import Dealer from '../Players/Dealer';
import Player from '../Players/Player';
import './Game.css';
import { connectToWebSocket, disconnectFromWebSocket, handleStartGame, joinGame, leaveGame, onHitAction, onStandAction } from './GameConnection';


const Game = () => {
  const navigate = useNavigate();
  const username = useAppSelector((state: RootState) => state.auth.username);

  const [playerId, setPlayerId] = useState<string>("");
  const [gameState, setGameState] = useState<BlackjackClientGameState>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  // const [queueState, setQueueState] = useState<QueueState>();

  let { tableId } = useParams();
  let persistId:string = "";
  const setPersistId = (id: string):void => {
    persistId = id;
  }

  const [cardsDealt, setCardsDealt] = useState(false);
  const dealCards = () => {
    setCardsDealt(true);
    console.log("playerId: " + playerId);
    handleStartGame(tableId, playerId);
  };

  const handleHit = () => {
    onHitAction(tableId, playerId);
  }

  const handleStand = () => {
    onStandAction(tableId, playerId);
  }

  const disconnect = () => {
    setIsConnected(false);
    leaveGame(tableId, playerId);
    disconnectFromWebSocket();
    navigate("/app");
  }

  useEffect(() => {
    // First, we join the game. This gives us a player token.
    joinGame(tableId, username, setPlayerId);
    // Next, we subscribe to the two endpoints, to get game state and queue position updates.
    // We do these at the same time because a player may automatically be moved from the queue to the game.
    // connect() is called from inside of joinGame because it must be done asynchronously.
  }, []);

  useEffect(() => {
    if(playerId === '') return;
    setPersistId(playerId);
    console.log("persistId: " + persistId);
    console.log("playerId: " + playerId);
    connectToWebSocket(playerId, setGameState);
  }, [playerId]);

  useEffect(() => {
    if(gameState == undefined ) return;
  }, [gameState])

  useEffect(() => {
    return () => {
      console.log("Component will unmount");
      leaveGame(tableId, persistId);
      console.log("playerId: " + persistId + " | tableId: " +tableId);
      disconnectFromWebSocket();
    }
  }, [])

  return (
    <div className="gameBoard">
      <Dealer dealersCards={gameState?.dealersCards} dealerHandValue={gameState?.dealerHandValue}/>
      <div className='players-list'>
        {gameState?.players.map((player:BlackjackPlayerInfo) => (
              <Player key={player.playerName} {...player}/>
          ))
        }
      </div>
      {!cardsDealt ?
        <StartGameButton handleGameStart={dealCards}/> :
        <HitOrStand handleHit={handleHit} handleStand={handleStand} />}
      {isConnected && <DisconnectButton handleDisconnect={disconnect} />}
    </div>
  );
};

export default Game;