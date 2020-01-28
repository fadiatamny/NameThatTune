var socket = io.connect('http://localhost:1337');

let room;
let playlistID = 0;
let songURL;
let userType = '';
let playlist;
let count = 0;
let currSong ;
let options = [];
let elem;

let leave = function(){
   if(userType == 'admin')
      socket.emit('hostLeave',room); 
};

let checkConnection = () => { if (room) socket.emit('leave', room); }

let create = function () {
   checkConnection();
   userType = 'admin';
   socket.emit('create');
}

let guess = (guess) => {
   console.log(currSong.name)
   if (guess == currSong.name) {
      socket.emit('correctGuess', room);
   }
};

let join = function () {
   checkConnection();
   userType = 'user';
   room = document.getElementById('id').value;
   socket.emit('join', room);
   elem = document.getElementById('Sbutton');
   elem.setAttribute("hidden", true);
}

let startGame = () => {
   
   elem = document.getElementById('Sbutton');
   elem.removeAttribute("hidden");
   console.log(userType);
   if (userType == 'admin')
      socket.emit('startGame', { id: room, type: 'admin' });
}

socket.on('joined', (data) => {
   console.log(data);
});

socket.on('connect', function () {
   // Connected, let's sign-up for to receive messages for this room
   console.log('hi');
});

socket.on('roundEnd', function () {
   if (userType == 'admin') {
      if (count >= playlist.length - 1)
         socket.emit('endGame', room);
      else {
         count++;
         socket.emit('startRound', {id:room,song:playlist[count],options:options});
      }
   }
});

socket.on('roundInitated', (song,options) => {
   currSong = song;
   console.log(song.name)
   console.log(currSong);
   let msg = `
         <div class="row justify-content-center" style="z-index: -99; width: 30%; height: 30%">
           <iframe frameborder="0" height="100%" width="100%" 
             src="https://youtube.com/embed/${song.vid}?autoplay=1&controls=0&showinfo=0&autohide=1">
           </iframe>
         </div>`

   let btns = '';

   options.forEach(element => {
      btns+=`<button class="btn btn-primary" value="${element}" onclick="guess(this.value)">${element}</button>`;
   });

   document.getElementById('player').innerHTML = msg;
   document.getElementById('buttons').innerHTML = btns;
});

socket.on('gameEnded',function(){
   console.log('host left');
   socket.emit('leave',room);
   document.getElementById('player').innerHTML = '';
   document.getElementById('buttons').innerHTML = '';
   count = 0;
   elem = document.getElementById('Cbutton');
   elem.removeAttribute("disabled");
   elem = document.getElementById('Jbutton');
   elem.removeAttribute("disabled");
   elem = document.getElementById('Sbutton');
   elem.removeAttribute("disabled");
});

socket.on('sessionEnded', () => {
   console.log('hi');
   document.getElementById('player').innerHTML = '';
   document.getElementById('buttons').innerHTML = '';
   count = 0;
   elem = document.getElementById('Cbutton');
   elem.removeAttribute("disabled");
   elem = document.getElementById('Jbutton');
   elem.removeAttribute("disabled");
   elem = document.getElementById('Sbutton');
   elem.removeAttribute("disabled");
});

socket.on('created', (data) => {
   console.log(data);
   room = data;
   userType = 'admin';
});

socket.on('playlistRequested', (data) => {
   playlist = data;
   console.log(playlist);
   console.log('game will start in a few seconds');
   playlist.forEach(element => {
      options.push(element.name);
   });;

   setTimeout(() => {
      if (userType == 'admin')
         socket.emit('startRound', {id:room,song:playlist[count],options:options});
   }, 1000);
});

socket.on('message', function (data) {
   console.log('Incoming message:', data);
});

socket.on('gameStarted', () => {
   elem = document.getElementById('Cbutton');
   elem.setAttribute("disabled", true);
   elem = document.getElementById('Jbutton');
   elem.setAttribute("disabled", true);
   elem = document.getElementById('Sbutton');
   elem.setAttribute("disabled", true);

   console.log('GAME START!!!!');
   if(userType == 'admin')
      socket.emit('playlistRequest', { id: room, playlistID: playlistID });
});

socket.on('error', (data) => {
   console.log(data);
});