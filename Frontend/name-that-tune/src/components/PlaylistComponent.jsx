import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./fonts/fontawesome/css/font-awesome.min.css";
import "./css/style.css";
import "./css/chat.css";
import Axios from 'axios';
import Moment from 'react-moment';
import { Modal, Button } from 'react-bootstrap';
import { FaPlus, FaMinus, FaYoutube } from 'react-icons/fa';

const testendpoint = 'http://localhost:1337';
const endpoint = 'https://name-that-tune-2020.herokuapp.com';

const PlaylistComponent = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    const [modalSongsShow, setModalSongsShow] = React.useState(false);

    const song = { songName: '', videoID: '' };

    const deletePlaylist = async () => {
        try {
            await Axios.delete(`${endpoint}/playlist/${props.playlist.id}`);
            props.refresh();
        } catch (err) {
            console.log(err);
        }
    };

    const insertSong = async () => {
        try {
            await Axios.post(`${endpoint}/songs/${props.playlist.id}`, song);
            props.refresh();
        } catch (err) {
            console.log(err);
        }
    };

    const insertYoutubeSong = async (item) => {
        song.songName = item.snippet.title;
        song.videoID = item.id.videoId;
        insertSong();
    };

    return (
        <div>
            <div className="read_chat">
                <div className="title_page">
                    {Object.entries(props.playlist).length !== 0 ? <div>
                        <FaPlus className='insert-icon' onClick={() => setModalShow(true)} />
                        <MainModal
                            show={modalShow}
                            onHide={(e) => { setModalShow(false); if (song.videoID != '' && song.songName != '') insertSong(); }}
                            onChange={(e) => {
                                if (e.target.name === 'id') song.videoID = e.target.value;
                                if (e.target.name === 'name') song.songName = e.target.value;
                            }}
                            closemodal={setModalShow}
                        />
                        <FaYoutube className='insert-icon' style={{ marginLeft: 15 }} onClick={() => setModalSongsShow(true)} />
                        <ChoseSongModal
                            show={modalSongsShow}
                            onHide={(e) => { setModalSongsShow(false); }}
                            onChange={(e) => {
                                if (e.target.name === 'id') song.videoID = e.target.value;
                                if (e.target.name === 'name') song.songName = e.target.value;
                            }}
                            insertYoutubeSong={insertYoutubeSong}
                            closemodal={setModalSongsShow}
                        />
                        <FaMinus className='insert-icon' style={{ marginLeft: 15 }} onClick={deletePlaylist} />
                    </div> : ''}
                </div>
                <div className="chat_users2">
                    <ul className="new_chats">
                        {Object.entries(props.playlist).length !== 0 ? props.playlist.songs.map((item, index) => (
                            <li key={index}>
                                <a href={`https://www.youtube.com/watch?v=${item.vid}`} target="_blank" style={{ cursor: '' }}>
                                    <div className="name" style={index === 0 ? { marginTop: 15 } : {}} style={index + 1 >= props.playlist.songs.length ? { marginTop: 5, paddingBottom: 15 } : {}}>
                                        <span className="username">{decodeURI(item.name)}</span>
                                        <div className="desc">Video Id: {item.vid}</div>
                                        {index + 1 !== props.playlist.songs.length ? <div className="seperator"></div> : ''}
                                    </div>
                                </a>
                            </li>)) : ''}
                    </ul>
                </div>
                <div className="reading_message hidden-xs redshade">
                    <div className="name">
                        <span className="username">{props.playlist.name}</span>
                        <div className="online_status">Number of songs: {props.playlist.songs.length} <br /><br /> Created At: <Moment format="DD/MM/YY HH:mm">{props.playlist.createdAt}</Moment></div>
                    </div>
                </div>
            </div>
        </div>
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
                <label htmlFor="recipient-name" className="col-form-label">Song Name:</label>
                <input name='name' type="text" className="form-control" id="recipient-name" onChange={props.onChange} />
                <label htmlFor="recipient-id" className="col-form-label">VideoID:</label>
                <input name='id' type="text" className="form-control" id="recipient-id" onChange={props.onChange} />
                <Button onClick={props.onHide} style={{ float: 'right', marginTop: 10 }}>Join</Button>
                <Button onClick={() => { props.closemodal(false) }} style={{ float: 'right', marginTop: 10, marginRight: 5 }}>Close</Button>
            </Modal.Body>
        </Modal>
    );
}
function ChoseSongModal(props) {
    const [choices, setChoices] = React.useState([]);
    let query = '';

    const getChoices = async () => {
        try {
            let res = await Axios.get(`${endpoint}/songs/search/${query}`);
            setChoices(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className="orangeshade">
                <label htmlFor="recipient-name" className="col-form-label">Song Name:</label>
                <input name='name' type="text" className="form-control" id="recipient-name" onChange={e => query = e.target.value} />
                <Button onClick={getChoices} style={{ marginTop: 10 }}>Search</Button>
                {choices.map((item, index) => (
                    <div key={index} style={{ cursor: 'pointer' }} onClick={() => { props.insertYoutubeSong(item); props.closemodal(false); }}>
                        <hr />
                        <p style={{ fontSize: 20, margin: '10px 0px' }}>{decodeURI(item.snippet.title)}</p>
                        <hr />
                    </div>
                ))}
                <Button onClick={() => { props.closemodal(false) }} style={{ float: 'right', marginTop: 10, marginRight: 5 }}>Close</Button>
            </Modal.Body>
        </Modal>
    );
}

export default PlaylistComponent;