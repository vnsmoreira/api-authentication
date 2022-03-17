const project_GET = (req, res) => {
  res.json({ ok: true, user: req.userId });
};

module.exports = { project_GET };
