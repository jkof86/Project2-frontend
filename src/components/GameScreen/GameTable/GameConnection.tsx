import { Client } from "@stomp/stompjs";
import { AxiosRequestConfig } from "axios";
import { BlackjackClientGameState } from "../../../model/BlackjackClientGameState";
import { QueueState } from "../../../model/QueueState";
import { BASE_URL, GAME_PORT } from "../../../static/defaults";
import { getJwt } from "../../../util/getJwt";
import lobbyClient from "../../../util/lobbyClient";

// DOCUMENTATION NEEDED
export const stompClient: Client = new Client({
    brokerURL: `ws://${BASE_URL}:${GAME_PORT}/ws`,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    // debug: (msg) => {
    //     console.log(msg);
    // }
});

// Helper function to grab jwt from the local storage
const jwt = getJwt();

// DOCUMENTATION NEEDED
export const connectToWebSocket = (playerId:string, setGameState:(state: BlackjackClientGameState)=>void) => {

    stompClient.onConnect = function (frame) {
        //console.log(frame);
        stompClient.subscribe('/user/' + playerId + '/queue', (payload) => { 
            let obj = JSON.parse(payload.body);
            console.log(obj);
        });
        stompClient.subscribe('/user/' + playerId + '/game', (payload) => { 
            console.log(payload.body);
            setGameState(JSON.parse(payload.body) as BlackjackClientGameState);
            console.log("Bigass blob:", JSON.parse(payload.body) as BlackjackClientGameState);
        });
    }
    
    stompClient.onStompError = function (frame) {
        console.log(frame);
    }

    stompClient.activate();
};

// DOCUMENTATION NEEDED
export const disconnectFromWebSocket = () => {
    if (stompClient != null) {
        stompClient.deactivate();
    }
}

// DOCUMENTATION NEEDED
export function joinGame(tableId:string|undefined, playerName:string|null, setPlayerId:(id: string)=>void) {
    const requestConfig: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${jwt}`,
            'gameId': tableId,
            'username': playerName,
            'Content-Type': 'application/json'
        }
    }

    const PATH = '/joinBlackjackGame';

    lobbyClient.put<string>(PATH, {
    tableId
    }, requestConfig)
    .then( (res) => {
        setPlayerId(res.data);
    })
    .catch( (err) => console.log(err));
}

// DOCUMENTATION NEEDED
export const amIHost = (tableId:string|undefined, playerId:string|undefined, setIsHost:(isHost:boolean)=>void) => {
    const requestConfig: AxiosRequestConfig = {
        baseURL: `http://${BASE_URL}:${GAME_PORT}`,
        headers: {
            Authorization: `Bearer ${jwt}`,
            'playerId': playerId,
            'gameId': tableId,
            'Content-Type': 'application/json'
        }
    }

    const PATH = '/amIHost';

    lobbyClient.get(PATH, requestConfig)
    .then( (response) => {
        console.log(response.data);
        const isHost: boolean = response.data;
        setIsHost(isHost);
    })
    .catch( (err) => console.log(err));
}

// DOCUMENTATION NEEDED
export const handleStartGame = (tableId:string|undefined, playerId:string|undefined) => {
    const requestConfig: AxiosRequestConfig = {
        baseURL: `http://${BASE_URL}:${GAME_PORT}`,
        headers: {
            Authorization: `Bearer ${jwt}`,
            'playerId': playerId,
            'gameId': tableId,
            'Content-Type': 'application/json'
        }
    }

    const PATH = '/startBlackjackGame';

    lobbyClient.put(PATH, {
    tableId
    }, requestConfig)
    .then( (res) => console.log(res.status))
    .catch( (err) => console.log(err));
}

// DOCUMENTATION NEEDED
export const onHitAction = (tableId:string|undefined, playerId:string) => {
    const requestConfig: AxiosRequestConfig = {
        baseURL: `http://${BASE_URL}:${GAME_PORT}`,
        headers: {
            Authorization: `Bearer ${jwt}`,
            'gameId': tableId,
            'playerId': playerId,
            'actionVerb':"HIT",
            'Content-Type': 'application/json'
        }
    }

    const PATH = '/blackjackAction';

    lobbyClient.put(PATH, {
    tableId
    }, requestConfig)
    .catch( (err) => console.log(err));
}

// DOCUMENTATION NEEDED
export const onStandAction = (tableId:string|undefined, playerId:string) => {
    const requestConfig: AxiosRequestConfig = {
        baseURL: `http://${BASE_URL}:${GAME_PORT}`,
        headers: {
            Authorization: `Bearer ${jwt}`,
            'gameId': tableId,
            'playerId': playerId,
            'actionVerb':"STAND",
            'Content-Type': 'application/json'
        }
    }

    const PATH = '/blackjackAction';

    lobbyClient.put(PATH, {
    tableId
    }, requestConfig)
    .catch( (err) => console.log(err));
}

export const leaveGame = (tableId:string|undefined, playerId:string) => {
    const requestConfig: AxiosRequestConfig = {
        baseURL: `http://${BASE_URL}:${GAME_PORT}`,
        headers: {
            Authorization: `Bearer ${jwt}`,
            'gameId': tableId,
            'playerId': playerId,
            'Content-Type': 'application/json'
        }
    }

    const PATH = '/leaveBlackjackGame';

    lobbyClient.delete(PATH, requestConfig)
    .catch( (err) => console.log(err));
}