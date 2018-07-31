import React from 'react'
import '../HistoryWidget.css';

class HistoryWidget extends React.Component {
    constructor() {
        super()
    }

    render() {
        return(
            <button className='history-widget animated fadeIn' > History </button>
        )
    }
}

export default HistoryWidget;