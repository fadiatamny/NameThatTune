import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashLink as Link } from "react-router-hash-link";
import "./fonts/fontawesome/css/font-awesome.min.css";
import "../App.css";
import "./css/game_lobby.css";
import "./css/responsive.css";


function GameLobby(props) {
  let list = JSON.parse(sessionStorage.getItem('playerlist'));
  if(list)
    list = list.length >= props.players.length ? list : props.players;
  else
    list = props.players;
  return (
    <div className="game_loby greenshade">
      <div to="./MainMenu" onClick={props.leaveLobby} className="back_arrow">
        <i className="fa fa-long-arrow-left"></i>
      </div>

      <div className="game_loby_area">
        <div className="invite_code">
          <div className="blueshade"><p className='code justify-content-center'>{sessionStorage.getItem('room')}</p></div>
        </div>
        <div className="main_text">
                <p>
            Get ready to guess some tunes!
                </p>
        </div>
        <div className="d-flex game_users justify-content-center">
          {list.map((item,index) => (
            <div key={index}>
                <img src={require(`../components/images/userIcon.png`)} />
                <p>{item}</p>
            </div>))}
        </div>
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
