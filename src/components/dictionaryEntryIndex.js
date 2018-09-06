import React, { Component } from 'react';
import DictionaryEntry from './dictionaryEntry';
import HeisigEntries from './heisigEntries';
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
            generatedDictionaryEntries.push(<DictionaryEntry newBuildWord={this.props.newBuildWord} buildWord={this.props.buildWord} key={'dictionaryEntry' + i } entry={currentEntry}/>);
        });

        return generatedDictionaryEntries;

    }

    render() {
        let entries = this.generateDictionaryEntries();
        return (
            
            <div className="container animated fadeIn">
                {Object.keys(this.props.heisigEntries).length !== 0 ? 
                    <HeisigEntries 
                        newBuildWord={this.props.newBuildWord}
                        searchForWords={this.props.searchForWords} 
                        buildWord={this.props.buildWord} 
                        entries={this.props.heisigEntries} /> : ''}
                {entries}
            </div>
        );
    }

}

export default DictionaryEntryIndex;