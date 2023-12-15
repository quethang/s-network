const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.post('/refresh_token', authController.generateAccessToken);

router.post('/verify', authController.verify);

router.post('/forgot_password', authController.forgotPassword);

router.post('/reset', authController.resetPassword);

module.exports = router;