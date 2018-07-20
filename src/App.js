import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/searchBar';
import BuiltWord from './components/builtWord';
import DictionaryEntryIndex from './components/dictionaryEntryIndex';
import heisigToKanji from './heisigToKanjiExpandedStructure.json';
import Fuse from 'fuse.js'
// import kanjiToHeisig from 'kanjiToHeisig.json';


class App extends Component {
  constructor() {
    super();
    //Add mouseover on Kanji to show Heisig keyword
    this.state = {fetching: '', dictionaryResults: {}, builtWord: "", heisigResults: {}, searched: false, error: ''};
    this.buildWord = this.buildWord.bind(this);
    this.clearWord = this.clearWord.bind(this);
    this.backspaceWord = this.backspaceWord.bind(this);
    this.searchBuiltWord = this.searchBuiltWord.bind(this);
    this.searchForWords = this.searchForWords.bind(this);
    this.heisig = heisigToKanji.entries;
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

  searchForWords(word) {
　　console.log(word)
    let fuse = new Fuse(this.heisig, this.heisigSearchOptions);
    let heisigSearchResults = fuse.search(word)
    let heisigResults = []
    if (heisigSearchResults.length != 0) {

      heisigResults = heisigSearchResults.slice(0,5).map((result) => {
        var wordEntry = result['heisig']
        var kanji = result['kanji']
        return [ wordEntry , kanji]
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
       }).map((result) =>{
         console.log(result)
          var wordEntry = result[0]['heisig']
          var kanji = result[0]['kanji']
          return [wordEntry, kanji]
       })

       console.log(kanjiResults)

        heisigResults = kanjiResults.concat(heisigResults);
        heisigResults = [...new Set(heisigResults)]

      // heisigResults = heisigResults.slice(0,5)
      console.log(heisigResults)
    this.loading.className = "fetching";


    fetch(`https://ancient-sands-74909.herokuapp.com/?keyword=${word}`, { mode: 'cors' }).then((res) => {
      let that = this;

      res.json().then(function (resJson) {
        that.loading.className = "fetching hiddenBlock";

        let jsonResponse = {};
        jsonResponse = resJson.data;
        that.setState({ fetching: '', dictionaryResults: jsonResponse, heisigResults, error: '', searched: true });
      });
    }).catch((err) => {
      this.loading.className = "fetching hiddenBlock";

      this.setState({
        
        error: `I cannot breve: ${err}`
      });
    });
  }

  buildWord(word) {
    let newBuiltWord = this.state.builtWord.concat([word]);
    this.setState({builtWord: newBuiltWord});
  }

  builtWordChange = (e) => {
    console.log(e.target)
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

  searchBuiltWord() {
    //Figure out how to work with Heisig Result backwards
    this.loading.className = "fetching";
    let that = this;
    let builtWord = this.state.builtWord;
    fetch(`https://ancient-sands-74909.herokuapp.com/?keyword=${builtWord}`, { mode: 'cors' }).then((res) => {
      res.json().then(function (resJson) {
        that.loading.className = "fetching hiddenBlock";

        let jsonResponse = {};
        jsonResponse = resJson.data;
        that.setState({ fetching: '', dictionaryResults: jsonResponse, heisigResults: {},error: '', searched: true });
      });
    }).catch((err) => {
      this.loading.className = "fetching hiddenBlock";

      this.setState({ error: `I cannot breve: ${err}`});
    });
  }


  render() {
    console.log(this.state.fetching);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Heisig-Jisho Word Builder</h1>
        </header>
        
        <SearchBar submitHandler={this.searchForWords}/>
        <BuiltWord 
          builtWordChange={this.builtWordChange}
          builtWord={this.state.builtWord} 
          backspaceWord={this.backspaceWord}
          clearWord={this.clearWord} 
          searchBuiltWord={this.searchBuiltWord}/>
          <div ref={(input) => {this.loading = input;}} className="fetching hiddenBlock">
            <p>Fetching Data...</p>
          </div>
        <div className="error">
          <p>{this.state.error !== '' ? this.state.error : ''}</p>
        </div>
        <DictionaryEntryIndex 
          searchForWords={this.searchForWords}
          buildWord={this.buildWord}
          dictionaryEntries={this.state.dictionaryResults} 
          heisigEntries={this.state.heisigResults}
          searched={this.state.searched} />
        <div className="footer">
          <p>This site uses some heisig json and the Official Unofficial Jisho.org API</p>
          <p> Andrew Tae 2018 </p>
        </div>
      </div>
    );
  }
}

export default App;
