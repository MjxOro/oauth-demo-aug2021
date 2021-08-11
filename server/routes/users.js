// server/routes/users.js

const router = require("express").Router();

router.get("/profile", (res,req) =>{
	console.log()
	res.json({user: user})
})
module.exports = router;
