import React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import MetaTags from 'react-meta-tags';
import Login from './components/Login';
import MainMenu from './components/MainMenu';
import Signup from './components/Signup';
import Game from './components/Game';
import Dashboard from './components/Dashboard';
import { NotificationContainer, NotificationManager } from 'react-notifications';

function App() {
  return (
    <div className="App">
      <MetaTags>
        <title> Name That Tune </title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </MetaTags>

      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/MainMenu" component={MainMenu} />
          <Route path="/Game" component={Game} />
          <Route path="/Dashboard" component={Dashboard} />
          {/* <Route component={ErrorComponent} /> */}
        </div>
      </Router>
      <NotificationContainer />
    </div>
  );
}

export default App;
