var socket = io.connect('http://localhost:1337');

let room;

let create = function () {
   if(room) socket.emit('leave',room);
   socket.emit('create');
}

let join = function () {
   socket.emit('join',document.getElementById('id').value);
}

socket.on('joined',(data)=>{
   console.log(data);
});

socket.on('connect', function () {
   // Connected, let's sign-up for to receive messages for this room
   console.log('hi');
});

socket.on('created', (data) => {
   room = data;
});

socket.on('message', function (data) {
   console.log('Incoming message:', data);
});