let io;
let gameSocket;

exports.init = function (sio, socket) {
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
}

function hostCreateNewGame() {
    //let id = (Math.random() * 100000);
    let id = 1;
    this.join(id.toString());
    this.emit('created', id.toString());
    console.log(io.sockets.adapter.rooms);
}

function leaveRoom(room){
    this.leave(room);
}

function playerJoinGame(id) {
    try {
        
        let room = io.sockets.adapter.rooms[id.toString()];

        if (room) {
            this.join(id);
            io.sockets.in(id).emit('joined', id);
            console.log(io.sockets.adapter.rooms);
        } else {
            this.emit('error', {
                message: "This room does not exist."
            });
        }
    } catch (err) {
        console.log(err);
    }
}