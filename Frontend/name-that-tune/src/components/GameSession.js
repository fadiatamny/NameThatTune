import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./fonts/fontawesome/css/font-awesome.min.css";
import { HashLink as Link } from "react-router-hash-link";
import { Media, Player, controls } from 'react-media-player';
import "./css/guess_song.css";
import CustomControlls from './CustomControlls';

function GameSession(props) {
  const { PlayPause, MuteUnmute } = controls;
  const song = JSON.parse(sessionStorage.getItem('song'));
  const url = `http://www.youtube.com/embed/${song.vid}`;
  
  return (
    <div className="gues_that_song greenshade">
      <Link to="./MainMenu" className="back_arrow">
        <i className="fa fa-long-arrow-left"></i>
      </Link>

      <div className="gues_that_song_area">
        <div className="gues_song">
          <Media vendor={'youtube'} autoPlay={true}>
            <div className="media">
              <div className="media-player" style={{display: 'none'}}>
                <Player src={url} />
              </div>
              <div className="media-controls">
              <img
              src={require("../components/images/voice_message.png")}
              />
                <CustomControlls />
                {/* <MuteUnmute /> */}
              </div>
            </div>
          </Media>
          <div className="title_page">guess that song !</div>
          {/* <div className="image_song">
            <img
              src={require("../components/images/voice_message.png")}
            />
          </div> */}
        </div>
        <div className="songs_area">
          <div className="d-flex justify-content-center">
            {
              JSON.parse(sessionStorage.getItem('options')).map((item, index) => (
                <a href="#" key={index} onClick={props.guessSong}>
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
