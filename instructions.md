# OAUTH

## In a nutshell

- The idea of OAuth: getting login credentials for various purposes, including login
  - (But in a non-shady matter)
- We'll use passport.js
  - Passport has many "strategies"
  - We'll use passport's GitHub strategy
  - Your app hits a page on GitHub to login, then hits a callback URL that you've built
  - Other strategies have their own sets of requirements and instructions

### ON THE BACK END

#### The third party app itself

- [ ] `cp .env.sample .env`
- [ ] Since we're using GitHub to login, [register a new OAuth application on GitHub](https://github.com/settings/applications/new)
  - This would change, depending on the strategy
  - [ ] On the page, use localhost with your server port number for the homepage and callback URL
    - For example: homepage URL: `http://localhost:3000`
    - callback URL: `http://localhost:3000/api/auth/github/callback`
      - NOTE: Because the app will redirect to your root directory, if you're using two different ports for the server and client, choose the port for the front end.
- [ ] This will give you a client ID and secret which should go into an `.env` file
  - We'll also create a `SESSION_SECRET` environment variable which works the same way as `JWT_SECRET` did.

#### The database

Create a new database schema

- [ ] The user database table needs the github ID but doesn't need a user password
  - Why? Because your users will use their login credentials from GitHub!
  - [ ] Build a migrate task on your DB to address the new columns
  - no need for `bcrypt` anymore then!

#### The Express code

- [ ] Install packages `express-session`, `passport` and `passport-github`

  - [ ] Add middleware to create a session in section `--- 1 ---`

- [ ] Add passport-related middleware in section `--2--`

```js
app.use(passport.initialize());
// passport.session middleware explanation
// https://stackoverflow.com/questions/22052258/what-does-passport-session-middleware-do
app.use(passport.session());
```

- [ ] Create some new endpoints after the GET `/`:

  - [ ] `/api/auth/github` sends the user to log into GitHub
  - [ ] `/api/auth/github/callback` is what github.com will ping after a login attempt
  - [ ] `/api/auth/logout` that will logout and destroy the session
  - [ ] `/api/users/profile` that returns the JSON of my login account

### ON THE FRONT END

- [ ] Create some routes
- [ ] Set it up so App has a state that shows the user status and a boolean that checks if authenticated
- [ ] When you are logging in, make an axios call to http://localhost:8080/api/auth/github in your react app
- [ ] When you are logging out, make an axios call to http://localhost:8080/api/auth/logout in your react app

## Is this the only option to do this?!

There are third party services "authentication as a service" which may charge $ or code in exchange for convenience:

- OAuth
- Okta
- UserFront
- FireBase [offers authentication](https://firebase.google.com/products/auth) along with their main product of Database As A Service

## References

- https://mherman.org/blog/social-authentication-with-passport-dot-js/
- https://github.com/leannezhang/twitter-authentication
