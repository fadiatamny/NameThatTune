const router = require('express').Router();
const Validator = require('../middleware/validator');
const playlistController = require('../controllers/playlistController');

router.post('/create/:id', Validator.validatePlaylist, (req, res) => {
    playlistController.create(req, res);
});

module.exports = router;