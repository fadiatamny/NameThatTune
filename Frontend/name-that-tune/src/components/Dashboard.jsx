import React from 'react'
import CacheHandler from './interfaces/CacheHandler';
import "bootstrap/dist/css/bootstrap.min.css";
import "./fonts/fontawesome/css/font-awesome.min.css";
import "./css/style.css";
import "./css/chat.css";
import Axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import Moment from 'react-moment';
import PlaylistComponent from './PlaylistComponent';
import { Modal, Button } from 'react-bootstrap';


const testendpoint = 'http://localhost:1337';
const endpoint = 'https://name-that-tune-2020.herokuapp.com';

const Dashboard = (props) => {

    const [playlists, setPlaylists] = React.useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = React.useState({});
    const [modalShow, setModalShow] = React.useState(false);

    const playlist = { id:'', playlistName: '', songs:[]};

    React.useEffect(() => {
        if (!CacheHandler.verifyCache('logged-in') || !CacheHandler.verifyCache('Admin')) {
            props.history.push('/');
        }
        else {
            Axios.get(`${testendpoint}/playlist/`)
                .then(res => setPlaylists(res.data))
                .catch(err => console.log(err));
        }
    }, []);

    const logout = () => {
        CacheHandler.clearCache();
        props.history.push('/');
    };

    const insertPlaylist = async () => {
        try{
            console.log(playlist);
            let res = await Axios.post(`${testendpoint}/playlist`,playlist);
            res = await Axios.get(`${testendpoint}/playlist/`);
            console.log(res.data);
            setPlaylists(res.data);
        }catch(err){
            console.log(err);
        }
    };
    const setCurrent = (item) => {
        setSelectedPlaylist(item);
    };

    return (
        <div className="chat greenshade">
            <a onClick={logout} className="back_arrow">
                <img src={require("../components/images/navi-chat1.png")} />
            </a>
            <div className="chat_area">
                <div className="chat_users">

                    <div className="title_page">
                        {playlists.length > 0 ? <div>
                            <span style={{ marginRight: 15 }}>Playlists </span>
                            <FaPlus className='insert-icon' onClick={() => setModalShow(true)} />
                            <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={(e) => { setModalShow(false); if(playlist.id != '' && playlist.name != '') insertPlaylist(); }}
                            onChange={(e) => { 
                                if(e.target.name ==='id') playlist.id = e.target.value; 
                                if(e.target.name === 'name') playlist.playlistName = e.target.value; 
                                if(e.target.name === 'json'){
                                    let x; 
                                    if((x =JSON.parse(e.target.value)).length!= 0) playlist.songs = x; 
                                }}}
                            closemodal={setModalShow}
                            />
                        </div> 
                        : <span>No Playlists </span>}
                    </div>

                    <ul className="chats">
                        {playlists.map((item, index) => (
                            <li key={item.id}>
                                <a href="" onClick={(e) => { e.preventDefault(); setCurrent(item); }}>
                                    <div className="name" style={index === 0 ? { marginTop: 15 } : {}} style={index + 1 >= playlists.length ? { marginTop: 5, marginBottom: 15 } : {}}>
                                        <span className="username">{item.name}</span>
                                        <div className="desc">Number of songs: {item.songs.length} <br /><br /> Created At: <Moment format="DD/MM/YY HH:mm">{item.createdAt}</Moment></div>
                                        {index + 1 !== playlists.length ? <div className="seperator"></div> : ''}
                                    </div>
                                </a>
                            </li>))}
                    </ul>
                </div>
            </div>
            <div className="playlist hidden-xs">
                {Object.entries(selectedPlaylist).length !== 0 ? <PlaylistComponent playlist={selectedPlaylist} /> : ''}
            </div>
        </div >
    )
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
          <label htmlFor="recipient-id" className="col-form-label">Playlist ID :</label>
          <input name="id" type="text" className="form-control" id="recipient-id" onChange={props.onChange} />
          <label htmlFor="recipient-name" className="col-form-label">Playlist Name :</label>
          <input name="name" type="text" className="form-control" id="recipient-name" onChange={props.onChange} />
          <label htmlFor="recipient-field" className="col-form-label">JSON array of songs format<br/>{"[{ songName: '' ,videoID: '' }]"} :</label>
          <textarea placeholder="[{ songName: '' ,videoID: '' }]" name="json" type="text" style={{height:'15vh'}} className="form-control" id="recipient-field" onChange={props.onChange} />
          <Button onClick={props.onHide} style={{ float: 'right', marginTop: 10 }}>Join</Button>
          <Button onClick={()=>{props.closemodal(false)}} style={{ float: 'right', marginTop: 10 , marginRight: 5}}>Close</Button>
        </Modal.Body>
      </Modal>
    );
  }

export default Dashboard;