import { Card52 } from "../../../model/Card52";
import Card from "../Card/Card";
import { BlackjackPlayerInfo } from "../../../model/BlackjackPlayerInfo";
import { useEffect, useState } from "react";

function Player({ cards, playerName, handValue, endGameState }:BlackjackPlayerInfo) {

    const [endState, setEndState] = useState<string>("");

    useEffect(() => {
        switch (endGameState) {
            case "STILL_PLAYING":
                setEndState("");
                break;
            case "IS_BUSTED":
            case "LOST_TO_DEALER":
                setEndState("You Lost");
                break;
            case "DEALER_BUSTED":
            case "BLACKJACK":
            case "BEAT_DEALER":
                setEndState("You Won!");
                break;
            case "TIED_DEALER":
                setEndState("You Tied")
                break;
            default:
                setEndState("IDK man");
        }
    }, [endGameState])

    return (
        <>
            <div className="cardSection">
                {cards.map((card:Card52, index:number) => (
                    <Card key={index} card={card} index={index}/>
                ))}
            </div>
            {cards.length != 0 && (
            <div className="countContainer">
                <div className="countBox">
                    <div className="countLabel">{playerName}</div>
                    <div className="countValue">{handValue}</div>
                    <div className="endState">{endState}</div>
                </div>
            </div>
            )}
        </>
    )
}

export default Player;