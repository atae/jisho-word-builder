import React from 'react';
import HistoryItem from './historyItem';
import '../HistoryWidget.css';

class HistoryList extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        let hiddenMode = this.props.listClass
        return (
            <div className={"animated history-widget-list " + hiddenMode}>
                <div className="history-item">
                    <h4> Search History </h4>
                </div>
                
                <HistoryItem />

                <div className="history-item">
                    <h4> Clear History </h4>
                </div>

            </div>
        )
    }
}

export default HistoryList;