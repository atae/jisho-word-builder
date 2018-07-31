import React from 'react';
import HistoryList from './historyList';
import '../HistoryWidget.css';

class HistoryWidget extends React.Component {
    constructor() {
        super()
        this.state = {
            listClass: 'hidden'
        }
    }

    onClickHandler = () => {
        this.setState({ listClass: this.state.listClass === 'fadeInRight' ? 'fadeOutRight' : 'fadeInRight' })
    }

    render() {
        return(
            <div className="history-widget">
            <HistoryList listClass={this.state.listClass} />
            <button onClick={this.onClickHandler} className='animated fadeIn' > History </button>
            </div>
        )   
    }
}

export default HistoryWidget;