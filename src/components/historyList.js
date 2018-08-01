import React from 'react';
import HistoryItem from './historyItem';
import '../HistoryWidget.css';

class HistoryList extends React.Component {
    constructor(props) {
        super(props)
    }

    renderHistoryItems = () => {
       return this.props.history.map((historyItem, i) => {
           return [<HistoryItem key={'historyItem' + i} searchForWords={this.props.searchForWords} historyItem = {historyItem} />]
       })
    }


    render() {
        let hiddenMode = this.props.listClass
        let historyItems = this.renderHistoryItems();
        console.log(this.props.searchForWords)

        return (
            <div className={"animated history-widget-list " + hiddenMode}>
                <div className="history-item history-item-header" style={{ "borderBottom": "none" }}>
                    <p><strong> Your Search History </strong></p>
                </div>
                {historyItems}
                <div onClick={this.props.clearHistory} className="history-item history-item-button" style={{"borderBottom": "2px solid black"}}>
                    <p> Clear History </p>
                </div>

            </div>
        )
    }
}

export default HistoryList;