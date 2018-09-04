import React from 'react';
import HistoryList from './historyList';
import '../HistoryWidget.css';

class HistoryWidget extends React.Component {
    constructor(props) {
        super(props)
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
        console.log(this.props.searchForWords)
        return(
            <div className={"history-widget " + this.state.listClass}>
                <HistoryList 
                clearHistory={this.props.clearHistory}
                history={this.props.history}
                 searchForWords={this.props.searchForWords}
                listClass={this.state.listClass} />
                <button onClick={this.onClickHandler} className={'animated fadeIn ' + this.state.buttonClass}  > History </button>
            </div>
        )   
    }
}

export default HistoryWidget;