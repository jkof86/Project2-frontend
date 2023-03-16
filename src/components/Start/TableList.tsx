import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { number } from "yup";
import "./TableList.css";
import Table from "./Table";
import { replace } from "lodash";


const fakeTables:TableProps[] = [{
    name: "Jason's Table",
    id: 0,
    numberOfPlayers: 3
},
{
    name: "Sus Table",
    id: 1,
    numberOfPlayers: 1
},
{
    name: "Bingus Table",
    id: 2,
    numberOfPlayers: 5
},
{
    name: "Cars Table",
    id: 3,
    numberOfPlayers: 4
},
{
    name: "Frozen Table",
    id: 4,
    numberOfPlayers: 2
},
{
    name: "Toy Story Table",
    id: 5,
    numberOfPlayers: 3
},
{
    name: "Incredibles Table",
    id: 6,
    numberOfPlayers: 1
},
{
    name: "Dinner Table",
    id: 7,
    numberOfPlayers: 4
},
{
    name: "Rela Table",
    id: 8,
    numberOfPlayers: 5
}];

interface TableProps {
    name: string,
    id: number,
    numberOfPlayers: number
}

function DropdownMenu() {
    const [tableList, setTableList] = useState<TableProps[]>(
        [{
            name: "Failed to load tables",
            id: 0,
            numberOfPlayers: 5
        }]
    );

    const loadAllTables = () => {
        //Code here to load the tables from the server
        setTableList(fakeTables);
    }

    const navigate = useNavigate();
    const handleJoin = (id:number) => {
        if(id === 1){
            window.location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        } else {
            //navigate("/game");
        }
    }

    useEffect(() => {
        loadAllTables();
    }, []);

    return (
        <div className="dropdown-menu">
            <div className="dropdown-title">Table List</div>
            <div className="dropdown-list">
                {tableList
                    .slice(0)
                    .map((table:TableProps) => (
                        <Table name={table.name} id={table.id} numberOfPlayers={table.numberOfPlayers} handleJoin={handleJoin}/>
                    ))
                }
            </div>
        </div>
    )
}

export default DropdownMenu;