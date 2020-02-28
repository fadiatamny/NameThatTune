import React from 'react'
import { HashLink as Link } from "react-router-hash-link";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./fonts/fontawesome/css/font-awesome.min.css";
import "./css/style.css";
import "./css/mainmenu.css";
import "./css/responsive.css";
import CacheHandler from './interfaces/CacheHandler';
import { Modal, Button } from 'react-bootstrap';

const MainMenu = (props) => {

  let room = '';
  const [modalShow, setModalShow] = React.useState(false);

  React.useEffect(() => {
    if (!CacheHandler.verifyCache('logged-in') || CacheHandler.verifyCache('Admin'))
      props.history.push('/');
  }, []);

  const logOut = () => {
    CacheHandler.clearCache();
    props.history.push('/');
  };

  const joinRoom = () => {
    CacheHandler.setCache('inGame', true);
    props.history.push(`/Game/${room}`);
  }

  return (
    <div className="select_join_room">
      <div className="select_join">
        <div className="select_join_area redshade box-shadow">
          <div className="logo_mini">
            <img
              src={require("../components/images/logo.png")}
              alt="GameApp Logo"
            />
          </div>
          <div className="create_room">
            <Link onClick={() => { CacheHandler.setCache('inGame', true); }} to={{ pathname: "./Game", state: { owner: true } }}>Create Room</Link>
          </div>
          <div className="join_room">
            <a href="#" className="join_room" onClick={() => setModalShow(true)}>
              Join Room
              </a>
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={(e) => { setModalShow(false); if(room != '') joinRoom(); }}
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

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="orangeshade">
        <label htmlFor="recipient-name" className="col-form-label">Room ID :</label>
        <input type="text" className="form-control" id="recipient-name" onChange={props.onChange} />
        <Button onClick={props.onHide} style={{ float: 'right', marginTop: 10 }}>Join</Button>
        <Button onClick={()=>{props.closemodal(false)}} style={{ float: 'right', marginTop: 10 , marginRight: 5}}>Close</Button>
      </Modal.Body>
    </Modal>
  );
}

export default MainMenu;