import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {dictionary_results: {}};
  }

  componentDidMount(){
    fetch('http://localhost:8080/?keyword=mending', { mode: 'cors' }).then((res) => {
      let that = this;
      res.json().then(function(resJson) {
        let jsonResponse = {};
        jsonResponse = resJson.data;
        that.setState({dictionary_results: jsonResponse});
      });

    });
  }

  render() {
    console.log(this.state.dictionary_results);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
