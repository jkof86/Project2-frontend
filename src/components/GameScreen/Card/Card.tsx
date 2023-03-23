import { Card52 } from "../../../model/Card52";

interface CardProps {
    card: Card52
}

function Card({card}:CardProps) {

    const getCardImage = ():string => {
        return "/cards/" + card.suit + card.rank + ".svg";
    }
    
    return (
        <div>
            <img src={getCardImage()} alt={card.suit + card.rank} />
        </div>
    )
}

export default Card;