import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TableList.css";
import Table from "./Table";
import { AxiosRequestConfig } from "axios";
import { GameRepresentation } from "../../model/GameRepresentation";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loadTablesSuccess } from "../../features/TableSlice";
import { RootState } from "../../redux/store";
import lobbyClient from "../../util/lobbyClient";
import { getJwt } from "../../util/getJwt";


function TableList() {
    const [games, setGames] = useState<GameRepresentation[] | null>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const tables = useAppSelector((state: RootState) => state.tables);

    const loadAllTables = async () => {
        const jwt = getJwt();
        if (!jwt) {
            throw new Error("No JWT token found");
        }
        //================== Connor's useEffect code vv ====================
        const requestConfig: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        }

        const PATH = '/allGames';

        lobbyClient.get<GameRepresentation[]>(PATH, requestConfig)
        .then( (response) => {
            const tableList: GameRepresentation[] = response.data;
            setGames(tableList);
            console.log(response.data);
            dispatch(loadTablesSuccess(tableList));
        })
        .catch( (err) => console.log(err));
        
    }

    const handleJoin = (id:string) => {
        navigate('/' + 'blackjack' + '/' + id);
    }

    useEffect(() => {
        loadAllTables();
        games?.map((game: GameRepresentation) => console.log(game))
    }, []);

    return (
        <div className="dropdown-menu">
            <div className="dropdown-title">Table List</div>
            <div className="dropdown-list">
                {games?.map((table:GameRepresentation) => (
                        <Table key={table.gameId} name={table.gameName} id={table.gameId} numberOfPlayers={table.numActivePlayers+table.numWaitingPlayers} handleJoin={handleJoin} />
                    ))
                }
            </div>
        </div>
    )
}

export default TableList;