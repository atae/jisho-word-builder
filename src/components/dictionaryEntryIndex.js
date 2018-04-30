import React, { Component } from 'react';
import DictionaryEntry from './dictionaryEntry';

class DictionaryEntryIndex extends Component {
    constructor(props){
        super(props);
        this.generateDictionaryEntries = this.generateDictionaryEntries.bind(this);
    }



    generateDictionaryEntries() {
        let generatedDictionaryEntries = [];
        this.props.dictionaryEntries.forEach((entry, i) => {
            generatedDictionaryEntries.push(<DictionaryEntry key={'dictionaryEntry' + i } entry={entry}/>);
        });

        return generatedDictionaryEntries;

    }

    render() {
        wq
q
let entries = this.generateDictionaryEntries();
        return (
            <div>
                {entries}
            </div>
        );
    }

}

export default DictionaryEntryIndex;
