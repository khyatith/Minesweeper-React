import React, { Component } from 'react';
import Minesweeper from './components/Minesweeper';
import './styles/styles.css';

class App extends Component {
  render() {
    return (
      <div>
        <Minesweeper />
      </div>
    );
  }
}

export default App;
