const ErrHandler = require('../util/errorHandler');

class Validator {
    static validateSong(req, res, next) {
        if (!req.body.songName || !req.body.videoID) ErrHandler.handle(res, { status: 403, message: 'Missing Song Variables' });
        else { if(next)next(); }
    }
    static validatePlaylist(req, res, next) {
        if (!req.params.id || !req.body.playlistName) ErrHandler.handle(res, { status: 403, message: 'Missing Playlist Variables' });
        else { if(next)next(); }
    }
}

module.exports = Validator;