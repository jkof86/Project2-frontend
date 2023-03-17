import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TableList.css";
import Table from "./Table";
import axios, { AxiosRequestConfig } from "axios";
import { GameRepresentation } from "../../model/GameRepresentation";
import { BASE_URL, GAME_PORT } from "../../static/defaults";


// const fakeTables:TableProps[] = [{
//     name: "Jason's Table",
//     id: 0,
//     numberOfPlayers: 3
// },
// {
//     name: "Sus Table",
//     id: 1,
//     numberOfPlayers: 1
// },
// {
//     name: "Bingus Table",
//     id: 2,
//     numberOfPlayers: 5
// },
// {
//     name: "Cars Table",
//     id: 3,
//     numberOfPlayers: 4
// },
// {
//     name: "Frozen Table",
//     id: 4,
//     numberOfPlayers: 2
// },
// {
//     name: "Toy Story Table",
//     id: 5,
//     numberOfPlayers: 3
// },
// {
//     name: "Incredibles Table",
//     id: 6,
//     numberOfPlayers: 1
// },
// {
//     name: "Dinner Table",
//     id: 7,
//     numberOfPlayers: 4
// },
// {
//     name: "Rela Table",
//     id: 8,
//     numberOfPlayers: 5
// }];

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
    }, []);

    return (
        <div className="dropdown-menu">
            <div className="dropdown-title">Table List</div>
            <div className="dropdown-list">
                {games?.map((table:GameRepresentation) => (
                        <Table key={table.gameId} name={table.gameName} id={table.gameId} numberOfPlayers={table.numActivePlayers} handleJoin={handleJoin} />
                    ))
                }
            </div>
        </div>
    )
}

export default TableList;