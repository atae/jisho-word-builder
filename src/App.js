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
import createHistory from 'history/createBrowserHistory';
// import kanjiToHeisig from 'kanjiToHeisig.json';


class App extends Component {
  constructor() {
    super();
    //Add mouseover on Kanji to show Heisig keyword
   
    this.initialHistory = localStorage.getItem('hiyokoHistory') === null ? [] : localStorage.getItem('hiyokoHistory').split(',');
 
    this.state = { 
      fetching: '', 
      searchHistory : this.initialHistory[0] === "" ? [] : this.initialHistory,  
      dictionaryResults: {}, 
      builtWord: "", 
      heisigResults: {}, 
      searched: false, 
      error: ''};
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

    this.browserHistory = createHistory();
    this.location = this.browserHistory.location;
    this.appName = 'Hiyoko Jisho'
  }

 

  isKanji = (ch) => {
    return !!ch.match(/[\u4E00-\u9FAF\u3040-\u3096\u30A1-\u30FA\uFF66-\uFF9D\u31F0-\u31FF]/);
  }

  componentDidMount() {
    window.scrollTo(0,0)
    // window.onpopstate = this.onBackButtonEvent;
    document.title = this.appName
    let unlisten = this.browserHistory.listen((location, action) => {
      console.log(action, location.pathname)
      if (action === 'POP') {
        // console.log('back');
        this.searchForWords(location.pathname.slice(1), false, 'false');
      }

    })
    this.redirectToPathName();
    console.log('mounties')
  }

  redirectToPathName = () => {
    if (window.location.pathname != "/") {
      let word = decodeURIComponent(window.location.pathname.slice(1))
      this.searchForWords(word);
    }
  }

  addToHistory = (word, searchMode, push) => {
    let newHistory = this.state.searchHistory
    if (word != '') {
      if (newHistory.includes(word)) {
        newHistory.splice( newHistory.indexOf(word), 1);
      } 
      newHistory = [word].concat(newHistory)
      
    }

    localStorage.setItem('hiyokoHistory', newHistory);
    if (push !== 'false') {

      this.browserHistory.push('/' + word);
    }
    return newHistory
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
    return heisigResults
  }

  searchForWords(word, searchMode, push) {
    console.log('called')
    let heisigResults = this.searchHeisig(word)


    this.loading.className = "fetching";


    fetch(`https://ancient-sands-74909.herokuapp.com/?keyword=${word}`, { mode: 'cors' }).then((res) => {
      let that = this;

      res.json().then(function (resJson) {
        that.loading.className = "fetching hiddenBlock";

        let jsonResponse = {};
        jsonResponse = resJson.data;
     
        let newHistory = that.addToHistory(word, searchMode, push);

        window.scrollTo(0, 0)
        document.title = word + ' - ' + that.appName;
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
        let newHistory = that.addToHistory(builtWord);
        document.title = builtWord + ' - ' + that.appName;

        // let newHistory = that.state.searchHistory.concat(builtWord)
        window.scrollTo(0, 0)


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
    localStorage.setItem('hiyokoHistory', [])
    this.setState({searchHistory: []})
  }

  render() {
    let splashMessage = this.generateSplashMessage()
    // <img src={logo} className="App-logo" alt="logo" />
    return (
      <div className="App">
        <header className="App-header">
          <h1>雛</h1>
          <h2>Hiyoko Jisho</h2>
          <h3>Intermediate Japanese Word Builder Dictionary</h3>
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
          <p>Issues? New Feature Ideas? <a href="https://github.com/atae/jisho-word-builder/issues " target="_blank" rel='noreferrer noopener'> Support/Issues </a> </p>
          
          <a href="https://github.com/atae/jisho-word-builder" target="_blank" rel='noreferrer noopener'> Hiyoko Jisho Github </a> <br/> <br/>
          <a href="https://www.github.com/atae/" target="_blank" rel='noreferrer noopener'> Andrew Tae</a>

        </div>
      </div>
    );
  }
}

export default App;
