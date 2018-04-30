import React, { Component } from 'react';
import '../Dictionary.css';

const DictionaryEntry = (props) => {

        return (
            <div className="entry">
                <h2>{props.entry.japanese[0].word ? props.entry.japanese[0].word : props.entry.japanese[0].reading}</h2>
                <p>{props.entry.japanese[0].word ? props.entry.japanese[0].reading : ""}</p>
                <hr/>
            </div>
        );

};

export default DictionaryEntry;