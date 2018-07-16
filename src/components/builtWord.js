import React from 'react';
import '../BuiltWord.css';


const BuiltWord = (props) => {
    let buttonsClass = props.builtWord.length !== 0 ? 'buttons' : 'hidden';
    let currentText = props.builtWord
    
    return (
        <div className="builtWord">
            <p><strong>Built Word </strong> </p>
            <input 
            type="text"
            onChange={props.builtWordChange}
            placeholder="Empty"
            value={currentText}>
            </input>
            <div className={buttonsClass}>
                <button onClick={props.backspaceWord}>Backspace</button>
                <button onClick={props.clearWord}>Clear Words</button>
                <button onClick={props.searchBuiltWord}>Search Built Word</button>
            </div>
        </div>
    );
};

export default BuiltWord;