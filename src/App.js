import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/searchBar';
import BuiltWord from './components/builtWord';
import DictionaryEntryIndex from './components/dictionaryEntryIndex';


class App extends Component {
  constructor() {
    super();
    this.state = {dictionaryResults: {}, builtWord: []};
    this.buildWord = this.buildWord.bind(this);
    this.clearWord = this.clearWord.bind(this);
    this.searchForWords = this.searchForWords.bind(this);
  }

  searchForWords(word) {
    console.log(word);
    fetch(`http://localhost:8080/?keyword=${word}`, { mode: 'cors' }).then((res) => {
      let that = this;
      res.json().then(function (resJson) {
        let jsonResponse = {};
        jsonResponse = resJson.data;
        that.setState({ dictionaryResults: jsonResponse });
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
    console.log(this.state.dictionaryResults);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <SearchBar submitHandler={this.searchForWords}/>
        <BuiltWord buildWord={this.buildWord} clearWord={this.clearWord} />
        <DictionaryEntryIndex dictionaryEntries={this.state.dictionaryResults}/>
        
      </div>
    );
  }
}

export default App;
