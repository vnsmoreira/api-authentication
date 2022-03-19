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
  res.json({ user: req.userId });
};
controller.updateProject_PUT = async (req, res) => {
  res.json({ user: req.userId });
};
controller.deleteProject_DELETE = async (req, res) => {
  res.json({ user: req.userId });
};

module.exports = controller;
