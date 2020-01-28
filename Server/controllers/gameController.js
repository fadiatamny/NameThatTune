const uniqid = require('uniqid');
const playlistController = require('./playlistController');
const { PlaylistModel } = require('../database/mongoConnector');
const _ = require('lodash');

let io;
let gameSocket;

module.exports.init = function (sio, socket) {
    io = sio;
    gameSocket = socket;
    gameSocket.emit('connected', {
        message: "You are connected!"
    });
    gameSocket.on('create', hostCreateNewGame);
    gameSocket.on('leave', leaveRoom);
    gameSocket.on('join', playerJoinGame);
    gameSocket.on('write', (data) => {
        console.log(data);
    });
    gameSocket.on('startGame', startGame);
    gameSocket.on('playlistRequest', playlistRequest);
    gameSocket.on('hostLeave', hostLeave);
    gameSocket.on('startRound', startRound);
    gameSocket.on('endGame', endGame);
    gameSocket.on('correctGuess', correctGuess);
}

function startRound(obj) {
    io.sockets.in(obj.id).emit('roundInitated',obj.song,obj.options);
};

function endGame(id) {
    io.sockets.in(id).emit('sessionEnded');
};

function correctGuess(id) {
    io.sockets.in(id).emit('roundEnd');
};

function hostCreateNewGame() {
    let id = uniqid();
    this.join(id.toString());
    this.emit('created', id.toString());
    console.log(id);
}

function leaveRoom(room) {
    this.leave(room);
};

function hostLeave(room) {
    io.sockets.in(room).emit('gameEnded');
};

function playerJoinGame(id) {
    try {
        let room = io.sockets.adapter.rooms[id.toString()];

        if (room) {
            this.join(id);
            io.sockets.in(id).emit('joined', id);
            console.log(io.sockets.adapter.rooms);
        } else {
            this.emit('error', {
                message: `This room ${id} does not exist.`
            });
        }
    } catch (err) {
        console.log(err.message);
    }
};

let startGame = (obj) => {
    console.log(obj.type == 'admin');
    if (obj.type == 'admin')
        io.sockets.in(obj.id).emit('gameStarted');
};

let playlistRequest = async function (obj) {
    if (!obj.playlistID) obj.playlistID = 0;
    let playlist = await PlaylistModel.getPlaylist(obj.playlistID);
    if (playlist.length == 0) this.emit('error', { message: `playlist with id : ${obj.playlistID} doesnt exist` });
    playlist = playlist[0];
    let songs = _.shuffle(playlist.songs);
    this.emit('playlistRequested', songs);
};

