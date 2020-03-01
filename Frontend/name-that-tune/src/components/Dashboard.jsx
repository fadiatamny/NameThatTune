import React from 'react'
import CacheHandler from './interfaces/CacheHandler';
import "bootstrap/dist/css/bootstrap.min.css";
import "./fonts/fontawesome/css/font-awesome.min.css";
import "./css/style.css";
import "./css/dashboard.css";
import Axios from 'axios';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Moment from 'react-moment';
import PlaylistComponent from './PlaylistComponent';
import { Modal, Button } from 'react-bootstrap';


const localhostplace = 'http://localhost:1337';
const endpoint = 'https://name-that-tune-2020.herokuapp.com';

const Dashboard = (props) => {

    const [playlists, setPlaylists] = React.useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = React.useState({});
    const [modalShow, setModalShow] = React.useState(false);

    const playlist = { id: '', playlistName: '', songs: [] };

    React.useEffect(() => {
        if (!CacheHandler.verifyCache('logged-in') || !CacheHandler.verifyCache('Admin')) {
            props.history.push('/');
        }
        else {
            Axios.get(`${endpoint}/playlist/`)
                .then(res => setPlaylists(res.data))
                .catch(err => console.log(err));
        }
    }, []);

    const logout = () => {
        CacheHandler.clearCache();
        props.history.push('/');
    };

    const refresh = async () => {
        try {
            let res = await Axios.get(`${endpoint}/playlist/`);
            setPlaylists(res.data);
            setSelectedPlaylist({});
        } catch (err) {
            console.log(err);
        }
    };

    const insertPlaylist = async () => {
        if (isNaN(playlist.id)) return;

        try {
            await Axios.post(`${endpoint}/playlist`, playlist);
            refresh();
        } catch (err) {
            console.log(err);
        }
    };

    const setCurrent = (item) => {
        setSelectedPlaylist(item);
    };

    const deletePlaylist = async (id) => {
        try {
            await Axios.delete(`${endpoint}/playlist/${id}`);
            refresh();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="dashboard greenshade">
            <a onClick={logout} className="back_arrow">
                <img src={require("../components/images/leave-admin.png")} />
            </a>
            <div className="dashboard_area">
                <div className="dashboard_playlists">
                    <div className="title_page">
                        <div>
                            {playlists.length > 0 ? <span style={{ marginRight: 15 }}>Playlists </span> : <span style={{ marginRight: 15 }}>No Playlists </span>}
                            <FaPlus className='insert-icon' onClick={() => setModalShow(true)} />
                            <MainModal
                                show={modalShow}
                                onHide={(e) => { setModalShow(false); if (playlist.id != '' && playlist.name != '') insertPlaylist(); }}
                                onChange={(e) => {
                                    if (e.target.name === 'id') playlist.id = e.target.value;
                                    if (e.target.name === 'name') playlist.playlistName = e.target.value;
                                }}
                                closemodal={setModalShow}
                            />
                        </div>
                    </div>
                    <ul className="dashboards">
                        {playlists.map((item, index) => (
                            <li key={item.id}>
                                <a href="" onClick={(e) => { e.preventDefault(); setCurrent(item); }}>
                                    <div className="name" style={index === 0 ? { marginTop: 15 } : {}} style={index + 1 >= playlists.length ? { marginTop: 5, marginBottom: 15 } : {}}>
                                        <FaMinus className='insert-icon' style={{ float: 'right', marginRight: '3vw', marginTop: '1vh' }} onClick={() => { deletePlaylist(item.id); }} />
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
                {Object.entries(selectedPlaylist).length !== 0 ? <PlaylistComponent refresh={refresh} playlist={selectedPlaylist} /> : ''}
            </div>
        </div >
    )
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
                <label htmlFor="recipient-id" className="col-form-label">Playlist ID :</label>
                <input name="id" type="text" className="form-control" id="recipient-id" placeholder="1234" onChange={props.onChange} />
                <label htmlFor="recipient-name" className="col-form-label">Playlist Name :</label>
                <input name="name" type="text" className="form-control" id="recipient-name" placeholder="HeeHoo" onChange={props.onChange} />
                <Button onClick={props.onHide} style={{ float: 'right', marginTop: 10 }}>Insert</Button>
                <Button onClick={() => { props.closemodal(false) }} style={{ float: 'right', marginTop: 10, marginRight: 5 }}>Close</Button>
            </Modal.Body>
        </Modal>
    );
}

export default Dashboard;