import React, { Component } from "react";
import Helmet from "react-helmet";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import Home from "./components/home";
import School from "./components/school";
import Navigation from "./components/navigation";
import NotFound from "./components/not-found";

class App extends Component {
  render() {
    return (
      <main className="app">
        <Helmet defaultTitle='Forsíða' titleTemplate='%s - Próf'>
          <html lang='is'/>
        </Helmet>
        <Navigation url={process.env.REACT_APP_SERVICE_URL} />
        <section>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:department" component={School} />
            <Route component={NotFound} />
          </Switch>
        </section>
      </main>
    );
  }
}

export default App;
