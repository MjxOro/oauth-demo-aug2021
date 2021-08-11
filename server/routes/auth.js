// server/routes/auth.js

const router = require("express").Router();
const passport = require("../middleware/passport")

router.get("/github", passport.authenticate("github"))


router.get("/github/callback", (req,res) =>{
	passport.authenticate("github", {
		successRedirect: "http://localhost:300",
		failureRedirect: "/login",
	})
})

router.get("/logout", (req,res) =>{
	req.logout()
	req.session.destroy((err) =>{
		res.redirect(req.headers)
	})
})
module.exports = router;
