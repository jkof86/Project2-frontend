import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { AxiosError } from "axios";
import { getJwt } from "../util/getJwt";
import lobbyClient from "../util/lobbyClient";
import { GameRepresentation } from "../model/GameRepresentation";

//Below is for later when I can finally retrieve existing games data from servers
interface TableListObject {
    [tableID: number] : GameRepresentation;
}

interface TableState {
    tableList: GameRepresentation[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: TableState = {
    tableList: [],
    status: "idle",
    error: null
} 

interface NewTablePayload {
    gameName: string,
    lobbyIsPrivate: boolean,
}

// export const loadTables = createAsyncThunk(
//     "/allGames",
//     async () => {
//         const jwt = getJwt();
//         if(!jwt){
//             throw new Error("No JWT token found");
//         }

//         try {
//             const response = await lobbyClient.get("/allGames", {
//                 headers: {Authorization: `Bearer ${jwt}`},
//             });
//             console.log(response);
//             console.log(typeof response.data);
//             return response.data;
//         } catch (error) {
//             const err = error as AxiosError;
//             return err.response?.data;
//         }
// })

// export const createNewTable = createAsyncThunk(
//     "/createBlackjackGame",
//     async (payload: NewTablePayload) => {
//         const jwt = getJwt();
//         if(!jwt){
//             throw new Error("No JWT token found");
//         }

//         try {
//             const response = await lobbyClient.post("/createBlackjackGame", {},
//             {
//                 headers: {
//                     Authorization: `Bearer ${jwt}`,
//                     "gameName": payload.gameName,
//                     "lobbyIsPrivate": "" + payload.lobbyIsPrivate,
//                     "Content-Type": 'application/json'
//                 },
//             });
//             console.log(response);
//             return { ...response.data };
//         } catch (error) {
//             const err = error as AxiosError;
//             return err.response?.data;
//         }
// })

export const tableSlice = createSlice({
    name: "tables", 
    initialState,
    reducers: {
        loadTablesSuccess: (
            state,
            action: PayloadAction<GameRepresentation[]>
        ) => {
            state.tableList = action.payload;
            state.error = null;
        },
    },
    // extraReducers:  (builder) => {
    //     builder
    //         .addCase(loadTables.pending, (state) => {
    //             state.status = "loading";
    //         })
    //         .addCase(loadTables.fulfilled, (state, action) => {
    //             console.log(action);

    //             state.status = "succeeded";
    //             state.error = null;
    //             state.tableListObject = action.payload;
                
    //         })
    //         .addCase(loadTables.rejected, (state, action) => {
    //             console.log(action);
    //             state.status = "failed";
    //             state.error = action.error.message || "Something went wrong.";
    //         })
    //         .addCase(createNewTable.pending, (state) => {
    //             state.status = "loading";
    //         })
    //         .addCase(createNewTable.fulfilled, (state, action) => {
    //             console.log(action);
    //             if(action.payload.httpStatus) {
    //                 state.status = "failed";
    //                 state.error = action.payload;
    //             } else {
    //                 state.status = "succeeded";
    //                 state.error = null;
    //             }
    //         })
    //         .addCase(createNewTable.rejected, (state, action) => {
    //             console.log(action);
    //             state.status = "failed";
    //             state.error = action.error.message || null;
    //         })
    // }
});

export const { loadTablesSuccess } = tableSlice.actions;

export default tableSlice.reducer;