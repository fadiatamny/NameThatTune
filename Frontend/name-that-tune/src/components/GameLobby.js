import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashLink as Link } from "react-router-hash-link";
import "./fonts/fontawesome/css/font-awesome.min.css";
import "../App.css";
import "./css/game_lobby.css";
import "./css/responsive.css";


function GameLobby(props) {
  
  return (
    <div className="game_loby greenshade">
      <div to="./MainMenu" onClick={props.leaveLobby} className="back_arrow">
        <i className="fa fa-long-arrow-left"></i>
      </div>

      <div className="game_loby_area">
        <div className="invite_code hidden-xs">
          <input
            type="text"
            className="blueshade"
            placeholder="INV CODE"
          />
        </div>
        <div className="main_text">
          Game Lobby
                <p>
                  Get ready to guess some tunes!
                </p>
        </div>
        <ul className="game_users">
          <li>
            <img src={require("../components/images/Oval-2.png")} />
            <p>Sophia</p>
          </li>
          <li>
            <img src={require("../components/images/Oval-1.png")} />
            <p>Sophia</p>
          </li>
          <li>
            <img src={require("../components/images/Oval.png")} />
            <p>Sophia</p>
          </li>
        </ul>
        <div className="start_game">
          <button onClick={props.startGame} className="btn-black start_game_btn">
            State Game !
                </button>
        </div>
      </div>
    </div>
  );
}


export default GameLobby;
