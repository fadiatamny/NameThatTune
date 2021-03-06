const router = require('express').Router();
const { google } = require('googleapis');
const Validator = require('../middleware/validator');
const playlistController = require('../controllers/playlistController');

var youtube = google.youtube({
    version: 'v3',
    auth: process.env.API_KEY
});

router.get('/random',async (req,res)=>{
    try{
        res.status(200).json(await playlistController.getRandomSong());
    }catch(err){
        console.log(err);
    }
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

router.post('/:playlist', Validator.validateSong ,(req, res) => {
    playlistController.insert(req,res);
});

module.exports = router;