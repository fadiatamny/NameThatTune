var socket = io.connect('http://localhost:1337');

let room;
let playlist = 0;
let songURL;
let userType = '';

let checkConnection = () => {if(room) socket.emit('leave',room);}

let create = function () {
   checkConnection();
   userType = 'admin';
   socket.emit('create');
}

let join = function () {
   checkConnection();
   userType = 'user';
   socket.emit('join',document.getElementById('id').value);
}

let startGame =() => {
   console.log(userType);
   if(userType == 'admin')
      socket.emit('startGame',{id: room, type:'admin'});
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
   userType = 'admin';
});

socket.on('songRequested',(data)=>{
   let msg = `
         <div style="position: fixed; z-index: -99; width: 100%; height: 100%">
           <iframe frameborder="0" height="100%" width="100%" 
             src="https://youtube.com/embed/${data.vid}?autoplay=1&controls=0&showinfo=0&autohide=1">
           </iframe>
         </div>`
   document.getElementById('player').innerHTML = msg;
   songURL = data;
   console.log(data);
});

socket.on('message', function (data) {
   console.log('Incoming message:', data);
});

socket.on('gameStarted',(data)=>{
   console.log('GAME START!!!!');
   socket.emit('songRequest',{id:room,playlistID:playlist});
});

socket.on('error',(data)=>{
   console.log(data);
});