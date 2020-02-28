const {
    PlaylistModel,
    SongModel
} = require('../database/mongoConnector');
const Validator = require('../middleware/validator');
const ErrHandler = require('../util/errorHandler');
class Playlist {
    static async getRandomSong(pID) {
        if (!pID) pID = 0;
        let obj = await PlaylistModel.getPlaylist(pID);

        if (obj.length == 0) 
            obj = await PlaylistModel.getPlaylist(0);
        
        obj = obj[0];
        let randIndex = Math.floor((Math.random()*obj.songs.length));
        return obj.songs[randIndex];
    };

    static async insert(req, res) {
        try {
            let obj = await PlaylistModel.getPlaylist(req.params.playlist);
            let playlist;
            if (obj.length != 0) {
                playlist = obj[0];
            }

            let song = SongModel({
                name: req.body.songName,
                vid: req.body.videoID
            });

            if (playlist) {
                playlist.songs.push(song);
                PlaylistModel.updatePlaylist(playlist);
            } else {
                playlist = PlaylistModel({
                    id: req.params.playlist,
                    name: "Temp Name",
                    songs: [song]
                });
                await playlist.save();
            }

            res.status(200).send('Succesfully inserted');
        } catch (err) {
            ErrHandler.handle(res, err);
        }
    }

    static async create(req, res) {
        try {
            let playlist = PlaylistModel({
                id: req.body.id,
                name: req.body.playlistName
            });

            if ((await playlist.exists()).length != 0) throw {
                status: 409,
                message: 'A playlist with this id already exists'
            };

            if (req.body.songs) {
                let songsArr = req.body.songs;
                songsArr.forEach(element => {
                    if (!element.songName || !element.videoID) throw {
                        status: 403,
                        message: 'Missing Song Variables'
                    };
                    let song = SongModel({
                        name: element.songName,
                        vid: element.videoID
                    });
                    playlist.songs.push(song);
                });
            }

            await playlist.save();
            res.status(200).send('Successfully created');
        } catch (err) {
            ErrHandler.handle(res, err);
        }
    };

    static async update(req, res) {
        try {
            let obj = await PlaylistModel.getPlaylist(req.params.id);
            if (obj.length == 0) throw {
                status: 409,
                message: 'A playlist with this id doesnt exists'
            };
            obj = obj[0];
            if (req.body.playlistName) obj.name = req.body.playlistName;
            if (req.body.songs) {
                req.body.songs.forEach(element => {
                    if (!element.name || !element.vid) throw {
                        status: 409,
                        message: 'Incorrect song array format.'
                    };
                });
                obj.songs = req.body.songs;
            }
            let msg = 'Playlist already up to date!';
            let result = await PlaylistModel.updatePlaylist(obj);
            if (result.nModified != 0)
                msg = 'Updated Succesfully';

            res.status(200).send(msg);
        } catch (err) {
            ErrHandler.handle(res, err);
        }
    };

    static async delete(req, res) {
        try {
            let obj = await PlaylistModel.getPlaylist(req.params.id);
            if (obj.length == 0) throw {
                status: 409,
                message: 'A playlist with this id doesnt exists'
            };
            obj = obj[0];
            await PlaylistModel.deletePlaylist(obj._id);
            res.status(200).send('Successfully removed playlist');
        } catch (err) {
            ErrHandler.handle(res, err);
        }
    };

    static async read(req, res) {
        try {
            let obj = await PlaylistModel.getPlaylist(req.params.id);
            if (obj.length == 0) throw {
                status: 409,
                message: 'A playlist with this id doesnt exists'
            };
            res.status(200).json(obj);
        } catch (err) {
            ErrHandler.handle(res, err);
        }
    };

    static async readAll(req, res) {
        try {
            let obj = await PlaylistModel.getPlaylists();
            if (obj.length == 0) throw {
                status: 409,
                message: 'A playlist with this id doesnt exists'
            };
            res.status(200).json(obj);
        } catch (err) {
            ErrHandler.handle(res, err);
        }
    };
}

module.exports = Playlist;