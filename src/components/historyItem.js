import React from 'react';
import '../HistoryWidget.css';

const HistoryItem = (props) => {
    let ellipses = props.historyItem.length > 12 ? '...' : ''

    return (
        <div onClick={() => { props.searchForWords(props.historyItem, 'history') }} className="history-item history-item-button">
            <p> {props.historyItem.slice(0,12) + ellipses} </p>
        </div>
    );

};

export default HistoryItem;