import React, { Component } from 'react';


class Util extends Component {
    isKanji = (ch) => {
        return !!ch.match(/[\u4E00-\u9FAF\u3040-\u3096\u30A1-\u30FA\uFF66-\uFF9D\u31F0-\u31FF]/);
    }

    generateSplashMessage = () => {
        return (
            <div className="splash-message">
                <p> Enter any Kanji, Heisig Keyword, or English/Japanese sentences in the box above.</p>
                <p> Use the 'Build Word' button to create kanji compounds based on your search results. </p>
            </div>
        )
    }

}

export default Util;