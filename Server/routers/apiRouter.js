const router = require('express').Router();
const Validator = require('../middleware/validator');
const LoginController = require('../controllers/loginController');

router.post('/signup', Validator.validateLoginRequest, (req, res) => {
    LoginController.signUp(req, res);
});
router.post('/login', Validator.validateLoginRequest, (req, res) => {
    LoginController.login(req, res);
});

module.exports = router;