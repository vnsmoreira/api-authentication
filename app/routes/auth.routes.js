const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.post('/register', authController.register_POST);
router.post('/authenticate', authController.authenticate_POST);
router.post('/forgot_password', authController.forgot_password_POST);
router.post('/reset_password', authController.reset_password_POST);

module.exports = app => app.use('/auth', router);
