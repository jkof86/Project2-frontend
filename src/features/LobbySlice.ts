import { createSlice , PayloadAction } from "@reduxjs/toolkit"; 

interface Lobby {
    gameId: number;
}

interface LobbyList {
    [gameID: number]: Lobby;
}

interface LobbyState {
    lobbyList: LobbyList | null;
}

const initialState: LobbyState = {
    lobbyList: null
} 

export const lobbySlice = createSlice({
    name: "lobbies", 
    initialState,
    reducers: {
        loadLobbies: (state, action: PayloadAction<{lobbyList: LobbyList}>) => {
            state.lobbyList = (action.payload.lobbyList); 
        }
    }
})

export default lobbySlice.reducer; 
// export const {}