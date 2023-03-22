import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BlackjackClientGameState } from '../../../model/BlackjackClientGameState';
import { BlackjackPlayerInfo } from '../../../model/BlackjackPlayerInfo';
import { Card52 } from '../../../model/Card52';
import Dealer from '../Players/Dealer';
import Player from '../Players/Player';
import './Game.css';
import { connectToWebSocket, handleStartGame, joinGame } from './GameConnection';



const Game = () => {

  const [dealersCards, setDealersCards] = useState<Card52[]>();

  //const [isConnected, setIsConnected] = useState<boolean>(false);
  const [playerId, setPlayerId] = useState<string>("");
  const [gameState, setGameState] = useState<BlackjackClientGameState>();
  // const [queueState, setQueueState] = useState<QueueState>();

  let { tableId } = useParams();
  const [cardsDealt, setCardsDealt] = useState(false);

  const dealCards = () => {
    setCardsDealt(true);
    handleStartGame(tableId, playerId);
  };

  useEffect(() => {
      // First, we join the game. This gives us a player token.
      joinGame(tableId, setPlayerId);
      // Next, we subscribe to the two endpoints, to get game state and queue position updates.
      // We do these at the same time because a player may automatically be moved from the queue to the game.
      // connect() is called from inside of joinGame because it must be done asynchronously.
  }, []);

  useEffect(() => {
      if(playerId === '') return;
      connectToWebSocket(playerId, setGameState);
  }, [playerId]);

  useEffect(() => {
      if(gameState == undefined ) return;
      setDealersCards(gameState.dealersCards);
  }, [gameState])

  return (
    <div className="gameBoard">
      <Dealer dealersCards={dealersCards} cardsDealt={cardsDealt}/>
      <div className='players-list'>
          {gameState?.players.map((player:BlackjackPlayerInfo) => (
              <Player key={player.playerName} {...player}/>
          ))
        }
      </div>
      {!cardsDealt && <button className="game-button" onClick={dealCards}>Deal</button>}
    </div>
  );
};

export default Game;