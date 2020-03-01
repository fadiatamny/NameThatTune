import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./fonts/fontawesome/css/font-awesome.min.css";
import { Media, Player } from 'react-media-player';
import "./css/game_session.css";
import "./css/game_lobby.css";
import CustomControlls from './CustomControlls';
import _ from 'lodash';
import { FaLocationArrow } from 'react-icons/fa';

const GameSession = (props) => {

  const song = JSON.parse(sessionStorage.getItem('song'));
  const url = `http://www.youtube.com/embed/${song.vid}?autoplay=1`;

  let message = '';

  const sendMessage = () => {
    props.socket.emit('sendMessage', sessionStorage.getItem('room'), sessionStorage.getItem('username'), message);
  };

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
                  {item.length > 20 ? item.slice(0,20) : item+'...'}
                </a>
              ))
            }
          </div>
        </div>
      </div>
      <div>
        <div className="chat-box-field d-flex blueshade justify-content-center">
          <input name="name" type="text" className="form-control" id="recipient-name" placeholder="Message..." onChange={e => message = e.target.value} />
          <FaLocationArrow className="send-message" onClick={sendMessage} />
        </div>
      </div>
    </div>
  );
}

export default GameSession;
