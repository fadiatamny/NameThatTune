import React from 'react'
import { HashLink as Link } from "react-router-hash-link";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./fonts/fontawesome/css/font-awesome.min.css";
import "./css/style.css";
import "./css/mainmenu.css";
import "./css/responsive.css";
import CacheHandler from './interfaces/CacheHandler';
import { Modal, Button } from 'react-bootstrap';

function MainMenu(props) {

  let room = '';
  const [modalShow, setModalShow] = React.useState(false);

  React.useEffect(() => {
    if (!CacheHandler.verifyCache('logged-in'))
      props.history.push('/');
  }, []);

  function logOut() {
    CacheHandler.clearCache();
    props.history.push('/');
  };

  function joinRoom(){
    sessionStorage.setItem('inGame', true);
    props.history.push(`/Game/${room}`);
  }

  return (
    <div className="select_join_room">
      <div className="select_join">
        <div className="select_join_area redshade box-shadow">
          <div className="logo_mini">
            <img
              src={require("../components/images//logo.png")}
              alt="GameApp Logo"
            />
          </div>
          <div className="create_room">
            <Link onClick={() => { sessionStorage.setItem('inGame', true); }} to={{ pathname: "./Game", state: { owner: true } }}>Create Room</Link>
          </div>
          <div className="join_room">
            {/* <Link onClick={() => { sessionStorage.setItem('inGame', true); }} room={room} to={{ pathname: "./Game", state: { user: true } }}>Join Room</Link> */}
              <a href="#" className="join_room" onClick={() => setModalShow(true)}>
                Join Room
              </a>
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={(e) => {setModalShow(false); joinRoom();}}
                onChange={(e)=>{ room = e.target.value;}}
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

export default MainMenu;


function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <label htmlFor="recipient-name" className="col-form-label">Room ID :</label>
        <input type="text" className="form-control" id="recipient-name" onChange={props.onChange} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Join</Button>
      </Modal.Footer>
    </Modal>
  );
}