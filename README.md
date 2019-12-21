# Name That Tune
a game where you play with your friends, the one who guesses the song first wins the round until max points? or max songs ?

# API
gonna use spotify api for getting music playlists created by the admin

# Flows

creating a gamelobby:
	-> logs in 
	-> ffrom the start menu he chooses start game 
	-> moves him into a new lobby where he can either give invite link or invite number 
	-> once there are enough players the Start jamming button lights up and then can start the game

joining a game (code):
	-> logs in 
	-> from the start menu chooses join game
	-> then he is placed in the new hobby with the lobby owner and other players 
	-> once the lobby owner starts the game (given enough players) the game starts

admin editing playlists :
	-> logs in
	-> sees a menu with playlists he clicks on one (or clicks to create a new one)
	-> he starts adding names of songs into the playlist
	-> 


guess the song using spotify api
admin can register a game based event where ANYONE can join the room and guess the song (maybe set a maximum)

you can create a gameroom and wait for friends to connect
you can join a game room
game doesnt start until minimum number of players are available
