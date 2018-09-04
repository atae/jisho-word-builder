import React from 'react';
import '../Dictionary.css';
import DictionarySenseList from './dictionarySenseList';

const DictionaryEntry = (props) => {
    let featuredWord = props.entry.japanese[0].word ? props.entry.japanese[0].word : props.entry.japanese[0].reading
        return (
            <div>
                <div className="entry row animated fadeIn">
                    <div className="col-md-3 col-xs-6">
                    <h2>{featuredWord}</h2>
                    <p>{props.entry.japanese[0].word ? props.entry.japanese[0].reading : ""}</p>
                    <div>
                        <button 
                        onClick={() => { props.buildWord(featuredWord); }}>
                        Add {featuredWord} to Built Word
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => { props.newBuildWord(featuredWord); }}>
                            Add {featuredWord} to New Built Word
                        </button>
                    </div>
                    </div>
                    <div className="sense col-9 col-xs-6">
                        <DictionarySenseList entries={props.entry.senses} /> 
                    </div>
                </div>
                <hr/>
            </div>
        );

};

export default DictionaryEntry;