import { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import LoginPage from "./pages/Login";

import axios from "axios";

export const API_URL = "http://localhost:8080";

export default class App extends Component {
  state = {
    loggedIn: false,
    user: {},
  };

  componentDidMount() {
    axios
      .get(`${API_URL}/api/users/profile`, { withCredentials: true })
      .then(
        (response) => {
          console.log(response);
          if (response.data.user !== undefined) {
            this.setState({
              loggedIn: true,
              user: response.data.user,
            });
          }
        },
        () => {
          this.setState({
            loggedIn: false,
          });
        }
      )
      .catch((error) => console.log(error));
  }

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
                <h2>Welcome {this.state.user.name}</h2>
                <div>
                  <img
                    src={this.state.user.avatar}
                    style={{ width: 25 }}
                    alt="user avatar"
                  />
                </div>
                <a href={`${API_URL}/api/auth/logout`}>Logout</a>
              </>
            )}
          </div>
          <Route path="/login" component={LoginPage} />
        </div>
      </BrowserRouter>
    );
  }
}
