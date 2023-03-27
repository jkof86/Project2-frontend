export class QueueState {
    positionInQueue: number;
    numWaitingPlayers: number;

    constructor(positionInQueue: number, numWaitingPlayers: number) {
        this.positionInQueue = positionInQueue;
        this.numWaitingPlayers = numWaitingPlayers;
    }
} 