import React from 'react';
import GameSession from './GameSession';
import GameLobby from './GameLobby';
import CacheHandler from './interfaces/CacheHandler';
import io from 'socket.io-client';
import _ from 'lodash';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const localhostplace = 'http://localhost:1337';
const endpoint = 'https://name-that-tune-2020.herokuapp.com';

const socket = io.connect(localhostplace);
let owner = JSON.parse(sessionStorage.getItem('Owner'));
let propss;
let roomID;
let count = 0;
let playlistID = sessionStorage.getItem('playlistID') || 0;
let playlist;
let options = [];
let players = [sessionStorage.getItem('username')];
let ref;

const leaveLobby = () => {
    if (owner === true)
        socket.emit('hostLeave', sessionStorage.getItem('room'));
    else {
        socket.emit('leave', sessionStorage.getItem('room'));
        propss.history.push('/MainMenu');
    }
};

const startGame = () => {
    if (owner === true) {
        socket.emit('startGame', { id: sessionStorage.getItem('room'), type: 'admin' });
    }
}

socket.on('someoneElse', (name) => {
    if(name !== sessionStorage.getItem('username'))
        NotificationManager.warning('Warning message', `${name} guess it correctly!`, 2000);
});

socket.on('roundEnd', () => {
    if (!!owner === true) {
        if (count >= playlist.length - 1)
            socket.emit('endGame', sessionStorage.getItem('room'));
        else {
            count++;
            socket.emit('startRound', { id: sessionStorage.getItem('room'), song: playlist[count], options: options });
        }
    }
});

socket.on('joined', (id, user) => {
    if (owner === true) {
        socket.emit('updatePlayerList', sessionStorage.getItem('room'), [...players, user]);
    }
});


socket.on('gameEnded', () => {
    socket.emit('leave', sessionStorage.getItem('room'));
    count = 0;
    CacheHandler.removeCache('song');
    CacheHandler.removeCache('options');
    propss.history.push('/MainMenu');
});


socket.on('playlistRequested', (data) => {
    playlist = data;
    playlist.forEach(element => {
        options.push(element.name);
    });
    options = _.shuffle(options);
    if (owner === true)
        socket.emit('startRound', { id: sessionStorage.getItem('room'), song: playlist[count], options: options });
});

socket.on('message', (name,message) => {
    if(name !== sessionStorage.getItem('username'))
        NotificationManager.info('Incomming message', `${name}: ${message}`, 5000);
});

socket.on('gameStarted', () => {
    if (owner === true)
        socket.emit('playlistRequest', { id: sessionStorage.getItem('room'), playlistID: playlistID });
});

socket.on('errorMessage', (data) => {
    NotificationManager.error('Error message', data.message, 2000);
    propss.history.push('/MainMenu');
});


const Game = (props) => {
    const [gameState, setGameState] = React.useState(false);
    const [renderSwitch, setRenderSwitch] = React.useState(0);
    const [renderSwitch2, setRenderSwitch2] = React.useState(0);

    const notifyFunc = (type, message) => {
        switch (type) {
            case 'info':
                NotificationManager.info('Info message');
                break;
            case 'success':
                NotificationManager.success('Success message', message, 3000);
                break;
            case 'warning':
                NotificationManager.warning('Warning message', `${message} guess it correctly!`, 3000);
                break;
            case 'error':
                NotificationManager.error('Error message', 'Click me!', 5000);
                break;
        }
    }
    

    React.useEffect(() => {
        propss = props;
        owner = JSON.parse(sessionStorage.getItem('Owner'));
        playlistID = sessionStorage.getItem('playlistID') || 0;
        if (!CacheHandler.verifyCache('logged-in') || !CacheHandler.verifyCache('inGame')) {
            props.history.push('/');
            return;
        }
        if (owner === true) {
            CacheHandler.setCache('playerlist', JSON.stringify(players));
            socket.emit('create');
        }
        else {
            let room = '' + window.location.href.split('/Game/')[1];
            let user = sessionStorage.getItem('username');
            CacheHandler.setCache('room', room);
            socket.emit('join', room, user);
        }
    }, []);

    React.useEffect(() => () => {
        if (owner === true) leaveLobby();
        CacheHandler.removeCache('song');
        CacheHandler.removeCache('options');
        CacheHandler.removeCache('inGame');
        CacheHandler.removeCache('room');
        CacheHandler.removeCache('playerlist');
        CacheHandler.removeCache('Owner');
        CacheHandler.removeCache('playlistID');
        socket.emit('terminate'); socket.disconnect(); socket.close();
    }, []);

    socket.on('newPlayerList', async (data) => {
        players = data;
        CacheHandler.setCache('playerlist', JSON.stringify(data));
        setRenderSwitch(renderSwitch + 1);
    });

    socket.on('roundInitated', (currSong, options) => {
        CacheHandler.setCache('song', JSON.stringify(currSong));
        CacheHandler.setCache('options', JSON.stringify(options));
        if (gameState === false) {
            setGameState(true);
        } else {
            setRenderSwitch2(renderSwitch2 + 1);
        }
    });

    socket.on('sessionEnded', () => {
        count = 0;
        CacheHandler.removeCache('options');
        CacheHandler.removeCache('song');
        setGameState(false);
    });

    socket.on('created', (data) => {
        roomID = data;
        CacheHandler.setCache('room', data);
        setRenderSwitch(renderSwitch + 1);
    });

    return (
        <div>{gameState ?
            <GameSession socket={socket} notifyFunc={notifyFunc} leaveLobby={leaveLobby} /> :
            <GameLobby socket={socket} roomID={roomID} startGame={startGame} leaveLobby={leaveLobby} players={players} />}
            <NotificationContainer />
        </div>
    );

}

export default Game;
