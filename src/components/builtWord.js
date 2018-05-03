import React from 'react';
import '../BuiltWord.css';


const BuiltWord = (props) => {
    let buttonsClass = props.builtWord.length !== 0 ? 'buttons' : 'hidden';
    let currentText = props.builtWord.length !== 0 ? props.builtWord.join('') : "Empty!";
    
    return (
        <div className="builtWord">
            <p><strong>Built Word </strong> </p>
            <p>{currentText}</p>
            <div className={buttonsClass}>
                <button onClick={props.backspaceWord}>Backspace</button>
                <button onClick={props.clearWord}>Clear Words</button>
                <button onClick={props.searchBuiltWord}>Search Built Word</button>
            </div>
        </div>
    );
};

export default BuiltWord;