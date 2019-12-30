let io;
let gameSocket;

exports.init = function (sio, socket) {
    io = sio;
    gameSocket = socket;
    gameSocket.emit('connected', {
        message: "You are connected!"
    });
    gameSocket.on('create', hostCreateNewGame);
    gameSocket.on('join', playerJoinGame);
    gameSocket.on('write', (data)=>{
        console.log(data);
    });
}

function hostCreateNewGame() {
    let id = (Math.random() * 100000);

    this.emit('created', id.toString());
    this.join(id.toString());
    console.log(gameSocket.rooms);
}

function playerJoinGame(id) {
    try {
        console.log(id);
        console.log(gameSocket.rooms);
        let room = gameSocket.rooms[id];

        if (room) {
            this.join(id);
            io.sockets.in(id).emit('joined', id);
        } else {
            this.emit('error', {
                message: "This room does not exist."
            });
        }
    } catch (err) {
        console.log(err);
    }
}