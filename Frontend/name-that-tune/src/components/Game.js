import React from 'react';
import GameSession from './GameSession';
import GameLobby from './GameLobby';
import CacheHandler from './interfaces/CacheHandler';
import io from 'socket.io-client';
import _ from 'lodash';

const testendpoint = 'http://localhost:1337';
const endpoint = 'https://name-that-tune-2020.herokuapp.com';


const socket = io.connect(testendpoint);

function Game(props) {
    const [gameState, setGameState] = React.useState(false);
    const [renderSwitch, setRenderSwitch] = React.useState(0);
    const [renderSwitch1, setRenderSwitch1] = React.useState(0);
    const [renderSwitch2, setRenderSwitch2] = React.useState(0);

    let roomID;

    let count = 0;
    let playlistID = 0;
    let playlist;
    let options = [];
    let players = [sessionStorage.getItem('username')];

    React.useEffect(() => {
        console.log('mount');
        if (!CacheHandler.verifyCache('logged-in') || !CacheHandler.verifyCache('inGame')) {
            props.history.push('/');
            return;
        }
        if (!!props.location.state && props.location.state.owner === true){
            console.log('creating');
            sessionStorage.setItem('playerlist',JSON.stringify(players));
            console.log(sessionStorage.getItem('playerlist'));
            socket.emit('create');
        }
        else{
            let room = ''+window.location.href.split('/Game/')[1];
            let user = sessionStorage.getItem('username');
            sessionStorage.setItem('room',room);
            socket.emit('join', room,user);
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

    function leaveLobby() {
        if (!!props.location.state && props.location.state.owner === true)
            socket.emit('hostLeave', roomID);
        props.history.push('/MainMenu');
    };

    let guessSong = (guess) => {
        let currSong = JSON.parse(sessionStorage.getItem('song'));
        if (guess == currSong.name) {
            socket.emit('correctGuess', roomID);
        }
    };

    let startGame = () => {
        if (!!props.location.state && props.location.state.owner == true){
            console.log('sending server startgame');
            socket.emit('startGame', { id: roomID, type: 'admin' });
        }
    }

    socket.on('joined', (id,user) => {
        if (!!props.location.state && props.location.state.owner == true){
            socket.emit('updatePlayerList',roomID,[...players,user]);
        }
    });

    socket.on('newPlayerList',async function(data){
        players = data;
        sessionStorage.setItem('playerlist',JSON.stringify(data));
        console.log(sessionStorage.getItem('playerlist'),'new players yoo');
        setRenderSwitch(renderSwitch + 1);
    });

    socket.on('connect', function () {
    });

    socket.on('roundEnd', function () {
        if (!!props.location.state && props.location.state.owner === true) {
            if (count >= playlist.length - 1)
                socket.emit('endGame', roomID);
            else {
                count++;
                socket.emit('startRound', { id: roomID, song: playlist[count], options: options });
            }
        }
    });

    socket.on('roundInitated', (currSong, options) => {
        console.log('round starting yoo');
        options = _.shuffle(options);
        sessionStorage.setItem('song', JSON.stringify(currSong));
        sessionStorage.setItem('options', JSON.stringify(options));

        if (gameState === false) {
            setGameState(true);
        } else {
            setRenderSwitch1(renderSwitch1+1);
        }
    });

    socket.on('gameEnded', function () {
        console.log('host left');
        socket.emit('leave', roomID);
        count = 0;
        sessionStorage.removeItem('song');
        sessionStorage.removeItem('options');
    });

    socket.on('sessionEnded', () => {
        count = 0;
        setGameState(false);
    });

    socket.on('created', (data) => {
        roomID = data;
        sessionStorage.setItem('room',data);
        console.log(sessionStorage.getItem('room'),data);
        setRenderSwitch(renderSwitch+1);
    });

    socket.on('playlistRequested', (data) => {
        playlist = data;
        playlist.forEach(element => {
            options.push(element.name);
        });
        options = _.shuffle(options);
        if (!!props.location.state && props.location.state.owner === true)
            socket.emit('startRound', { id: roomID, song: playlist[count], options: options });
    });

    socket.on('message', function (data) {
        console.log('Incoming message:', data);
    });

    socket.on('gameStarted', () => {
        console.log('gamestarted?');
        if (!!props.location.state && props.location.state.owner === true)
            socket.emit('playlistRequest', { id: roomID, playlistID: playlistID });
        setGameState(true);
    });

    socket.on('errorMessage', (data) => {
        console.log(data);
        props.history.push('/MainMenu');
    });

    return gameState ? <GameSession guessSong={guessSong} leaveLobby={leaveLobby} /> : <GameLobby roomID={roomID} startGame={startGame} leaveLobby={leaveLobby} players={players} />;

}

export default Game;
