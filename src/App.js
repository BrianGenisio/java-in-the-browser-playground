import React, { Component } from 'react';
import './App.css';

import {init as initJava} from './engine/compile-java.js';
import IDE from './components/ide.js';

initJava();

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Java Playground</h1>
        </header>
        <IDE/>
      </div>
    );
  }
}

export default App;
