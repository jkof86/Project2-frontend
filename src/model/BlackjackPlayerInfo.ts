import { Card52 } from "./Card52"

export class BlackjackPlayerInfo {
    endGameState: string;
    playerName: string;
    hasTakenTurn: boolean;
    cards: Card52[];
    handValue: number;
    isHost: boolean;

    constructor(endGameState: string, playerName: string, hasTakenTurn: boolean, cards: Card52[], handValue: number, isHost:boolean) {
        this.endGameState = endGameState;
        this.playerName = playerName;
        this.hasTakenTurn = hasTakenTurn;
        this.cards = cards;
        this.handValue = handValue;
        this.isHost = isHost;
    }
};