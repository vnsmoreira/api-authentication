const controller = {};

controller.project_GET = (req, res) => {
  res.json({ ok: true, user: req.userId });
};

module.exports = controller;
