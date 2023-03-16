import { createSlice , PayloadAction } from "@reduxjs/toolkit"; 

//Below is for later when I can finally retrieve existing games data from servers
interface Table {
    gameId: number;
}

interface TableList {
    [gameID: number]: Table;
}

interface TableState {
    tableList: TableList | null;
}

// interface TableState {
//     tableList: [],
// }

const initialState: TableState = {
    tableList: [],
} 

export const tableSlice = createSlice({
    name: "tables", 
    initialState,
    reducers: {
        loadTables: (state, action: PayloadAction<{tableList: TableList}>) => {
            state.tableList = (action.payload.tableList); 
        },
        // addTable: (state, action: PayloadAction<any>) => {
        //     state.value.push(action.payload); 
        // } 
    }
})

export default tableSlice.reducer; 
// export const { addTable } = tableSlice.actions;