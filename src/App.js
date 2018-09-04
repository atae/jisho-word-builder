import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/searchBar';
import BuiltWord from './components/builtWord';
import DictionaryEntryIndex from './components/dictionaryEntryIndex';
import heisigToKanji from './heisigToKanjiExpandedStructure.json';
// import rtk4HeisigToKanji from './theCiteRTK4.json'
import HistoryWidget from './components/historyWidget';
import Fuse from 'fuse.js'
// import kanjiToHeisig from 'kanjiToHeisig.json';


class App extends Component {
  constructor() {
    super();
    //Add mouseover on Kanji to show Heisig keyword
    this.state = { fetching: '', searchHistory : [],  dictionaryResults: {}, builtWord: "", heisigResults: {}, searched: false, error: ''};
    this.buildWord = this.buildWord.bind(this);
    this.newBuildWord = this.newBuildWord.bind(this);
    this.clearWord = this.clearWord.bind(this);
    this.backspaceWord = this.backspaceWord.bind(this);
    this.searchBuiltWord = this.searchBuiltWord.bind(this);
    this.searchForWords = this.searchForWords.bind(this);
    this.heisig = heisigToKanji.entries;
    this.searchHeisig = this.searchHeisig.bind(this);
    this.heisigSearchOptions = {
      shouldSort: true,
      threshold: 0.2,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "heisig",
      ]
    }
   
    this.kanjiSearchOptions = {
      shouldSort: true,
      threshold: 0.2,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "kanji",
      ]
    }
  }

  isKanji = (ch) => {
    return !!ch.match(/[\u4E00-\u9FAF\u3040-\u3096\u30A1-\u30FA\uFF66-\uFF9D\u31F0-\u31FF]/);
  }

  searchHeisig(word) {
    let fuse = new Fuse(this.heisig, this.heisigSearchOptions);
    let heisigSearchResults = fuse.search(word)
    let heisigResults = []
    if (heisigSearchResults.length != 0) {

      heisigResults = heisigSearchResults.slice(0, 5).map((result) => {
        var wordEntry = result['heisig']
        var kanji = result['kanji']
        return [wordEntry, kanji]
      })
    }

    //kanji search
    let kanjiResults = []
    fuse = new Fuse(this.heisig, this.kanjiSearchOptions);
    kanjiResults = word.split('').filter((el) => {
      return this.isKanji(el);
    }).map((el) => {
      return fuse.search(el)
    }).filter((el) => {
      return el[0]
    }).map((result) => {
      // console.log(result)
      var wordEntry = result[0]['heisig']
      var kanji = result[0]['kanji']
      return [wordEntry, kanji]
    })


    heisigResults = kanjiResults.concat(heisigResults);
    heisigResults = heisigResults.map(JSON.stringify).reverse().filter(function (e, i, a) {
      return a.indexOf(e, i + 1) === -1;
    }).reverse().map(JSON.parse)
    console.log(heisigResults)
    return heisigResults
  }

  searchForWords(word, searchMode) {
    let heisigResults = this.searchHeisig(word)


    this.loading.className = "fetching";


    fetch(`https://ancient-sands-74909.herokuapp.com/?keyword=${word}`, { mode: 'cors' }).then((res) => {
      let that = this;

      res.json().then(function (resJson) {
        that.loading.className = "fetching hiddenBlock";

        let jsonResponse = {};
        jsonResponse = resJson.data;
        let newHistory = that.state.searchHistory
        if (searchMode !== 'history') {
          newHistory = newHistory.concat(word)
        }
        that.setState({ fetching: '', dictionaryResults: jsonResponse, heisigResults, error: '', searched: true, searchHistory: newHistory });
      });
    }).catch((err) => {
      this.loading.className = "fetching hiddenBlock";

      this.setState({
        
        error: `I cannot breve: ${err}`
      });
    });
  }

  newBuildWord(word) {
    let newBuiltWord = word;
    this.setState({ builtWord: newBuiltWord });
  }

  buildWord(word) {
    let newBuiltWord = this.state.builtWord + word;
    this.setState({builtWord: newBuiltWord});
  }

  builtWordChange = (e) => {
    this.setState({builtWord: e.target.value})
  }

  clearWord() {
    this.setState({builtWord: []});
  }   

  backspaceWord() {
    let newBuiltWord = this.state.builtWord;
    newBuiltWord.pop();
    this.setState({ builtWord: newBuiltWord});
  }

  searchBuiltWord(e) {
    //Figure out how to work with Heisig Result backwards
    e.preventDefault()
    this.loading.className = "fetching";
    let that = this;
    let builtWord = this.state.builtWord;

    fetch(`https://ancient-sands-74909.herokuapp.com/?keyword=${builtWord}`, { mode: 'cors' }).then((res) => {
      res.json().then(function (resJson) {
        that.loading.className = "fetching hiddenBlock";
        let jsonResponse = {};
        jsonResponse = resJson.data;
        let heisigResults = that.searchHeisig(builtWord)
        let newHistory = that.state.searchHistory.concat(builtWord)

        that.setState({ fetching: '', dictionaryResults: jsonResponse, heisigResults　, error: '', searched: true, searchHistory: newHistory });
      });
    }).catch((err) => {
      this.loading.className = "fetching hiddenBlock";

      this.setState({ error: `I cannot breve: ${err}`});
    });
  }

  generateSplashMessage = () => {
    return (
      <div className="splash-message">
        <p> Enter any Kanji, Heisig Keyword, or English/Japanese sentences in the box above.</p>
        <p> Use the 'Build Word' button to create kanji compounds based on your search results. </p>
      </div>
    )
  }

  clearSearch = () => {
    this.setState({ dictionaryResults: {}, heisigResults: {}, searched: false, error: ''})
  }

  clearHistory = () => {
    this.setState({searchHistory: []})
  }

  render() {
    let splashMessage = this.generateSplashMessage()
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Heisig-Jisho Word Builder</h1>
        </header>
        
        <SearchBar submitHandler={this.searchForWords} clearSearch={this.clearSearch}/>
        <BuiltWord 
          builtWordChange={this.builtWordChange}
          builtWord={this.state.builtWord} 
          backspaceWord={this.backspaceWord}
          clearWord={this.clearWord} 
          searchBuiltWord={this.searchBuiltWord}/>
        <HistoryWidget searchForWords={this.searchForWords}
        clearHistory={this.clearHistory}
      history={this.state.searchHistory} />
          <div ref={(input) => {this.loading = input;}} className="fetching hiddenBlock">
            <p>Fetching Data...</p>
          </div>
        <div className="error">
          <p>{this.state.error !== '' ? this.state.error : ''}</p>
        </div>
        <DictionaryEntryIndex 
          searchForWords={this.searchForWords}
          buildWord={this.buildWord}
          newBuildWord={this.newBuildWord}
          dictionaryEntries={this.state.dictionaryResults} 
          heisigEntries={this.state.heisigResults}
          searched={this.state.searched} />

          {Object.keys(this.state.dictionaryResults).length === 0 ? splashMessage: ''}
        <div className="footer">
          <p>This site uses some heisig json and the Official Unofficial Jisho.org API</p>
          <p> Andrew Tae 2018 </p>
        </div>
      </div>
    );
  }
}

export default App;
