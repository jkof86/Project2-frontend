import { Card52 } from "../../../model/Card52";
import './Card.css';

interface CardProps {
    card: Card52
    index: number
}

function Card({card, index}:CardProps) {

    const getCardImage = ():string => {
        return "/cards/" + card.suit + card.rank + ".svg";
    }
    
    return (
        <div style={{left: index*45 + "px"}} className="playing-card">
            <img src={getCardImage()} alt={card.suit + card.rank} />
        </div>
    )
}

export default Card;