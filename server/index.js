require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const cors = require("cors");

const passport = require("./middleware/passport");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// --- 1 ---

// start of passport updates
const session = require("express-session");

// enable cors
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// creates session cookie server-side
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
// --- 1 end ---

// --2--
// Write a whole bunch of passport based middleware. It's inside
//   /middleware/passport.js
app.use(passport.initialize());
// passport.session middleware explanation
// https://stackoverflow.com/questions/22052258/what-does-passport-session-middleware-do
app.use(passport.session());

// --3--
// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
// app.get("/auth/github", passport.authenticate("github"));

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
// app.get("/auth/github/callback", (req, res) => {
//   passport.authenticate("github", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//   })(req, res);
// });

// app.get("/logout", (req, res) => {
//   req.logout();
//   req.session.destroy(function (err) {
//     res.redirect(req.headers.referer);
//   });
// });

// ---
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
