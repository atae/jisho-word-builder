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
                <div className="history-item" style={{ "borderBottom": "none" }}>
                    <p> Search History </p>
                </div>
                {historyItems}
                <div className="history-item history-item-button" style={{"borderBottom": "1px solid black"}}>
                    <p> Clear History </p>
                </div>

            </div>
        )
    }
}

export default HistoryList;