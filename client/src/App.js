import { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import LoginPage from "./pages/Login";

import axios from "axios";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h1>Passport OAuth Demo</h1>
          <div style={{ backgroundColor: "#eee" }}>
            {!this.state.loggedIn ? (
              <Link to="/login">Login Page</Link>
            ) : (
              <>
                <h2>Welcome USER NAME</h2>
                <div>
                  <img
                    src={"PLACEHOLDER"}
                    style={{ width: 25 }}
                    alt="user avatar"
                  />
                </div>
                <a href={`/`}>Logout</a>
              </>
            )}
          </div>
          <Route path="/login" component={LoginPage} />
        </div>
      </BrowserRouter>
    );
  }
}
