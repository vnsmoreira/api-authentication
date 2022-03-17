const { Router } = require('express');
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/auth');

const router = Router();

router.use(authMiddleware);

router.get('/', projectController.project_GET);

module.exports = app => app.use('/project', router);
