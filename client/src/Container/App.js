import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from '../components/Header';
import Home from './Home';
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
}

render() {
  return (
    <div className="container">
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/" component={Home} />
              <Route path="/admin/add" component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}
}


export default connect(null,actions)(App);
