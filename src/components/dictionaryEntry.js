import React from 'react';
import '../Dictionary.css';
import DictionarySenseList from './dictionarySenseList';

const DictionaryEntry = (props) => {
    let featuredWord = props.entry.japanese[0].word ? props.entry.japanese[0].word : props.entry.japanese[0].reading
        return (
            <div>
                <div className="entry">
                    <div className="word">
                    <h2>{featuredWord}</h2>
                    <p>{props.entry.japanese[0].word ? props.entry.japanese[0].reading : ""}</p>
                    <div>
                        <button 
                        onClick={() => { props.buildWord(featuredWord); }}>
                        Add {featuredWord} to Built Word
                        </button>
                    </div>
                    </div>
                    <div className="sense">
                        <DictionarySenseList entries={props.entry.senses} /> 
                    </div>
                </div>
                <hr/>
            </div>
        );

};

export default DictionaryEntry;