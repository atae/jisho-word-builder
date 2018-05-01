import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/searchBar';
import BuiltWord from './components/builtWord';
import DictionaryEntryIndex from './components/dictionaryEntryIndex';
import heisigToKanji from './heisigToKanji.json';
// import kanjiToHeisig from 'kanjiToHeisig.json';


class App extends Component {
  constructor() {
    super();
    //Add mouseover on Kanji to show Heisig keyword
    this.state = {fetching: '', dictionaryResults: {}, builtWord: [], heisigResult: {}, searched: false, error: ''};
    this.buildWord = this.buildWord.bind(this);
    this.clearWord = this.clearWord.bind(this);
    this.backspaceWord = this.backspaceWord.bind(this);
    this.searchBuiltWord = this.searchBuiltWord.bind(this);
    this.searchForWords = this.searchForWords.bind(this);
    this.heisig = heisigToKanji;
  }

  searchForWords(word) {
    let heisigResult = {};
    if (this.heisig[word.toLowerCase()]) {
      heisigResult[word.toLowerCase()] = this.heisig[word.toLowerCase()];
    }
    this.loading.className = "fetching";


    fetch(`https://ancient-sands-74909.herokuapp.com/?keyword=${word}`, { mode: 'cors' }).then((res) => {
      let that = this;

      res.json().then(function (resJson) {
        that.loading.className = "fetching hiddenBlock";

        let jsonResponse = {};
        jsonResponse = resJson.data;
        that.setState({ fetching: '', dictionaryResults: jsonResponse, heisigResult, error: '', searched: true });
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
    let builtWord = this.state.builtWord.join('');
    fetch(`https://ancient-sands-74909.herokuapp.com/?keyword=${builtWord}`, { mode: 'cors' }).then((res) => {
      res.json().then(function (resJson) {
        that.loading.className = "fetching hiddenBlock";

        let jsonResponse = {};
        jsonResponse = resJson.data;
        that.setState({ fetching: '', dictionaryResults: jsonResponse, heisigResult: {},error: '', searched: true });
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
          builtWord={this.state.builtWord} 
          backspaceWord={this.backspaceWord}
          clearWord={this.clearWord} 
          searchBuiltWord={this.searchBuiltWord}/>
          <div ref={(input) => {this.loading = input;}} className="fetching hiddenBlock">
            <p>Fetching Data...</p>
          </div>
        <div className="error">
          <p>{this.state.error != '' ? this.state.error : ''}</p>
        </div>
        <DictionaryEntryIndex 
          searchForWords={this.searchForWords}
          buildWord={this.buildWord}
          dictionaryEntries={this.state.dictionaryResults} 
          heisigEntry={this.state.heisigResult}
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
