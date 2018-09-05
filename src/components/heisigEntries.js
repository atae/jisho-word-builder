import React from 'react';
import '../Dictionary.css';
import HeisigEntry from './heisigEntry';
// import {CSSTransitionGroup} from 'react-transition-group';


class HeisigEntries extends React.Component {
    constructor(props) {
        super(props);
    }
    
    generateEntries = () => {
        
        return this.props.entries.map((el) => {
            return (<HeisigEntry key={"HeisigEntry" + el[0]}　searchForWords={this.props.searchForWords} newBuildWord={this.props.newBuildWord} buildWord={this.props.buildWord} entry={el} />)
        })
    }

    render () {
        let heisigEntries = this.generateEntries() 
        return (
            <div className="heisig">
            <h3> Heisig Results </h3>
            <div className="heisig-entries">
            { heisigEntries }
             </div>
             <hr />
             
             </div>
            );
    }

};

export default HeisigEntries;