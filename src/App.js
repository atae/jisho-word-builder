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
    this.state = {dictionaryResults: {}, builtWord: [], heisigResult: {}, searched: false};
    this.buildWord = this.buildWord.bind(this);
    this.clearWord = this.clearWord.bind(this);
    this.searchForWords = this.searchForWords.bind(this);
    this.heisig = heisigToKanji;
  }

  searchForWords(word) {
    let heisigResult = {};
    if (this.heisig[word.toLowerCase()]) {
      heisigResult[word.toLowerCase()] = this.heisig[word.toLowerCase()];
    }
    

    fetch(`http://localhost:8080/?keyword=${word}`, { mode: 'cors' }).then((res) => {
      let that = this;
      res.json().then(function (resJson) {
        let jsonResponse = {};
        jsonResponse = resJson.data;
        that.setState({ dictionaryResults: jsonResponse, heisigResult, searched: true });
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

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <SearchBar submitHandler={this.searchForWords}/>
        <BuiltWord buildWord={this.buildWord} clearWord={this.clearWord} />
        <DictionaryEntryIndex 
          dictionaryEntries={this.state.dictionaryResults} 
          heisigEntry={this.state.heisigResult}
          searched={this.state.searched} />
        
      </div>
    );
  }
}

export default App;
