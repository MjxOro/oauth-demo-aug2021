const router = require("express").Router();

router.get("/profile", (req, res) => {
  console.log("req.user", req.user);
  res.json({ user: req.user });
});

module.exports = router;
