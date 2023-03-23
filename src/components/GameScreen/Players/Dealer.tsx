import { Card52 } from "../../../model/Card52";
import Card from "../Card/Card";

interface DealerProps {
    dealersCards: Card52[] | undefined,
    dealerHandValue: number | undefined
}

function Dealer({dealersCards, dealerHandValue }:DealerProps) {
    return (
        <div className="dealerCards">
        <div className="cardSection">
          <div className="backFaceCard">
            {dealersCards != undefined && <Card key={"back"} card={new Card52("BACK","2")}/>}
          </div>
          {dealersCards?.map((card:Card52, index:number) => (
                    <Card key={index} card={card}/>
                ))}
        </div>
        {dealersCards != undefined && (
          <div className="countContainer">
            <div className="countBox">
              <div className="countLabel">Dealer</div>
              <div className="countValue">{dealerHandValue}</div>
            </div>
          </div>
        )}
      </div>
    )
}

export default Dealer;