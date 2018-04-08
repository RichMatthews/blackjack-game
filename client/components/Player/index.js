import React from 'react';

const component = ({playersHand, containsAce, handTotal}) => (
  <div>
    <h4>Players Hand</h4>
    <div className="cardContainer">
      {playersHand.map((card, index) => {
        return <div key={index} className="playersCard card">
          <div className="cardRank">{card.rank.rank}</div>
          <div className="imageContainer">
            <img className="cardImage" src={card.image} />
          </div>
          <div className="cardSuit">{card.suit}</div>
        </div>
      })}
    </div>
    <div> Players total:
    {containsAce('playersHand') && handTotal('playersHand').highTotal < 22 ?
      <div> {handTotal('playersHand').total} or {handTotal('playersHand').highTotal} </div>
      :
      <div> {handTotal('playersHand').total} </div>
    }
    </div>
  </div>
)

export default component;
