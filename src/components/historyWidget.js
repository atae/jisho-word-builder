import React from 'react';
import HistoryList from './historyList';
import '../HistoryWidget.css';

class HistoryWidget extends React.Component {
    constructor() {
        super()
        this.state = {
            listClass: 'hidden',
            buttonClass: ''
        }
    }

    onClickHandler = () => {
        this.setState({ 
            listClass: this.state.listClass === 'fadeInRight' ? 'fadeOutRight' : 'fadeInRight',
            buttonClass: this.state.buttonClass === '' ? 'expanded' : ''
        })
    }

    render() {
        
        return(
            <div className="history-widget">
                <HistoryList listClass={this.state.listClass} />
                <button onClick={this.onClickHandler} className={'animated fadeIn ' + this.state.buttonClass}  > History </button>
            </div>
        )   
    }
}

export default HistoryWidget;