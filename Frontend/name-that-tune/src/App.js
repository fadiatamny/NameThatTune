import React from 'react';
import logo from './logo.svg';
import './App.scss';
import io from 'socket.io-client';

import loginPage from './pages/auth/loginPage'
import registerPage from './pages/auth/registerPage'
import gamePage from './pages/game/gamePage'
import gameLobbyPage from './pages/game/gameLobbyPage'
function App() {
  return (
    <div className="App">
      <MetaTags>
        <title>GameApp</title>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </MetaTags>

      <Router>
        <div>
          <Route exact path="/" component={ login } />
          <Route path="/register" component={ register } />
          {/* <Route path="/join_room" component={Select_join_room} /> */}
          <Route path="/game" component={ gamePage } />
          <Route path="/game/lobby" component={ gameLobbyPage } />
          {/* <Route path="/chat" component={Chat} />
          <Route path="/read_chat" component={ReadChat} /> */}
        </div>
      </Router>
    </div>
  );
}

export default App;
