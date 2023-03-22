import { Card52 } from "../../../model/Card52";
import Card from "../Card/Card";

interface DealerProps {
    dealersCards: Card52[] | undefined,
    cardsDealt: boolean
}

function Dealer({dealersCards, cardsDealt}:DealerProps) {
    return (
        <div className="dealerCards">
        <div className="cardSection">
          <Card key={"back"} card={new Card52("BACK","2")}/>
          {dealersCards?.map((card:Card52, index:number) => (
                    <Card key={index} card={card}/>
                ))}
        </div>
        {cardsDealt && (
          <div className="countContainer">
            <div className="countBox">
              <div className="countLabel">Dealer</div>
              {/* <div className="countValue">{calculateHand(dealerCards)}</div> */}
            </div>
          </div>
        )}
      </div>
    )
}

export default Dealer;