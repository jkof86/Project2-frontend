import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BlackjackClientGameState } from '../../../model/BlackjackClientGameState';
import { BlackjackPlayerInfo } from '../../../model/BlackjackPlayerInfo';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import DisconnectButton from '../Buttons/DisconnectButton';
import HitOrStand from '../Buttons/HitOrStand';
import StartGame from '../Buttons/StartGame';
import Dealer from '../Players/Dealer';
import Player from '../Players/Player';
import './Game.css';
import LoadScreen from '../LoadScreen/LoadScreen';
import { amIHost, connectToWebSocket, disconnectFromWebSocket, handleStartGame, joinGame, leaveGame, onHitAction, onStandAction } from './GameConnection';

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
  // const [isHost, setIsHost] = useState<boolean>(false);
  // const [queueState, setQueueState] = useState<QueueState>();
  const [isHost, setIsHost] = useState<boolean>(false);


  // Keeps track of the tableId which is in the URL
  let { tableId } = useParams();

  // Persistent playerId for leaving games when the component unmounts
  let persistId: string = "";
  const setPersistId = (id: string): void => {
    persistId = id;
  }

  // Utility to bring this clients player to the beginning of the list
  const orderPlayerList = (newFirstPlayer:BlackjackPlayerInfo,list:BlackjackPlayerInfo[]):BlackjackPlayerInfo[] => {
    //filter out the player we want at the beginning
    const newList:BlackjackPlayerInfo[] = list.filter(player => player.playerName != newFirstPlayer.playerName);
    newList.unshift(newFirstPlayer);
    return newList;
  }


  // Deals the cards when start game is pressed
  const [cardsDealt, setCardsDealt] = useState(false);
  const dealCards = () => {
    setCardsDealt(true);
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
    amIHost(tableId, playerId, setIsHost); // <--- Upon joining a game, checks if player is host
    // Next, we subscribe to the two endpoints, to get game state and queue position updates.
    // We do these at the same time because a player may automatically be moved from the queue to the game.
    // setPlayerId() (which triggers connectToWebSocket() below) is called from inside of joinGame because it must be done asynchronously.
  }, []);

  // Initializes the game connection when playerId changes (only when the websocket loads the gamestate the first time)
  useEffect(() => {
    if (playerId === '') return;
    setPersistId(playerId);
    connectToWebSocket(playerId, setGameState);
    setIsConnected(true);
    amIHost(tableId, playerId, setIsHost);
  }, [playerId]);

  // Updates the local state when gameState changes come from the websocket
  useEffect(() => {
    console.log(gameState);
    if(gameState == undefined ) return;
    setThisPlayer(gameState.players.find(player => player.playerName == username));
    amIHost(tableId, playerId, setIsHost); //<--- Assuming a player disconnecting is a game state change, checks whether host player has changed
  }, [gameState])

  // This waits for setThisPlayer above ^^ then runs immediately after
  // It has to be this way bc .find() takes a second and otherwise player won't see their own cards
  useEffect(() => {
    if(thisPlayer == undefined || gameState == undefined) return;
    setPlayerList(orderPlayerList(thisPlayer, gameState.players))
    setIsHost(thisPlayer.host);
    console.log("thisPlayerIsHost?: ", thisPlayer.host);
  }, [thisPlayer])

  // Leaves the game whenever we exit the page
  useEffect(() => {
    return () => {
      leaveGame(tableId, persistId);
      disconnectFromWebSocket();
    }
  }, [])

  // If you're not the host and the game has not started yet, you will see loading screen
  if (!isHost && gameState == undefined) {
    return <LoadScreen setIsConnected={setIsConnected} tableId={tableId} playerId={playerId}/> }
  

  return (
    <div className='game-screen'>
      <div className="gameBoard">

        <Dealer dealersCards={gameState?.dealersCards} dealerHandValue={gameState?.dealerHandValue}/>

        {playerList?.map((player:BlackjackPlayerInfo, index:number) => (
            <div key={index} className={"player" + (1+index)}>
              <Player {...player}/>
            </div>
          ))
        }
        
        {((thisPlayer?.endGameState != "STILL_PLAYING") || !thisPlayer) && <StartGame isHost={isHost} handleGameStart={dealCards}/>}
        
      </div>

      {!thisPlayer?.hasTakenTurn &&
      <div className='game-controls'>
        <HitOrStand handleHit={handleHit} handleStand={handleStand} />
      </div>
      }

      <div className='disconnect'>
        {isConnected && <DisconnectButton handleDisconnect={disconnect} />}
      </div>
    </div>
  );
};

export default Game;