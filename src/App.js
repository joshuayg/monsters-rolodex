import React, { Component } from 'react';
import { CardList } from './components/card-list/card-list.component'
import { SearchBox } from './components/search-box/search-box.component'
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };

    // to set the 'this' context
    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));

    // (async () => {
    //   var response = await fetch('https://jsonplaceholder.typicode.com/users');
    //   this.setState({ monsters: await response.json() });
    // })();
  }

  // class method way; then you have to bind 'this'
  // handleChange(e) {
  //   this.setState({ searchField: e.target.value }, () => console.log(this.state.searchField));
  // }

  // or you can use arrow function; then you don't have to bind
  handleChange = (e) => {
    this.setState({ searchField: e.target.value }, () => console.log(this.state.searchField));
  }

  render() {
    const { monsters, searchField } = this.state;
    // const monsters = this.state.monsters;

    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder='Search Monsters'
          handleChanges={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
