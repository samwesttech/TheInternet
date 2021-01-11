import React, { Component } from "react";
import "./Nav.css";
import theInternetLogo from "../../assets/theinternetlogo.png";
import { Link } from "@reach/router";

class Nav extends Component {
  handleChange = (event) => {
    const { value } = event.target;
    this.props.choseUser(value);
  };

  render() {
    return (
      <div className="header">
        <Link to="/">
          <img src={theInternetLogo} alt="the internet logo" className="logo" />
        </Link>

        <div className="header-right">
          <select
            className="chose_user"
            id="username"
            onChange={this.handleChange}
          >
            <option value="">Choose User</option>
            <option value="tickle122">tickle122</option>
            <option value="grumpy19">grumpy19</option>
            <option value="happyamy2016">happyamy2016</option>
            <option value="cooljmessy">cooljmessy</option>
            <option value="weegembump">weegembump</option>
            <option value="jessjelly">jessjelly</option>
          </select>
          <Link to="/">
            <h1>Home</h1>
          </Link>
          <Link to="/articles">
            <h1>Articles</h1>
          </Link>
          <Link to="/topics">
            <h1>Topics</h1>
          </Link>
        </div>
      </div>
    );
  }
}

export default Nav;
