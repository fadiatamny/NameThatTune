import React from 'react';
import GameSession from './GameSession';
import GameLobby from './GameLobby';
import CacheHandler from './interfaces/CacheHandler';
import io from 'socket.io-client';
import _ from 'lodash';

const testendpoint = 'http://localhost:1337';
const endpoint = 'https://name-that-tune-2020.herokuapp.com';

const socket = io.connect(testendpoint);
let propss;
let roomID;
let count = 0;
let playlistID = 0;
let playlist;
let options = [];
let players = [sessionStorage.getItem('username')];

function leaveLobby() {
    if (!!propss.location.state && propss.location.state.owner === true)
        socket.emit('hostLeave', sessionStorage.getItem('room'));
    propss.history.push('/MainMenu');
};

let guessSong = () => {
    let guess = sessionStorage.getItem('guessSong');
    let currSong = JSON.parse(sessionStorage.getItem('song'));
    console.log(guess, currSong.name);
    if (guess == currSong.name) {
        socket.emit('correctGuess', sessionStorage.getItem('room'));
    }
};

let startGame = () => {
    if (!!propss.location.state && propss.location.state.owner == true) {
        console.log('sending server startgame');
        console.log(sessionStorage.getItem('room'));
        socket.emit('startGame', { id: sessionStorage.getItem('room'), type: 'admin' });
    }
}

socket.on('roundEnd', function () {
    if (!!propss.location.state && propss.location.state.owner === true) {
        if (count >= playlist.length - 1)
            socket.emit('endGame', sessionStorage.getItem('room'));
        else {
            count++;
            socket.emit('startRound', { id: sessionStorage.getItem('room'), song: playlist[count], options: options });
        }
    }
});

socket.on('joined', (id, user) => {
    if (!!propss.location.state && propss.location.state.owner == true) {
        socket.emit('updatePlayerList', sessionStorage.getItem('room'), [...players, user]);
    }
});


socket.on('gameEnded', function () {
    console.log('host left');
    socket.emit('leave', sessionStorage.getItem('room'));
    count = 0;
    sessionStorage.removeItem('song');
    sessionStorage.removeItem('options');
    propss.push('/MainMenu');
});


socket.on('playlistRequested', (data) => {
    playlist = data;
    playlist.forEach(element => {
        options.push(element.name);
    });
    options = _.shuffle(options);
    if (!!propss.location.state && propss.location.state.owner === true)
        socket.emit('startRound', { id: sessionStorage.getItem('room'), song: playlist[count], options: options });
});

socket.on('message', function (data) {
    console.log('Incoming message:', data);
});

socket.on('gameStarted', () => {
    console.log('gamestarted?');
    if (!!propss.location.state && propss.location.state.owner === true)
        socket.emit('playlistRequest', { id: sessionStorage.getItem('room'), playlistID: playlistID });
});

socket.on('errorMessage', (data) => {
    console.log(data);
    propss.history.push('/MainMenu');
});


function Game(props) {
    const [gameState, setGameState] = React.useState(false);
    const [renderSwitch, setRenderSwitch] = React.useState(0);
    const [renderSwitch2, setRenderSwitch2] = React.useState(0);

    React.useEffect(() => {
        propss = props;
        console.log('mount');
        if (!CacheHandler.verifyCache('logged-in') || !CacheHandler.verifyCache('inGame')) {
            props.history.push('/');
            return;
        }
        if (!!props.location.state && props.location.state.owner === true) {
            console.log('creating');
            console.log(players);
            sessionStorage.setItem('playerlist', JSON.stringify(players));
            console.log(sessionStorage.getItem('playerlist'));
            socket.emit('create');
        }
        else {
            let room = '' + window.location.href.split('/Game/')[1];
            let user = sessionStorage.getItem('username');
            sessionStorage.setItem('room', room);
            socket.emit('join', room, user);
        }
    }, []);

    React.useEffect(() => () => {
        console.log('unmounted');
        sessionStorage.removeItem('song');
        sessionStorage.removeItem('options');
        sessionStorage.removeItem('inGame');
        sessionStorage.removeItem('room');
        sessionStorage.removeItem('playerlist');
        socket.emit('terminate'); socket.disconnect(); socket.close();
    }, []);

    socket.on('newPlayerList', async function (data) {
        players = data;
        sessionStorage.setItem('playerlist', JSON.stringify(data));
        console.log(sessionStorage.getItem('playerlist'), 'new players yoo');
        setRenderSwitch(renderSwitch + 1);
    });

    socket.on('roundInitated', (currSong, options) => {
        console.log('new round starting !');
        sessionStorage.setItem('song', JSON.stringify(currSong));
        sessionStorage.setItem('options', JSON.stringify(options));
        if (gameState === false) {
            setGameState(true);
        } else {
            console.log('wow');
            setRenderSwitch2(renderSwitch2 + 1);
        }
    });

    socket.on('sessionEnded', () => {
        count = 0;
        setGameState(false);
    });

    socket.on('created', (data) => {
        roomID = data;
        sessionStorage.setItem('room', data);
        console.log(sessionStorage.getItem('room'), data);
        setRenderSwitch(renderSwitch + 1);
    });

    return gameState ? <GameSession socket={socket} guessSong={guessSong} leaveLobby={leaveLobby} /> : <GameLobby roomID={roomID} startGame={startGame} leaveLobby={leaveLobby} players={players} />;

}

export default Game;
