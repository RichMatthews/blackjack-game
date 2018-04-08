import React from 'react';

const component = ({dealersHand, containsAce, handTotal}) => (
  <div>
    <h4>Dealers Hand</h4>
    <div className="cardContainer">
      {dealersHand.map((card, index) => {
        return <div key={index} className="dealersCard card">
          <div className="cardRank">{card.rank.rank}</div>
          <div className="imageContainer">
            <img className="cardImage" src={card.image} />
          </div>
          <div className="cardSuit">{card.suit}</div>
        </div>
      })}
    </div>
    <div> Dealers total:
      {containsAce('dealersHand') && handTotal('dealersHand').highTotal < 22 ?
        <div> {handTotal('dealersHand').total} or {handTotal('dealersHand').highTotal} </div>
        :
        <div> {handTotal('dealersHand').total} </div>
      }
    </div>
  </div>
)

export default component;
