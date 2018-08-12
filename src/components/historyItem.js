import React from 'react';
import '../HistoryWidget.css';

const HistoryItem = (props) => {

    return (
        <div className="history-item history-item-button">
            <p onClick={() => {props.searchForWords(props.historyItem, 'history')}}> {props.historyItem} </p>
        </div>
    );

};

export default HistoryItem;