import React, { Component } from 'react';
import DictionaryEntry from './dictionaryEntry';
import HeisigEntry from './heisigEntry';
import '../Dictionary.css';

class DictionaryEntryIndex extends Component {
    constructor(props){
        super(props);
        this.generateDictionaryEntries = this.generateDictionaryEntries.bind(this);
    }



    generateDictionaryEntries() {
        let generatedDictionaryEntries = [];
        if (Object.keys(this.props.dictionaryEntries).length !== 0) {
            generatedDictionaryEntries.push(<h3 className="jisho" key={"results"}>Jisho Results </h3>)
        } else if (this.props.searched === true) {
            generatedDictionaryEntries.push(<h3 key={"no results"}>No results! </h3>)
        }
        Object.keys(this.props.dictionaryEntries).forEach((entryKey, i) => {
            let currentEntry = this.props.dictionaryEntries[entryKey];
            generatedDictionaryEntries.push(<DictionaryEntry buildWord={this.props.buildWord} key={'dictionaryEntry' + i } entry={currentEntry}/>);
        });

        return generatedDictionaryEntries;

    }

    render() {
        let entries = this.generateDictionaryEntries();
        return (
            
            <div className="container">
                {Object.keys(this.props.heisigEntry).length !== 0 ? <HeisigEntry searchForWords={this.props.searchForWords} buildWord={this.props.buildWord} entry={this.props.heisigEntry} /> : ''}
                {entries}
            </div>
        );
    }

}

export default DictionaryEntryIndex;