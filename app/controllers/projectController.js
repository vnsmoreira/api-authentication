const Project = require('../models/project');
const Task = require('../models/task');

const controller = {};

controller.listProjects_GET = async (req, res) => {
  res.json({ user: req.userId });
};
controller.showProject_GET = async (req, res) => {
  res.json({ user: req.userId });
};
controller.createProject_POST = async (req, res) => {
  try {
    const project = await Project.create(req.body);

    return res.send({ project });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: 'Error creating new Project' });
  }
};
controller.updateProject_PUT = async (req, res) => {
  res.json({ user: req.userId });
};
controller.deleteProject_DELETE = async (req, res) => {
  res.json({ user: req.userId });
};

module.exports = controller;
