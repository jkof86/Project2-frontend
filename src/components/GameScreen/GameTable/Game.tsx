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

// This component renders the BlackJack Game
const Game = () => {
  // React Hook for Redirecting
  const navigate = useNavigate();
  // Redux Store for Username
  const username = useAppSelector((state: RootState) => state.auth.username);

  // Local State:
  const [playerId, setPlayerId] = useState<string>("");
  const [gameState, setGameState] = useState<BlackjackClientGameState>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [playerList, setPlayerList] = useState<BlackjackPlayerInfo[]>();
  const [thisPlayer, setThisPlayer] = useState<BlackjackPlayerInfo>();
  // const [queueState, setQueueState] = useState<QueueState>();


  // Keeps track of the tableId which is in the URL
  let { tableId } = useParams();

  // Persistent playerId for leaving games when the component unmounts
  let persistId:string = "";
  const setPersistId = (id: string):void => {
    persistId = id;
  }


  // Deals the cards when start game is pressed
  const [cardsDealt, setCardsDealt] = useState(false);
  const dealCards = () => {
    setCardsDealt(true);
    console.log("playerId: " + playerId);
    handleStartGame(tableId, playerId);
  };

  // ================ These are the game button functions =====================

  const handleHit = () => {
    onHitAction(tableId, playerId);
  }

  const handleStand = () => {
    setCardsDealt(false);
    onStandAction(tableId, playerId);
  }

  // ==========================================================================

  // Leaves the game and routes to /app when disconnect button is clicked
  const disconnect = () => {
    setIsConnected(false);
    leaveGame(tableId, playerId);
    disconnectFromWebSocket();
    navigate("/app");
  }

  // Joins the game immediately
  useEffect(() => {
    // First, we join the game. This gives us a player token.
    joinGame(tableId, username, setPlayerId);
    // Next, we subscribe to the two endpoints, to get game state and queue position updates.
    // We do these at the same time because a player may automatically be moved from the queue to the game.
    // setPlayerId() (which triggers connectToWebSocket() below) is called from inside of joinGame because it must be done asynchronously.
  }, []);

  // Initializes the game connection when playerId changes (only when the websocket loads the gamestate the first time)
  useEffect(() => {
    if(playerId === '') return;
    setPersistId(playerId);
    console.log("persistId: " + persistId);
    console.log("playerId: " + playerId);
    connectToWebSocket(playerId, setGameState);
    setIsConnected(true);
  }, [playerId]);

  // Updates the local state when gameState changes come from the websocket
  useEffect(() => {
    if(gameState == undefined ) return;
    setPlayerList(gameState.players);
    setThisPlayer(gameState.players[0]);
  }, [gameState])

  // Leaves the game whenever we exit the page
  useEffect(() => {
    return () => {
      leaveGame(tableId, persistId);
      disconnectFromWebSocket();
    }
  }, [])

  return (
    <div className="gameBoard">
      <Dealer dealersCards={gameState?.dealersCards} dealerHandValue={gameState?.dealerHandValue}/>
      <div className='players-list'>
        {playerList?.map((player:BlackjackPlayerInfo) => (
              <Player key={player.playerName} {...player}/>
          ))
        }
      </div>
      {
        cardsDealt && !thisPlayer?.hasTakenTurn ?
        <HitOrStand handleHit={handleHit} handleStand={handleStand} />:
        <StartGameButton handleGameStart={dealCards}/>
      }
      {
        isConnected && 
          <DisconnectButton handleDisconnect={disconnect} />
      }
    </div>
  );
};

export default Game;