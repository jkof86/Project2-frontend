import { Card52 } from "../../../model/Card52";

interface DealerProps {
    dealersCards: Card52[] | undefined,
    cardsDealt: boolean
}

function Dealer({dealersCards, cardsDealt}:DealerProps) {
    return (
        <div className="dealerCards">
        <div className="cardSection">
          {/*dealerCards.map((card, index) => (
            <div key={index} className="cardWrapper">
              {index === 0 && !isDealersTurn ? (
                <card-t rank="0" backtext="BACK" />
              ) : (
                <card-t rank={card.rank} suit={card.suit} />
              )}
            </div>
              ))*/}
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