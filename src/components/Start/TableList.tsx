import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { number } from "yup";
import "./TableList.css";
import Table from "./Table";
import { replace } from "lodash";

interface TableProps {
    name: string,
    id: number,
    numberOfPlayers: number
}

function DropdownMenu() {
    const [tableList, setTableList] = useState<TableProps[]>(
        [{
            name: "na",
            id: 1,
            numberOfPlayers: 0
        }]
    );

    const loadAllTables = () => {
        //Code here to load the tables from the server
        const tableList = [{
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
        }]
        setTableList(tableList);
    }

    const navigate = useNavigate();
    const handleJoin = (id:number) => {
        if(id > 0){
            window.location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        } else {
            navigate("/game");
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