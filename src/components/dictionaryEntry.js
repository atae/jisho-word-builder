import React, { Component } from 'react';
import '../Dictionary.css';

const DictionaryEntry = (props) => {
    let featuredWord = props.entry.japanese[0].word ? props.entry.japanese[0].word : props.entry.japanese[0].reading
        return (
            <div className="entry">
                <h2>{featuredWord}</h2>
                <p>{props.entry.japanese[0].word ? props.entry.japanese[0].reading : ""}</p>
                <div>
                    <button 
                    onClick={() => { props.buildWord(featuredWord); }}>
                     Add {featuredWord} to Built Word
                    </button>
                </div>
                <hr/>
            </div>
        );

};

export default DictionaryEntry;