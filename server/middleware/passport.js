// /server/middleware/passport.js
const passport = require("passport")
const User = require("../models/user")
const GitHubStrategy = require("passport-github").Strategy

const passportConfig = {
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	callbackURL: process.env.CALLBACK_URL,

}

passport.use(
	new GitHubStrategy(passportConfig, (acessToken,refreshToken,profile,cb) =>{
		console.log("accesstoken", acessToken)
		console.log("profile", profile)
		// profile from GitHub as profile
		// This is where we can create logic to access own database
	})
)

passport.serializeUser((user,cb) =>{
	cb(null,user.id)
})


passport.deserializeUser((id,cb) =>{
	User.where({id: id})
	.fetch()
	.then(
		(user) => {
			cb(null,user)
		},
		(err) => cb(err)
	)
	.catch((err)=> cb(err))
})

