import React, { Component } from 'react';
import Grid from '../components/Grid/Grid';
import Card from '../components/Card/Card';
import GameStatus from '../components/GameStatus/GameStatus';

import sun from '../assets/sun.jpg';
import heart from '../assets/heart.jpg';
import flower from '../assets/flower.jpg';
import gufo from '../assets/gufo.jpg';
import ladybug from '../assets/ladybug.jpg';
import umbrella from '../assets/umbrella.jpg';
import shuffle from '../lib/index';

const types = [['sun', sun], ['heart', heart], ['flower', flower], ['gufo', gufo], ['ladybug', ladybug], ['umbrella', umbrella]];

function CardFactory(types){
    const mirror = [...types, ...types]
    return mirror.map((el, i) => { 
        const [type, src] = el;
        return { type, src, flipped: false, matched: false, id: `generatedId_${i}` };
    });
}

export default class Game extends Component {
    constructor() {
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

        // TODO: extract only the right card
        const cards = this.state.cards.slice();
        if(cards[index].matched) { return; }

        cards[index].flipped = true;
        this.setState({ cards, locked: true });

        // avoid double click on the same card
        if(this.state.currentCard && this.state.currentCard.index !== index) {
            if(this.state.currentCard.type === type) {                
                cards[index].matched = true;
                cards[this.state.currentCard.index].matched = true;
                this.setState({ 
                    cards, 
                    currentCard: null, 
                    locked: false, 
                    moves: this.state.moves + 1, 
                    matches: this.state.matches + 1 
                }, () => {                                  
                    if(this.checkWin(this.state)) { this.setState({ hasWon: true }); }
                });
            } else {
                this.timer = setTimeout(() => {
                    cards[index].flipped = false;
                    cards[this.state.currentCard.index].flipped = false;
                    this.setState({ 
                        cards, 
                        currentCard: null, 
                        locked: false, 
                        moves: this.state.moves + 1 
                    });
                }, 5000); // TODO: increase / decrease difficulty?
            }
        } else {            
            this.setState({ currentCard: { index, type }, locked: false });
        }
    }

    render() {
      return (
        <div>
            <GameStatus onButtonRestart={this.restart} moves={this.state.moves} hasWon={this.state.hasWon} />
            <Grid>
                {this.state.cards.map((card, index) => {                    
                    return <Card
                        type={card.type} 
                        key={card.id}
                        index={index}                    
                        onSelect={this.handleSelection}
                        flipped={card.flipped}
                        matched={card.matched}
                        imageSrc={card.src}
                        />
                    })
                }
            </Grid>            
        </div>)
    }
}