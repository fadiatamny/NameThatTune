const uniqid = require('uniqid');
const playlistController = require('./playlistController');

let io;
let gameSocket;

module.exports.init = function (sio, socket) {
    io = sio;
    gameSocket = socket;
    gameSocket.emit('connected', {
        message: "You are connected!"
    });
    gameSocket.on('create', hostCreateNewGame);
    gameSocket.on('leave',leaveRoom);
    gameSocket.on('join', playerJoinGame);
    gameSocket.on('write', (data)=>{
        console.log(data);
    });
    gameSocket.on('startGame',startGame);
    gameSocket.on('songRequest',songRequest);
    gameSocket.on('hostLeave',hostLeave);
}

function hostCreateNewGame() {
    let id = uniqid();
    this.join(id.toString());
    this.emit('created', id.toString());
    console.log(id);
}

function leaveRoom(room){
    this.leave(room);
};

function hostLeave(room){
    io.sockets.adapter.rooms[room].forEach(element => {
        element.leave(room);
    });
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

let startGame = (obj) =>{
    if(obj.type == 'admin')
        io.sockets.in(obj.id).emit('gameStarted');
};

let songRequest = async (obj) =>{
    if(!obj.playlistID) obj.playlistID = 0;
    let song = await playlistController.getRandomSong(obj.playlistID);
    io.sockets.in(obj.id).emit('songRequested',song);
};