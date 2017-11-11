import React, { Component } from 'react';
import Card from '../Card/Card';
import shuffle from '../../lib/index';
import './Grid.css';
const types = ['sun', 'heart', 'flower', 'gufo', 'ladybug', 'umbrella'];

function CardFactory(types){
    const mirror = [...types, ...types]
    return mirror.map((type, i) => ({ type, flipped: false, matched: false, id: `generatedId_${i}` }));
}

/** TODO: make it configurable */
export default class Grid extends Component {
    constructor(){
        super(...arguments);
        this.restart = this.restart.bind(this);
        this.getCards = this.getCards.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.state = {
          hasWon: false,
          matches: 0,
          moves: 0,
          cards: this.getCards(types),
          locked: false,
          currentCard: null          
        }
    }
    
    restart() {
        this.setState({
            hasWon: false,
            matches: 0,
            moves: 0,
            cards: this.getCards(types),
            locked: false,
            currentCard: null
          });
    }

    getCards(types) {
        const cards = CardFactory(types);
        return shuffle(cards);
    }
    
    checkWin(currentState) {
        return currentState.matches === currentState.cards.length / 2;
    }

    handleSelection(index, type) {
        if(this.state.locked) { return; }

        const cards = this.state.cards;
        if(cards[index].matched) { return; }

        cards[index].flipped = true;
        this.setState({ cards, locked: true });

        // avoid double click on the same card
        if(this.state.currentCard && this.state.currentCard.index !== index) {
            if(this.state.currentCard.type === type) {                
                cards[index].matched = true;
                cards[this.state.currentCard.index].matched = true;
                this.setState({ cards, currentCard: null, locked: false, moves: this.state.moves + 1, matches: this.state.matches + 1 }, () => {                                  
                    if(this.checkWin(this.state)) { this.setState({ hasWon: true }); }
                });
            } else {
                this.timer = setTimeout(() => {
                    cards[index].flipped = false;
                    cards[this.state.currentCard.index].flipped = false;
                    this.setState({ cards, currentCard: null, locked: false, moves: this.state.moves + 1 })
                }, 1000);
            }
        } else {            
            this.setState({ currentCard: { index, type }, locked: false });
        }
    }

    render() {
      return (
        <div className="Grid-container">            
            <div className="Grid">
                {this.state.cards.map((card, index) => {                    
                    return <Card
                        type={card.type} 
                        key={card.id}
                        index={index}                    
                        onSelect={this.handleSelection}
                        flipped={card.flipped}
                        matched={card.matched}
                        />
                    })
                }
            </div>
            <div> 
                <h3>Moves: {this.state.moves}</h3>
                <button onClick={this.restart}>Restart</button>
                <div>{this.state.hasWon ? "You Won!" : null }</div>
            </div>
        </div>)
    }
}