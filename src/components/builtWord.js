import React, { Component } from 'react';
import '../BuiltWord.css';
class BuiltWord extends Component {

    constructor(props) {
        super(props);

    }
    render() {
        let buttonsClass = this.props.builtWord.length != 0 ? 'buttons' : 'hidden';
        let currentText = this.props.builtWord.length != 0 ? this.props.builtWord.join('') : "Empty!";
        return (
            <div className="builtWord">
                <p><strong>Built Word: </strong> </p>
                <p>{currentText}</p>
                <div className={buttonsClass}>
                    <button onClick={this.props.backspaceWord}>Backspace</button>
                    <button onClick={this.props.clearWord}>Clear Words</button>
                    <button onClick={this.props.searchBuiltWord}>Search Built Word</button>
                </div>
            </div>
        );
    }
}

export default BuiltWord;