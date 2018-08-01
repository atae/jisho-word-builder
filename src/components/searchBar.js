import React, { Component } from 'react';
import "../Search.css";
class SearchBar extends Component{  
    constructor(props){
        super(props);
        this.state = {
            searchWord: ''
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler() {
        this.setState({
            searchWord: this.searchBarWord.value
        });
    }

    render() {
        return(
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.submitHandler(this.state.searchWord);
                }} className="search">         
                    <input
                    maxlength="255" 
                    type="text"
                    onChange={this.onChangeHandler}
                    ref={(input) => { this.searchBarWord = input; }} 
                    value={this.state.searchWord}/>
                    <div className="formButtons">
                        <button type="submit" > Search
                        </button>
                        <button type="button"  className="clear-search" onClick={this.props.clearSearch}>Clear</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;