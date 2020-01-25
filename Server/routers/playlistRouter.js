const router = require('express').Router();
const Validator = require('../middleware/validator');
const playlistController = require('../controllers/playlistController');

router.post('/create/:id', Validator.validatePlaylist, (req, res) => {
    playlistController.create(req, res);
});
router.put('/update/:id', (req, res) => {
    playlistController.update(req, res);
});
router.delete('/delete/:id', (req, res) => {
    playlistController.delete(req, res);
});
router.get('/:id/read', (req, res) => {
    playlistController.read(req, res);
});
router.get('/read', (req, res) => {
    playlistController.readAll(req, res);
});

module.exports = router;