import React from 'react';
import '../Dictionary.css';

const HeisigEntry = (props) => {

    return (
        <div class="animated fadeIn">
                <h2> {props.entry[1]} </h2>
                <p> {props.entry[0]} </p>
                <div>
                    <button onClick={() => { props.buildWord(props.entry[1]); }}> Add {props.entry[1]} to Built Word </button>
                    <button onClick={() => { props.searchForWords(props.entry[1]); }}> Search {props.entry[1]} </button>
                </div>
            </div>
    );

};

export default HeisigEntry;