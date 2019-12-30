const express = require('express');
const http = require('http');
const game = require('./game');
const socketio = require('socket.io');

let app = express();

// app.use("/",express.static(`../${__dirname}/SiteDemo`));

let server = http.createServer(app).listen(1337);

let io = socketio.listen(server);

io.sockets.on('connection', function(socket) {
    game.init(io, socket);
});