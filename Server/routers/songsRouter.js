const router = require('express').Router();
const { google } = require('googleapis');
const Validator = require('../middleware/validator');
const playlistController = require('../controllers/playlistController');

var youtube = google.youtube({
    version: 'v3',
    auth: process.env.API_KEY
});

router.get('/search/:q', (req, res) => {
    youtube.search.list({
        part: 'snippet',
        q: req.params.q
    }, function (err, data) {
        if (err) {
            console.error('Error: ' + err);
        }
        if (data) {
            res.status(200).json(data.data.items);
        }
    });
});

router.post('/:playlist/insert', Validator.validateSong ,(req, res) => {
    playlistController.insert(req,res);
});

module.exports = router;