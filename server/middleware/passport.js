const passport = require("passport");
const User = require("../models/user");
const GitHubStrategy = require("passport-github").Strategy;

const passportConfig = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
};

// --- 2 ---
// initialize github strategy middleware
// http://www.passportjs.org/packages/passport-github/

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.use(
  new GitHubStrategy(passportConfig, function (
    accessToken,
    refreshToken,
    profile,
    cb
  ) {
    console.log("accesstoken", accessToken);
    console.log("profile", profile);

    User.where({ github_id: profile.id })
      .fetch()
      .then(
        (user) => {
          // return the found user
          console.log("User found!!!");
          cb(null, user);
        },
        () => {
          // create a new user if not found
          console.log("User not found!!!");
          new User({
            name: profile.displayName,
            github_id: profile.id,
            avatar: profile._json.avatar_url,
          })
            .save()
            .then((user) => {
              cb(null, user);
            })
            .catch((err) => {
              console.log(err);
              cb(err);
            });
        }
      );
  })
);

// serializeUser and deserializeUser explanation:
// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passport.serializeUser((user, cb) => {
  console.log("passport.serializeUser user", user);
  cb(null, user.id); // store user in a session cookie
});

passport.deserializeUser((id, cb) => {
  console.log("passport.deserializeUser");
  User.where({ id: id })
    .fetch()
    .then(
      (user) => {
        cb(null, user);
      },
      (err) => {
        cb(err);
      }
    )
    .catch((err) => {
      cb(err);
    });
});
// end of 1st passport updates

// ---

module.exports = passport;
