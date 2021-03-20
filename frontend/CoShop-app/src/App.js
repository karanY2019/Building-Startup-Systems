import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import './app.sass';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="title">CoShop</h1>

        <p className="subtitle">
          Collaborative Shopping{' '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox">
            Flexbox
          </a>
        </p>

        <div className="field">
          <div className="control">
            <input className="input" type="text" placeholder="Input" />
          </div>
        </div>

        <div className="field">
          <p className="control">
            <span className="select">
              <select>
                <option>Select dropdown</option>
              </select>
            </span>
          </p>
        </div>

        <div className="buttons">
          <a className="button is-primary">Signin</a>
          <a className="button is-link"></a>
        </div>
      </div>
    );
  }
}

export default App;