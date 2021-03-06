import React from 'react';
import HistoryItem from './historyItem';
import '../HistoryWidget.css';

class HistoryList extends React.Component {
    constructor(props) {
        super(props)
    }

    renderHistoryItems = () => {
       if (this.props.history.length > 0) {
       return this.props.history.map((historyItem, i) => {
           return [<HistoryItem key={'historyItem' + i} searchForWords={this.props.searchForWords} historyItem = {historyItem} />]
       })
        } else {
            return [<div className="history-item" style={{'backgroundColor' : '#EEE'}}> No Results </div>]
        }
    }


    render() {
        let hiddenMode = this.props.listClass
        let historyItems = this.renderHistoryItems();
        // console.log(this.props.searchForWords)

        return (
            <div className={"animated history-widget-list " + hiddenMode}>
                <div className="history-item history-item-header" style={{ "borderBottom": "none" }}>
                    <p><strong> Your Search History </strong></p>
                </div>
                <div className="history-item-sublist">
                {historyItems}
                </div>
                <div onClick={this.props.clearHistory} className="history-item history-item-button" style={{"borderBottom": "2px solid black"}}>
                    <p> Clear History </p>
                </div>

            </div>
        )
    }
}

export default HistoryList;