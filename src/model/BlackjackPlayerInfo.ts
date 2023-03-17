import { Card52 } from "./Card52"

export class BlackjackPlayerInfo {
    endGameState: string;
    playerName: string;
    hasTakenTurn: boolean;
    cards: Card52[];

    constructor(endGameState: string, playerName: string, hasTakenTurn: boolean, cards: Card52[]) {
        this.endGameState = endGameState;
        this.playerName = playerName;
        this.hasTakenTurn = hasTakenTurn;
        this.cards = cards;
    }
};