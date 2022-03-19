const { Router } = require('express');
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/auth');

const router = Router();

router.use(authMiddleware);

router.get('/', projectController.listProjects_GET);
router.get('/:projectId', projectController.showProject_GET);
router.post('/', projectController.createProject_POST);
router.put('/:projectId', projectController.updateProject_PUT);
router.delete('/:projectId', projectController.deleteProject_DELETE);
router.delete('/', projectController.deleteProjects_DELETE);

module.exports = app => app.use('/project', router);
