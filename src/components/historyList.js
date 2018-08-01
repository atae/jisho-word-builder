import React from 'react';
import HistoryItem from './historyItem';
import '../HistoryWidget.css';

class HistoryList extends React.Component {
    constructor(props) {
        super(props)
    }

    renderHistoryItems = () => {
       return this.props.history.map((historyItem) => {
        return [<HistoryItem historyItem = {historyItem} />]
       })
    }


    render() {
        let hiddenMode = this.props.listClass
        let historyItems = this.renderHistoryItems();
        return (
            <div className={"animated history-widget-list " + hiddenMode}>
                <div className="history-item" style={{ "borderBottom": "none" }}>
                    <h4> Search History </h4>
                </div>
                {historyItems}
                <div className="history-item" style={{"borderBottom": "1px solid black"}}>
                    <h4> Clear History </h4>
                </div>

            </div>
        )
    }
}

export default HistoryList;