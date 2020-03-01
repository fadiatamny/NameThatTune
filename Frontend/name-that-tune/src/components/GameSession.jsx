import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./fonts/fontawesome/css/font-awesome.min.css";
import { Media, Player } from 'react-media-player';
import "./css/guess_song.css";
import "./css/game_lobby.css";
import CustomControlls from './CustomControlls';
import _ from 'lodash';

const GameSession = (props) => {

  const song = JSON.parse(sessionStorage.getItem('song'));
  const url = `http://www.youtube.com/embed/${song.vid}?autoplay=1`;

  return (
    <div className="gues_that_song greenshade">
      <div className="back_arrow" onClick={props.leaveLobby} style={{cursor:'pointer'}}>
        <i className="fa fa-long-arrow-left"></i>
      </div>

      <div className="gues_that_song_area">
        <div className="gues_song">
          <Media vendor={'youtube'} autoPlay={true}>
            <div className="media">
              <div className="media-player" style={{ display: 'none' }}>
                <Player src={url} autoPlay={true} />
              </div>
              <div className="media-controls">
                <img
                  src={require("../components/images/voice_message.png")}
                />
                <CustomControlls />
              </div>
            </div>
          </Media>
          <div className="title_page">guess that song !</div>
        </div>
        <div className="songs_area">
          <div className="d-flex justify-content-center">
            {
              _.shuffle(JSON.parse(sessionStorage.getItem('options'))).map((item, index) => (
                <a href="#" key={index} onClick={() => {
                  let currSong = JSON.parse(sessionStorage.getItem('song'));
                  if (item === currSong.name) {
                    props.notifyFunc('success','YOU GUESSED CORRECTLY !');
                    props.socket.emit('someoneGuessed', sessionStorage.getItem('room'), sessionStorage.getItem('username'));
                    props.socket.emit('correctGuess', sessionStorage.getItem('room'));
                  }
                }}>
                  <i className="fa fa-heart-o"></i>
                  <br />
                  {item}
                </a>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameSession;
