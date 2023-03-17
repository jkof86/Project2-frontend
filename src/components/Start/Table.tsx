import useSound from "use-sound";
import buttonClickSound from '../../sounds/buttonHover.mp3';
import { FaUser } from "@react-icons/all-files/fa/FaUser";

interface TableProps {
    name: string,
    id: number,
    numberOfPlayers: number,
    handleJoin:(id:number) => void
}

function Table({name, id, numberOfPlayers, handleJoin}:TableProps) {
    const [playClickSound] = useSound(buttonClickSound);

    return (
        <button onMouseOver={() => playClickSound()} onClick={() => handleJoin(id)} key={id} className="dropdown-table" disabled={numberOfPlayers > 4}>
                <h6 className="table-name">{name}</h6>
                <p className="number-of-players">
                    {[...Array(numberOfPlayers)].map(e => <FaUser/>)}
                </p>
                {numberOfPlayers > 4 && <p className="table-is-full">Full</p>}
        </button>
    )
}

export default Table;