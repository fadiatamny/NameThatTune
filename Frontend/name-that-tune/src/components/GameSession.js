import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./fonts/fontawesome/css/font-awesome.min.css";
import { HashLink as Link } from "react-router-hash-link";
import "./css/guess_song.css";


function GameSession() {
  return (
    <div className="gues_that_song greenshade">
      <Link to="./MainMenu" className="back_arrow">
        <i className="fa fa-long-arrow-left"></i>
      </Link>

      <div className="gues_that_song_area">
        <div className="gues_song">
          <div className="title_page">gues that song !</div>
          <div className="image_song">
            <img
              src={require("../components/images//voice_message.png")}
            />
          </div>
        </div>
        <div className="songs_area">
          <div className="left_side">
            <ul className="list_songs">
              <li>
                <a href="">
                  <i className="fa fa-heart-o"></i>
                  <br />
                  Quen
                      </a>
              </li>
              <li>
                <a href="" className="active_song">
                  <i className="fa fa-heart-o"></i>
                  <br />
                  gnr
                      </a>
              </li>
              <li>
                <a href="">
                  <i className="fa fa-heart-o"></i>
                  <br />
                  greenday
                      </a>
              </li>
            </ul>
          </div>
          <div className="left_side">
            <ul className="list_songs right_side">
              <li>
                <a href="" className="active_song">
                  <i className="fa fa-heart-o"></i>
                  <br />
                  parasite
                      </a>
              </li>
              <li>
                <a href="">
                  <i className="fa fa-heart-o"></i>
                  <br />
                  profile
                      </a>
              </li>
              <li>
                <a href="">
                  <i className="fa fa-heart-o"></i>
                  <br />
                  profile
                      </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="submit_song">
          <Link to="./chat" className="btn_full blueshade">
            Submit
                </Link>
          <img src={require("../components/images//arrow-chat.png")} />
        </div>
      </div>
    </div>
  );
}

export default GameSession;
