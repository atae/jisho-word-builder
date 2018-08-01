import React from 'react';
import '../HistoryWidget.css';

const HistoryItem = (props) => {

    return (
        <div class="history-item">
            <p> {props.historyItem} </p>
        </div>
    );

};

export default HistoryItem;