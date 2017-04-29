import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import CommentsModule from './components/CommentsModule.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CommentsModule/>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
