export class GameRepresentation {
    gameType: string;
    gameId: string;
    gameName: string;
    numActivePlayers: number;
    numMaxPlayers: number;
    numWaitingPlayers: number

    constructor(
        gameType: string,
        gameId: string,
        gameName: string,
        numActivePlayers: number,
        numMaxPlayers: number,
        numWaitingPlayers: number) {
        this.gameType = gameType;
        this.gameId = gameId;
        this.gameName = gameName;
        this.numActivePlayers = numActivePlayers;
        this.numMaxPlayers = numMaxPlayers;
        this.numWaitingPlayers = numWaitingPlayers;
    }
}