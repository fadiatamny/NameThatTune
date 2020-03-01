const router = require('express').Router();
const Validator = require('../middleware/validator');
const playlistController = require('../controllers/playlistController');

router.post('/', Validator.validatePlaylist, (req, res) => {
    playlistController.create(req, res);
});
router.put('/:id', (req, res) => {
    playlistController.update(req, res);
});
router.delete('/:id', (req, res) => {
    playlistController.delete(req, res);
});
router.get('/:id', (req, res) => {
    playlistController.read(req, res);
});
router.get('/', (req, res) => {
    playlistController.readAll(req, res);
});

module.exports = router;