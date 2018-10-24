import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.scss';

import Token from './token/Token.jsx';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      authorized: false,
    };
  }

  saveToken = (token) => {
    // TODO: cookies
    this.setState({
      authorized: true,
      token,
    });
  }

  render(){
    let authorized = this.state.authorized;
    return(
      <div className="App">
        <CssBaseline/>
        { !authorized && <Token onAuthorized={this.saveToken}/> }
        { authorized &&
            <p>Авторизация прошла успешна, токен: {this.state.token}</p>
        }
      </div>
    );
  }
}

export default App;
