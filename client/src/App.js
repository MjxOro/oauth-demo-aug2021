import { Component } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080";

class App extends Component {
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
      <div className="App">
        <h1>Passport OAuth Demo</h1>
        {!this.state.loggedIn ? (
          <a href={`${API_URL}/api/auth/github`}>Login</a>
        ) : (
          <>
            <h2>Welcome {this.state.user.name}</h2>
            <div>
              <img src={this.state.user.avatar} alt="user avatar" />
            </div>
            <a href={`${API_URL}/api/auth/logout`}>Logout</a>
          </>
        )}
      </div>
    );
  }
}

export default App;
