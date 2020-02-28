import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./fonts/fontawesome/css/font-awesome.min.css";
import "./css/style.css";
import "./css/chat.css";
import Moment from 'react-moment';

const PlaylistComponent = (props) => {
    return (
        <div>
            <div className="read_chat">
                <div className="chat_users2">
                    <ul className="new_chats">
                        {Object.entries(props.playlist).length !== 0 ? props.playlist.songs.map((item, index) => (
                            <li key={index}>
                                <a href={`https://www.youtube.com/watch?v=${item.vid}`} target="_blank" style={{cursor: ''}}>
                                    <div className="name" style={index === 0 ? { marginTop: 15 } : {}} style={index + 1 >= props.playlist.songs.length ? { marginTop: 5, paddingBottom: 15 } : {}}>
                                        <span className="username">{item.name}</span>
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

export default PlaylistComponent;


/*

                // <div>


                //     <div className="chat_area show-xs">
                //         <div className="chat_users">
                //             <div className="title_page">
                //                 <span>Filters </span>
                //             </div>
                //             <ul className="chats  selected_chat">
                //                 <li>
                //                     <div to="./read_chat">
                //                         <div className="name">
                //                             <span className="username">Cynthia Soto</span>
                //                             <div className="desc">Lorem ipsum dolor sit</div>
                //                         </div>
                //                     </div>
                //                 </li>
                //             </ul>
                //         </div>
                //         <div className="chat_users">
                //             <div className="title_page">
                //                 <span>Playlists </span>
                //             </div>

                //             <ul className="chats">
                //                 <li>
                //                     <div to="./read_chat">
                //                         <div className="name">
                //                             <span className="username">Cynthia Soto</span>
                //                             <div className="desc">Lorem ipsum dolor sit</div>
                //                         </div>
                //                     </div>
                //                 </li>
                //                 <li className="active_chat">
                //                     <div to="./read_chat">
                //                         <div className="name">
                //                             <span className="username">Cynthia Soto</span>
                //                             <div className="desc">Lorem ipsum dolor sit</div>
                //                         </div>
                //                     </div>
                //                 </li>
                //                 <li>
                //                     <div to="./read_chat">
                //                         <div className="name">
                //                             <span className="username">Cynthia Soto</span>
                //                             <div className="desc">Lorem ipsum dolor sit</div>
                //                         </div>
                //                     </div>
                //                 </li>
                //                 <li>
                //                     <div to="./read_chat">
                //                         <div className="name">
                //                             <span className="username">Cynthia Soto</span>
                //                             <div className="desc">Lorem ipsum dolor sit</div>
                //                         </div>
                //                     </div>
                //                 </li>
                //                 <li className="nothing">
                //                     <a href=""></a>
                //                 </li>
                //             </ul>
                //         </div>
                //     </div >
                // </div >
                */