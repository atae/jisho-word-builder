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
            listClass: this.state.listClass === 'fadeInRight' ? 'fadeOutDown' : 'fadeInRight',
            buttonClass: this.state.buttonClass === '' ? 'expanded' : ''
        })
    }

    componentDidMount = () => {
        this.onAnimationEnd();
    }

    onAnimationEnd = () => {
        let el = document.getElementsByClassName('history-widget')[0]
        el.addEventListener('animationend', () => {
            if (el.className == 'history-widget fadeOutDown') {
                el.style.height = '0';
                el.style.width = '0';
            } else {
                el.style.height = 'auto';
                el.style.width = '100%';
            }
        })  
    }

    render() {
        return(
            <div className="history-widget-container">
                <div className={"history-widget " + this.state.listClass}>
                    <HistoryList 
                    clearHistory={this.props.clearHistory}
                    history={this.props.history}
                    searchForWords={this.props.searchForWords}
                    listClass={this.state.listClass} />
                    </div>
                <button onClick={this.onClickHandler} className={'animated fadeIn ' + this.state.buttonClass}  > History </button>
            </div>
        )   
    }
}

export default HistoryWidget;