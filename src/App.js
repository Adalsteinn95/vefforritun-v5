import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Route, Link, Switch } from 'react-router-dom'

import './App.css';

import Home from './components/home';
import School from './components/school';
import Navigation from './components/navigation';
import NotFound from './components/not-found';

class App extends Component {
  render() {
    return (
      <main className="app">
        <Navigation url={process.env.REACT_APP_SERVICE_URL}/>
        <section>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/:department" component={School} />
            <Route component={NotFound} />
          </Switch>
        </section>
      </main>
    );
  }
}

export default App;
