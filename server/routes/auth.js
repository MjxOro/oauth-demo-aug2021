const router = require("express").Router();
const passport = require("../middleware/passport");

// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
router.get("/github", passport.authenticate("github"));

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
router.get("/github/callback", (req, res) => {
  passport.authenticate("github", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/login",
  })(req, res);
});

router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy(function (err) {
    res.redirect(req.headers.referer);
  });
});

module.exports = router;
