import React, { Component } from 'react';
import '../Dictionary.css';

const HeisigEntry = (props) => {


    return (
        <div className="heisig">
            <h3> Heisig Result: </h3>
            <h2> {Object.values(props.entry)[0]} </h2>
            <p> {Object.keys(props.entry)[0]} </p>
            <div>
                <button onClick={() => { props.buildWord(Object.values(props.entry)[0]); }}> Add {Object.values(props.entry)[0]} to Built Word </button>
            </div>
            <hr/>
            
        </div>
    );

};

export default HeisigEntry;