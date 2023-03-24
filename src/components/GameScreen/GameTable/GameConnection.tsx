import { Client } from "@stomp/stompjs";
import { AxiosRequestConfig } from "axios";
import { request } from "http";
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
    debug: (msg) => {
        console.log(msg);
    }
});

// Helper function to grab jwt from the local storage
const jwt = getJwt();

// DOCUMENTATION NEEDED
export const connectToWebSocket = (playerId: string, setGameState: (state: BlackjackClientGameState) => void) => {
    //let socket = new SockJS(`http://${BASE_URL}:${GAME_PORT}/ws`);
    //console.log(socket);

    //stompClient = over(socket);

    stompClient.onConnect = function (frame) {
        console.log(frame);
        //setIsConnected(true);
        stompClient.subscribe('/user/' + playerId + '/queue', (payload) => {
            let obj = JSON.parse(payload.body);
            console.log(obj);
        });
        stompClient.subscribe('/user/' + playerId + '/game', (payload) => {
            setGameState(JSON.parse(payload.body) as BlackjackClientGameState);
        });
    }

    stompClient.onStompError = function (frame) {
        console.log(frame);
    }

    stompClient.activate();
    // TODO: remove console.log below
    // setIsConnected(true);
    // stompClient.connect({}, () => {
    //     console.log("We're connected!");
    //     onConnected();
    // }, (e: any) => { console.log("Error: " + e) });
};

// DOCUMENTATION NEEDED
export const disconnectFromWebSocket = () => {
    if (stompClient != null) {
        stompClient.deactivate();
        //setIsConnected(false);
    }
}

// DOCUMENTATION NEEDED
export function joinGame(tableId: string | undefined, playerName: string | null, setPlayerId: (id: string) => void) {
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
        .then((res) => {
            setPlayerId(res.data);
        })
        .catch((err) => console.log(err));


}

export const checkIfPlayerIsHost = (tableId: string | undefined, playerId: string | undefined, setIsHost: (arg0: boolean) => void) => {
    const requestConfig: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${jwt}`,
            'gameId': tableId,
            'playerId': playerId,
            'Content-Type': 'application/json'
        }
    }

    const PATH = "/amIHost";

    lobbyClient.get<boolean>(PATH, requestConfig)
        .then((res) => {
            setIsHost(res.data);
            console.log(res.data);
        }).catch((err) => console.log(err));
}

// DOCUMENTATION NEEDED
export const handleStartGame = (tableId: string | undefined, playerId: string | undefined) => {
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
        .then((res) => console.log(res.status))
        .catch((err) => console.log(err));
}

// DOCUMENTATION NEEDED
export const onHitAction = (tableId: string | undefined, playerId: string) => {
    const requestConfig: AxiosRequestConfig = {
        baseURL: `http://${BASE_URL}:${GAME_PORT}`,
        headers: {
            Authorization: `Bearer ${jwt}`,
            'gameId': tableId,
            'playerId': playerId,
            'actionVerb': "HIT",
            'Content-Type': 'application/json'
        }
    }

    const PATH = '/blackjackAction';

    lobbyClient.put(PATH, {
        tableId
    }, requestConfig)
        .catch((err) => console.log(err));
}

// DOCUMENTATION NEEDED
export const onStandAction = (tableId: string | undefined, playerId: string) => {
    const requestConfig: AxiosRequestConfig = {
        baseURL: `http://${BASE_URL}:${GAME_PORT}`,
        headers: {
            Authorization: `Bearer ${jwt}`,
            'gameId': tableId,
            'playerId': playerId,
            'actionVerb': "STAND",
            'Content-Type': 'application/json'
        }
    }

    const PATH = '/blackjackAction';

    lobbyClient.put(PATH, {
        tableId
    }, requestConfig)
        .catch((err) => console.log(err));
}

export const leaveGame = (tableId: string | undefined, playerId: string) => {
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
        .catch((err) => console.log(err));
}