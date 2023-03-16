interface TableProps {
    name: string,
    id: number,
    numberOfPlayers: number,
    handleJoin:(id:number) => void
}

function Table({name, id, numberOfPlayers, handleJoin}:TableProps) {
    return (
        <button onClick={() => handleJoin(id)} key={id} className="dropdown-table" disabled={numberOfPlayers > 4}>
                <h6 className="table-name">{name}</h6>
                <p className="number-of-players">{numberOfPlayers} Player{numberOfPlayers > 1 ? "s" : ""}</p>
                {numberOfPlayers > 4 && <p className="table-is-full">Full Table</p>}
        </button>
    )
}

export default Table;