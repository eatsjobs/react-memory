import React, { Component } from 'react';
import cn from 'classnames';
import sun from './asset/sun.jpg';
import heart from './asset/heart.jpg';
import flower from './asset/flower.jpg';
import gufo from './asset/gufo.jpg';
import ladybug from './asset/ladybug.jpg';
import umbrella from './asset/umbrella.jpg';

import './Card.css';

const mapImagetoName = {
    sun: sun,
    flower: flower,
    heart: heart,
    gufo: gufo,
    ladybug: ladybug,
    umbrella: umbrella
}

function CardFront(){
    return (
        <div className='Card-Front'>
            <img style={{ width: '100%' }} src='http://via.placeholder.com/265x265' alt='placeholder' />  
        </div>
    )
}

function CardBack(props){
    return (
        <div className='Card-Back'>
            <img style={{width: '100%'}} src={mapImagetoName[props.type]} alt='' />
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
                {this.props.flipped ? <CardBack type={this.props.type} /> : <CardFront />}
            </div>
        );
    }
}