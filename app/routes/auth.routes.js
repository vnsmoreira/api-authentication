const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.post('/register', authController.register_POST);
router.post('/authenticate', authController.authenticate_POST);

module.exports = router;
