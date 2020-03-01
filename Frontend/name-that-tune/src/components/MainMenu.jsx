import React from 'react'
import { HashLink as Link } from "react-router-hash-link";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./fonts/fontawesome/css/font-awesome.min.css";
import "./css/style.css";
import "./css/mainmenu.css";
import "./css/responsive.css";
import CacheHandler from './interfaces/CacheHandler';
import { Modal, Button } from 'react-bootstrap';
import Axios from 'axios';

const localhostplace = 'http://localhost:1337';
const endpoint = 'https://name-that-tune-2020.herokuapp.com';

const MainMenu = (props) => {

  let room = '';
  const [modalShow, setModalShow] = React.useState(false);
  const [choiceModal, setChoiceModal] = React.useState(false);

  React.useEffect(() => {
    if (!CacheHandler.verifyCache('logged-in') || CacheHandler.verifyCache('Admin'))
      props.history.push('/');
    else
      NotificationManager.info('System Message', `Welcome !`, 1000);
  }, []);

  const logOut = () => {
    NotificationManager.info('System Message', `Goodbye !`, 1000);
    CacheHandler.clearCache();
    props.history.push('/');
  };

  const joinRoom = () => {
    CacheHandler.setCache('inGame', true);
    props.history.push(`/Game/${room}`);
  };

  const selectPlaylist = (id) => {
    CacheHandler.setCache('playlistID',id);
    CacheHandler.setCache('inGame', true);
    CacheHandler.setCache('Owner',true);
    props.history.push(`/Game`);
  };

  return (
    <div className="menu">
      <div className="menu-area">
        <div className="menu-box redshade box-shadow">
          <div className="logo_mini">
            <img
              src={require("../components/images/logo.png")}
              alt="GameApp Logo"
            />
          </div>
          <div className="option-select">
            {/* <Link onClick={() => { CacheHandler.setCache('inGame', true); }} to={{ pathname: "./Game", state: { owner: true } }}>Create Room</Link> */}
            <a href="#" className="option-select" onClick={() => setChoiceModal(true)}>
              Create Room
              </a>
            <ChoiceModal
              show={choiceModal}
              onHide={(e) => { setChoiceModal(false); }}
              onChange={(e) => { }}
              selectPlaylist={selectPlaylist}
              closemodal={setChoiceModal}
            />
          </div>
          <div className="option-select">
            <a href="#" className="option-select" onClick={() => setModalShow(true)}>
              Join Room
              </a>
            <MainModal
              show={modalShow}
              onHide={(e) => { setModalShow(false); if (room != '') joinRoom(); }}
              onChange={(e) => { room = e.target.value; }}
              closemodal={setModalShow}
            />
          </div>
        </div>
      </div>

      <div onClick={logOut} className="logout greenshade">
        Logout
      </div>
    </div>
  );
}

function MainModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="orangeshade">
        <label htmlFor="recipient-name" className="col-form-label">Room ID :</label>
        <input type="text" className="form-control" id="recipient-name" placeholder="Th1s1sMyr00mK3y" onChange={props.onChange} />
        <Button onClick={props.onHide} style={{ float: 'right', marginTop: 10 }}>Join</Button>
        <Button onClick={() => { props.closemodal(false) }} style={{ float: 'right', marginTop: 10, marginRight: 5 }}>Close</Button>
      </Modal.Body>
    </Modal>
  );
}

function ChoiceModal(props) {
  const [playlist, setPlaylist] = React.useState([]);

  React.useEffect(() => {
    Axios.get(`${endpoint}/playlist`)
      .then(res => setPlaylist(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="orangeshade">
        {playlist.length != 0 ? playlist.map((item, index) => (
          <div class="in-modal" key={index} style={{ cursor: 'pointer' }} onClick={() => { props.selectPlaylist(item.id); props.closemodal(false); }}>
            <hr />
            <p style={{ fontSize: 24, margin: '10px 0px' }}>{item.name}</p>
            <p style={{ fontSize: 16, margin: '10px 5px' }}>Song Count: {item.songs.length}</p>
            <hr />
          </div>
        )) : ''}
        <Button onClick={() => { props.closemodal(false) }} style={{ float: 'right', marginTop: 10, marginRight: 5 }}>Close</Button>
      </Modal.Body>
    </Modal>
  );
}

export default MainMenu;