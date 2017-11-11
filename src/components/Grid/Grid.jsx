import React from 'react';
import './Grid.css';

/** TODO: make it configurable */
export default function Grid(props){
    return (
        <div className="Grid-container">            
            <div className="Grid">
                {props.children}
            </div>
        </div>)
}      