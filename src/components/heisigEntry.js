import React, { Component } from 'react';
import '../Dictionary.css';

const HeisigEntry = (props) => {

    return (
        <div className="entry heisig">
            <h3> Heisig Result: </h3>
            <h2> {Object.values(props.entry)[0]} </h2>
            <p> {Object.keys(props.entry)[0]} </p>
            <br/>
            <hr/>
        </div>
    );

};

export default HeisigEntry;