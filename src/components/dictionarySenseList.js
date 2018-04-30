import React, {Component} from 'react';
import DictionarySense from './dictionarySense';

class DictionarySenseList extends Component {
    constructor(props) {
        super(props);
        this.generateDictionarySenses = this.generateDictionarySenses.bind(this);
    }

    generateDictionarySenses() {
        let generatedDictionarySenses = [];
        Object.keys(this.props.entries).forEach((entryKey, i) => {
            var entry = this.props.entries[entryKey]
            generatedDictionarySenses.push(<DictionarySense number={i} entry={entry} key={entry + i} />);
        });

        return generatedDictionarySenses;
    }

    render() {
        let entries = this.generateDictionarySenses();
        return (
            <div>
                {entries}
            </div>
        );
    }

}

export default DictionarySenseList;