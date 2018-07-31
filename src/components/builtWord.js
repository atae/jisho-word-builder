import React from 'react';
import '../BuiltWord.css';


const BuiltWord = (props) => {
    let buttonsClass = props.builtWord.length !== 0 ? 'buttons' : 'hidden';
    let currentText = props.builtWord
    
    return (
        <form onSubmit={props.searchBuiltWord}>
        <div className="builtWord">
            <p><strong>Built Word </strong> </p>
            <input 
            type="text"
            onChange={props.builtWordChange}
            placeholder="Empty"
            value={currentText}>
            </input>
            <div className={buttonsClass}>
            <button type="button" onClick={props.clearWord}>Clear Words</button>
            <button type="submit" >Search Built Word</button>
            </div>
            </div>
            </form>
        );
    };
    // <button type="button" onClick={props.backspaceWord}>Backspace</button>

export default BuiltWord;