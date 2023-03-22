import { Card52 } from "../../../model/Card52";
import { createElement } from 'react';

interface PlayerProps {
    playerName: string,
    playerTurnOver: boolean,
    playersCards: Card52[],
    cardsDealt: boolean
}

function Player({playerName, playerTurnOver, playersCards, cardsDealt}:PlayerProps) {

    const calculateHand = (cards:Card52[]) => {
        let count = 0;
        let hasAce = false;
      
        for (let i = 0; i < cards.length; i++) {
          //have to figure out how to do this with connor's stuff
          //if (!cards[i].facingUp) continue;
      
          const rank = cards[i].rank;
      
          if (rank === "Ace") {
            hasAce = true;
            continue;
          }
      
          if (rank === "King" || rank === "Queen" || rank === "Jack") {
            count += 10;
          } else {
            count += parseInt(rank);
          }
        }
      
        if (hasAce && count + 10 <= 21) {
          count += 10;
        }
      
        return count;
    }

    return (
        <div className="player">
            <div className="playerName">{playerName}</div>
            <div className="playerCards">
                <div className="cardSection">
                {playersCards.map((card, index) => (
                    <div key={index} className="cardWrapper">
                        <img src={card.getCardImage()}/>
                        {/* {createElement('card-t', {rank: card.rank, suit: card.suit, suitcolor: "#DCE0D9, #FF3131, #FF3131, #DCE0D9", bordercolor:"#6D7275", borderradius:"12", borderline:"2", courtcolors: "#FF3131, #FF3131, #DCE0D9, #DCE0D9, #DCE0D9, 7"}, null)} */}
                        {/* <cardt rank={card.rank} suit={card.suit} suitcolor = "#DCE0D9, #FF3131, #FF3131, #DCE0D9" bordercolor="#6D7275" borderradius="12" borderline="2" courtcolors = "#FF3131, #FF3131, #DCE0D9, #DCE0D9, #DCE0D9, 7"/> */}
                    </div>
                ))}
                </div>
                {cardsDealt && (
                <div className="countContainer">
                    <div className="countBox">
                    <div className="countLabel">Player</div>
                    <div className="countValue">{calculateHand(playersCards)}</div>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default Player;