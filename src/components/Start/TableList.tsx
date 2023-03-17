import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TableList.css";
import Table from "./Table";
import axios, { AxiosRequestConfig } from "axios";
import { GameRepresentation } from "../../model/GameRepresentation";
import { BASE_URL, GAME_PORT } from "../../static/defaults";


function TableList() {
    const [games, setGames] = useState<GameRepresentation[] | null>(null);
    const navigate = useNavigate();

    const loadAllTables = () => {
        //Connor's useEffect code vv
        const requestConfig: AxiosRequestConfig = {
            baseURL: `http://${BASE_URL}:${GAME_PORT}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const PATH = '/allGames';

        axios.get<GameRepresentation[]>(PATH, requestConfig)
        .then( (res) => {setGames(res.data); console.log(res.data);
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