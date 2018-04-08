import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import './index.scss';
import Dealer from '../Dealer'
import Player from '../Player'
import clubs from '../../../images/clubs.jpg';
import diamonds from '../../../images/diamonds.jpg';
import spades from '../../../images/spades.jpg';
import hearts from '../../../images/hearts.png';

export class Game extends React.Component {
  state = {
    suits: [
      {name: 'clubs', image: clubs},
      {name: 'diamonds', image: diamonds},
      {name: 'hearts', image: hearts},
      {name: 'spades', image: spades}
    ],
    ranks: [
      {rank: 'A', value: 1},
      {rank: '2', value: 2},
      {rank: '3', value: 3},
      {rank: '4', value: 4},
      {rank: '5', value: 5},
      {rank: '6', value: 6},
      {rank: '7', value: 7},
      {rank: '8', value: 8},
      {rank: '9', value: 9},
      {rank: '10', value: 10},
      {rank: 'J', value: 10},
      {rank: 'Q', value: 10},
      {rank: 'K', value: 10}
    ],
    deck: [],
    playersHand: [],
    dealersHand: [],
    playerBust: false,
    dealerBust: false,
    gameOver: false,
    playerWins: false,
    dealerWins: false,
  }

  componentDidMount = () => {
    this.buildDeck()
    .then(this.shuffleDeck)
    .then(this.dealToPlayer)
    .then(setTimeout(this.dealToPlayer, 2000))
    .then(setTimeout(this.dealToDealer, 4000))
  }

  shuffleDeck = () => {
    const shuffled = _.shuffle(this.state.deck)
    this.setState({ deck: shuffled })
  }

  buildDeck = () => {
    return new Promise((resolve, reject) => {
      this.state.suits.forEach((suit) => {
        this.state.ranks.forEach((rank) => {
          resolve(
          this.setState(prevState => (
            { deck: [...prevState.deck, {suit: suit.name, rank: rank, image: suit.image}]}
          )))
        })
      })
    })
  }

  dealToPlayer = () => {
    this.setState(prevState => (
      { playersHand: [...prevState.playersHand, this.state.deck[0]]}
    ))
    this.state.deck.shift();
  }

  dealToDealer = () => {
    this.setState(prevState => (
      { dealersHand: [...prevState.dealersHand, this.state.deck[0]]}
    ))
    this.state.deck.shift();
  }

  containsAce = (participant) => {
    return this.state[participant].some(card => card.rank.rank == 'A')
  }

  handTotal = (participant) => {
    const total = this.state[participant].map(card => card.rank.value).reduce((a, b) => a+b, 0);
    if (this.containsAce(participant) && total < 12){
      return {
        highTotal: total + 10,
        total: total
      }
    }
    else if(total > 21){
      return {
        total: total
      }
    }
    return {
      total: total
    }
  }

  stick = () => {
    setTimeout(() => {
      if(this.handTotal('dealersHand').total < 16 && this.handTotal('dealersHand').highTotal != 21) {
        this.dealToDealer();
        this.stick();
      }
    }, 2000);
  };

  result = () => {
    if (this.handTotal('dealersHand').total == 21 || this.handTotal('dealersHand').highTotal == 21){
      return <div> dealer wins! </div>
    }
    else if (this.handTotal('playersHand').total > 21 || this.handTotal('playersHand').highTotal > 21){
      return <div> dealer wins! </div>
    }
    else if (this.handTotal('dealersHand').total > 21 || this.handTotal('dealersHand').highTotal > 21){
      return <div> player wins! </div>
    }
    else if (this.handTotal('dealersHand').total >= 16 && this.handTotal('dealersHand').total > this.handTotal('playersHand').total){
      return <div> dealer wins! </div>
    }
    else if (this.handTotal('dealersHand').total >= 16 && this.handTotal('playersHand').total > this.handTotal('dealersHand').total){
      return <div> player wins! </div>
    }
    else{
      return <div>Game in progress...</div>
    }
  }

  render(){
    return (
      <div className="mainContainer">
        <div className="setupContainer">
          <h3> BlackJack </h3>
          <button onClick={this.startGame}>Start a new game</button>
          <button onClick={this.stick}>Stick</button>
          <button onClick={this.dealToPlayer}>Hit</button>
          <h3> Initial Cards </h3>
          <div className="initialCards"></div>
        </div>
        <div className="gameContainer">
          <div className="dealersContainer">
            <Dealer
              dealersHand={this.state.dealersHand}
              containsAce={this.containsAce}
              handTotal={this.handTotal}
            />
          </div>
          <div className="playersContainer">
            <Player
              playersHand={this.state.playersHand}
              containsAce={this.containsAce}
              handTotal={this.handTotal}
            />
          </div>
          <div>
            <h4> Result {this.result()}</h4>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  myState: state.myState
});

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
