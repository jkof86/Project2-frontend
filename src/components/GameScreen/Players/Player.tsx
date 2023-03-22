import { Card52 } from "../../../model/Card52";
import { createElement } from 'react';
import Card from "../Card/Card";
import { BlackjackPlayerInfo } from "../../../model/BlackjackPlayerInfo";

function Player({ cards, playerName, handValue}:BlackjackPlayerInfo) {

    console.log(cards);

    return (
        <div className="player">
            <div className="playerName">{playerName}</div>
            <div className="playerCards">
                <div className="cardSection">
                {cards.map((card:Card52, index:number) => (
                    <Card key={index} card={card}/>
                ))}
                </div>
                {cards.length != 0 && (
                <div className="countContainer">
                    <div className="countBox">
                    <div className="countLabel">{playerName}</div>
                    <div className="countValue">{handValue}</div>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default Player;