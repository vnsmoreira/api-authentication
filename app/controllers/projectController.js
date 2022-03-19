const Project = require('../models/project');
const Task = require('../models/task');

const controller = {};

controller.listProjects_GET = async (req, res) => {
  try {
    const projects = await Project.find().populate('user');

    return res.send({ projects });
  } catch (error) {
    return res.status(400).send({ error: 'Error listing Projects' });
  }
};
controller.showProject_GET = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).populate('user');

    return res.send({ project });
  } catch (error) {
    return res.status(400).send({ error: 'Error loading Project' });
  }
};
controller.createProject_POST = async (req, res) => {
  try {
    const { title, description, tasks } = req.body;

    const project = await Project.create({ title, description, user: req.userId });

    await Promise.all(
      tasks.map(async task => {
        const projectTask = new Task({ ...task, project: project._id });

        await projectTask.save();

        project.tasks.push(projectTask);
      })
    );

    await project.save();

    return res.send({ project });
  } catch (error) {
    return res.status(400).send({ error: 'Error creating new Project' });
  }
};
controller.updateProject_PUT = async (req, res) => {
  res.json({ user: req.userId });
};
controller.deleteProject_DELETE = async (req, res) => {
  try {
    await Project.findByIdAndRemove(req.params.projectId);

    return res.send();
  } catch (error) {
    return res.status(400).send({ error: 'Error deleting Project' });
  }
};

module.exports = controller;
