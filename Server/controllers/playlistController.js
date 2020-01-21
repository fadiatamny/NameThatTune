const { PlaylistModel, SongModel } = require('../database/mongoConnector');
const Validator = require('../middleware/validator');
const ErrHandler = require('../util/errorHandler');
class Playlist {

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
            }
            else {
                playlist = PlaylistModel({
                    id: req.params.playlist,
                    name: "Temp Name",
                    songs: [song]
                });
                await playlist.save();
            }

            res.status(200).send('cool');
        } catch (err) {
            ErrHandler.handle(res, err);
        }
    }

    static async create(req, res) {
        try {
            let playlist = PlaylistModel({
                id: req.params.id,
                name: req.body.playlistName
            });

            if (playlist.exists().length != 0) throw { status: 409, message: 'A playlist with this id already exists' };

            if (req.body.songs) {
                let songsArr = req.body.songs;
                songsArr.forEach(element => {
                    if (!element.songName || !element.videoID) throw { status: 403, message: 'Missing Song Variables' };
                    let song = SongModel({ name: element.songName, vid: element.videoID });
                    playlist.songs.push(song);
                });
            }

            await playlist.save();
            res.status(200).send('Cool');
        } catch (err) {
            ErrHandler.handle(res, err);
        }
    };

    static async update(req, res) {

    };

    static async delete(req, res) {

    };

    static async read(req, res) {

    };

    static async readAll(req, res) {

    };
}

module.exports = Playlist;