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
    gameSocket.on('create', hostCreateNewGame); // host requests to create a room
    gameSocket.on('leave', leaveRoom); // socket requests to leave room
    gameSocket.on('join', playerJoinGame); // socket requests to join a room
    gameSocket.on('write', (data) => { 
        console.log(data);
    });
    gameSocket.on('startGame', startGame); // host requests to start a game in a room
    gameSocket.on('playlistRequest', playlistRequest); // host requests the playlist to play with
    gameSocket.on('hostLeave', hostLeave); // host disconnects issue !
    gameSocket.on('startRound', startRound); // game round starts in a gamelobby
    gameSocket.on('endGame', endGame); // game ends in a game lobby
    gameSocket.on('correctGuess', correctGuess); // someone guessed right in a game lobby 
    gameSocket.on('updatePlayerList',updatePlayerList);
    gameSocket.on('someoneGuessed',someoneGuessed);
    gameSocket.on('sendMessage',sendMessage);
}

function startRound(obj) {
    let x = obj.options.filter(elem => elem !== obj.song.name);
    const max = x.length > 3 ? 3 : x.length;
    io.sockets.in(obj.id).emit('roundInitated',obj.song,[obj.song.name ,..._.shuffle(x).splice(0,max)]);
};

function endGame(id) {
    io.sockets.in(id).emit('sessionEnded');
};

function sendMessage(id,name,message){
    io.sockets.in(id).emit('message',name,message);
}

function correctGuess(id) {
    io.sockets.in(id).emit('roundEnd');
};

function updatePlayerList(id,data){
    io.sockets.in(id).emit('newPlayerList',data);
};

function someoneGuessed(id,name){
    io.sockets.in(id).emit('someoneElse',name);
}

function hostCreateNewGame() {
    let id = uniqid();
    this.join(id.toString());
    this.emit('created', id.toString());
}

function leaveRoom(room) {
    this.leave(room);
};

function hostLeave(room) {
    io.sockets.in(room).emit('gameEnded');
};

function playerJoinGame(id,name) {
    try {
        let room = io.sockets.adapter.rooms[id.toString()];

        if (room) {
            this.join(id);
            io.sockets.in(id).emit('joined', id,name);
        } else {
            this.emit('errorMessage', {
                message: `This room ${id} does not exist.`
            });
        }
    } catch (err) {
        console.log(err.message);
    }
};

let startGame = (obj) => {
    if (obj.type == 'admin'){
        io.sockets.in(obj.id).emit('gameStarted');
    }
};

let playlistRequest = async function (obj) {
    if (!obj.playlistID) obj.playlistID = 0;
    let playlist = await PlaylistModel.getPlaylist(obj.playlistID);
    if (playlist.length == 0) this.emit('errorMessage', { message: `playlist with id : ${obj.playlistID} doesnt exist` });
    playlist = playlist[0];
    let songs = _.shuffle(playlist.songs);
    this.emit('playlistRequested', songs);
};

