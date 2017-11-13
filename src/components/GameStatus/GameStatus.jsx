import React from 'react';
import './GameStatus.css';
export default function GameStatus(props) {
    return (
        <div className={'GameStatus-container'}> 
            <div className={'GameStatus-moves'}>Moves: {props.moves}</div>
            <button onClick={props.onButtonRestart}>Restart</button>
            <div>{props.hasWon ? "You Won!" : null }</div>
        </div>
    );
}