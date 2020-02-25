import React, { Component } from 'react'
import { HashLink as Link } from "react-router-hash-link";
import "bootstrap/dist/css/bootstrap.min.css";
import "./fonts/fontawesome/css/font-awesome.min.css";
import "./css/style.css";
import "./css/chat.css";

class Chat extends Component {

    render() {


        return (
          <div className="chat greenshade">
            <Link to="./gues_song" className="back_arrow">
              <img src={require("../components/images/navi-chat1.png")} />
            </Link>
            <div className="chat_area hidden-xs">
              <div className="chat_users">
                <div className="title_page">
                  <img src={require("../components/images/plus.png")} />
                  <span>Playlists </span>
                </div>

                <ul className="chats">
                  <li>
                    <a href="">
                      <img src={require("../components/images/Mask.png")} />
                      <div className="name">
                        <span className="username">Cynthia Soto</span>
                        <div className="desc">Lorem ipsum dolor sit</div>
                      </div>
                    </a>
                  </li>
                  <li className="active_chat">
                    <a href="">
                      <img src={require("../components/images/Mask-1.png")} />
                      <div className="name">
                        <span className="username">Cynthia Soto</span>
                        <div className="desc">Lorem ipsum dolor sit</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <img src={require("../components/images/Mask-2.png")} />
                      <div className="name">
                        <span className="username">Cynthia Soto</span>
                        <div className="desc">Lorem ipsum dolor sit</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <img src={require("../components/images/Mask-3.png")} />
                      <div className="name">
                        <span className="username">Cynthia Soto</span>
                        <div className="desc">Lorem ipsum dolor sit</div>
                      </div>
                    </a>
                  </li>
                  <li className="nothing">
                    <a href=""></a>
                  </li>
                </ul>
              </div>

              <div className="read_chat">
                <div className="chat_users2">
                  <ul className="new_chats">
                    <li>
                      <a href="">
                        <img src={require("../components/images/Mask.png")} />
                        <div className="name">
                          <span className="username">Cynthia Soto</span>
                          <div className="desc">Lorem ipsum dolor sit</div>
                        </div>
                      </a>
                    </li>
                    <li className="readed">
                      <a href="">
                        <img src={require("../components/images/Mask-1.png")} />
                        <div className="name">
                          <span className="username">Cynthia Soto</span>
                          <div className="desc">Lorem ipsum dolor sit</div>
                        </div>
                      </a>
                    </li>
                    <li className="readed">
                      <a href="">
                        <img src={require("../components/images/Mask-2.png")} />
                        <div className="name">
                          <span className="username">Cynthia Soto</span>
                          <div className="desc">Lorem ipsum dolor sit</div>
                        </div>
                      </a>
                    </li>
                    <li className="readed">
                      <a href="">
                        <img src={require("../components/images/Mask-3.png")} />
                        <div className="name">
                          <span className="username">Cynthia Soto</span>
                          <div className="desc">Lorem ipsum dolor sit</div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img src={require("../components/images/Mask-3.png")} />
                        <div className="name">
                          <span className="username">Cynthia Soto</span>
                          <div className="desc">Lorem ipsum dolor sit</div>
                        </div>
                      </a>
                    </li>
                    <li className="nothing">
                      <a href=""></a>
                    </li>
                  </ul>
                </div>
                <div className="reading_message hidden-xs redshade">
                  <img src={require("../components/images/Mask.png")} />
                  <div className="name">
                    <div className="message">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod
                    </div>
                    <span className="username">Cynthia Soto</span>
                    <span className="online_status">Just Now</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="chat_area show-xs">
              <div className="chat_users">
                <div className="title_page">
                  <span>Filters </span>
                </div>
                <ul className="chats  selected_chat">
                  <li>
                    <Link to="./read_chat">
                      <img src={require("../components/images/Mask.png")} />
                      <div className="name">
                        <span className="username">Cynthia Soto</span>
                        <div className="desc">Lorem ipsum dolor sit</div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="chat_users">
                <div className="title_page">
                  <img src={require("../components/images/plus.png")} />
                  <span>Playlists </span>
                </div>

                <ul className="chats">
                  <li>
                    <Link to="./read_chat">
                      <img src={require("../components/images/Mask.png")} />
                      <div className="name">
                        <span className="username">Cynthia Soto</span>
                        <div className="desc">Lorem ipsum dolor sit</div>
                      </div>
                    </Link>
                  </li>
                  <li className="active_chat">
                    <Link to="./read_chat">
                      <img src={require("../components/images/Mask-1.png")} />
                      <div className="name">
                        <span className="username">Cynthia Soto</span>
                        <div className="desc">Lorem ipsum dolor sit</div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="./read_chat">
                      <img src={require("../components/images/Mask-2.png")} />
                      <div className="name">
                        <span className="username">Cynthia Soto</span>
                        <div className="desc">Lorem ipsum dolor sit</div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="./read_chat">
                      <img src={require("../components/images/Mask-3.png")} />
                      <div className="name">
                        <span className="username">Cynthia Soto</span>
                        <div className="desc">Lorem ipsum dolor sit</div>
                      </div>
                    </Link>
                  </li>
                  <li className="nothing">
                    <a href=""></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );}

}

export default Chat;