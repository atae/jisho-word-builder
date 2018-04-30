import React, { Component } from 'react';

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
                <form>
                    <input 
                    type="text"
                    onChange={this.onChangeHandler}
                    ref={(input) => { this.searchBarWord = input; }} 
                    value={this.state.searchWord}/>
                    <button onClick={(e) => {
                        e.preventDefault();
                        this.props.submitHandler(this.state.searchWord);}} >
                        Search
                    </button>
                </form>
            </div>
        );
    }
}

export default SearchBar;