import React from 'react';

export default function GameStatus(props) {
    return (
        <div style={{ width: '100%' }}> 
            <div>Moves: {props.moves}</div>
            <button onClick={props.onButtonRestart}>Restart</button>
            <div>{props.hasWon ? "You Won!" : null }</div>
        </div>
    );
}