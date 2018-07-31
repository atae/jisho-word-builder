import React from 'react';
import HistoryList from './historyList';
import '../HistoryWidget.css';

class HistoryWidget extends React.Component {
    constructor() {
        super()
        this.state = {
            open: 'false'
        }
    }

    onClickHandler = () => {
        this.setState({ open: this.state.open === 'true' ? 'false' : 'true' })
    }

    render() {
        return(
            <div className="history-widget">
            <HistoryList open={this.state.open}/>
            <button onClick={this.onClickHandler} className='animated fadeIn' > History </button>
            </div>
        )   
    }
}

export default HistoryWidget;