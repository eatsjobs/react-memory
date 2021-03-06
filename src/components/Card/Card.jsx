import React, { Component } from 'react';
import cn from 'classnames';
import question from './question.jpg';

import './Card.css';

function CardFront(){
    return (
        <div className='Card-Front'>
            <img style={{ width: '100%' }} src={question} alt='placeholder' />  
        </div>
    )
}

function CardBack(props){
    return (
        <div className='Card-Back'>
            <img style={{width: '100%'}} src={props.imageSrc} alt='' />
        </div>
    )
}

export default class Card extends Component {
    constructor() {
        super(...arguments);
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(e) {
        this.props.onSelect(this.props.index, this.props.type);
    }

    render() {        
        const CardClasses = cn('Card', { 'Card-Glow': this.props.matched });
        return (
            <div className={CardClasses} onClick={this.onSelect}>
                {this.props.flipped ? <CardBack type={this.props.type} imageSrc={this.props.imageSrc}/> : <CardFront />}
            </div>
        );
    }
}