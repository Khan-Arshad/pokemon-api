import React, { Component } from 'react';
import Pokedex from './components/Pokedex';
import Display from './components/Display';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: {},
      offset: 1,
      loadNumber: 1,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  getNext() {
    return this.state.offset + this.state.loadNumber;
  }

  handleClick(event) {
    const newOffset = this.getNext();
    this.setState({ offset: newOffset }, () => {
      console.log('Pokemon Number: ' + this.state.offset);
      this.getMorePokemon();
    });
  }

  componentDidMount() {
    this.getMorePokemon();
  }

  getMorePokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon/' + this.state.offset + '/')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ pokemon: data });
      });
  }

  render() {
    return (
      <div>
        <Display />

        <div className='container'>
          <div className='card-columns'>
            <Pokedex pokemon={this.state.pokemon} />
          </div>
        </div>
        <button
          type='button'
          className='btn btn-secondary btn-block'
          key='more-button'
          id='more-button'
          onClick={this.handleClick}
        >
          Load Next
        </button>
      </div>
    );
  }
}

export default App;
