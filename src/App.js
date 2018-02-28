import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const coins = ["Bitcoin", "Ethereum", "BitConnect", "Lisk"];

const URL = "https://api.coinmarketcap.com/v1/ticker/?limit=0";

class Search extends React.Component {
  constructor() {
    super();
    this.searchText = this.searchText.bind(this);
  }

  searchText(event) {
    this.props.onUpdateList(event.target.value);
  }

  render() {
    return (
      <div className="search">
        <form>
          <input
            type="text"
            placeholder="Search..."
            onChange={this.searchText}
          />
        </form>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      filterText: '',
      coins: []
    };
    this.onUpdateList = this.onUpdateList.bind(this);
  }

  onUpdateList(inputText) {
    console.log(this.state.coins);
    this.setState({
      filterText: inputText
    });
  }

  componentDidMount() {
    fetch(URL)
      .then(response => response.json())
      .then(data => this.setState({ coins: data }));
  }

  render() {
    const { coins, filterText } = this.state
    return (
      <div className="container">
        <div className="title">
          <h1>CryptoCurrency</h1>
          <h3>These coins will make you rich...maybe</h3>
          <p>List filter based on user input</p>
        </div>
        <Search
          onUpdateList={this.onUpdateList}
          filterText={this.state.filterText}
        />
        <div className="list">
          {coins.filter(coin =>
            coin.name.toLowerCase().includes(filterText.toLowerCase())).map( coin =>
              <p key={coin.id}>{coin.name}</p>)}
        </div>
      </div>
    )
  }
}

export default App;
