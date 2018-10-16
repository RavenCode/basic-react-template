import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PermanentDrawer from './components/PermanentDrawer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PermanentDrawer/>
      </div>
    );
  }
}

export default App;
